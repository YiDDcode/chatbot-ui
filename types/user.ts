export interface UserAccount {
    id: string;
    type: string;
    balance: number;
    }

export interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean | null;
    image: string;
    accounts: UserAccount[];
    }