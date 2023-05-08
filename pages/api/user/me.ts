import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return res;
  }

  const user = await prisma.user.findFirst({
    where: {
      id: session.user.id as string,
    },
    include: {
      accounts: {
        select: {
          id: true,
          type: true,
          balance: true,
        },
      },
    },
  });

  await prisma.$disconnect(); // 断开数据库连接

  return res.json({
    user,
  });
}