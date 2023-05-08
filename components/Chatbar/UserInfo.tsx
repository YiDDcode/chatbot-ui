import { FC, KeyboardEvent, useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { User } from '@/types/user';
import { useSession, signIn, signOut } from "next-auth/react"
import Image from 'next/image';

interface Props {
  user: User | null;
}

export const UserInfo: FC<Props> = ({ user }) => {
  const { t } = useTranslation('sidebar');
  const [isChanging, setIsChanging] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [cardCode, setCardCode] = useState('');

  const handleEnter = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      setIsChanging(false);
    }
  };

  const handleRecharge = () => {
    console.log(`Recharge with card code: ${cardCode}`);
    // TODO: Call API to recharge with the card code.
  };

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        window.addEventListener('mouseup', handleMouseUp);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      window.removeEventListener('mouseup', handleMouseUp);
      setIsChanging(false);
    };

    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);


  return (
    <div className="flex w-full cursor-pointer select-none items-center gap-3 rounded-md px-3 py-3 text-[14px] leading-3 text-white transition-colors duration-200 hover:bg-gray-500/10">
      <img src={user?user?.image:"https://img-qn.51miz.com/Element/00/88/08/84/72f298b9_E880884_d0f63115.png"} alt="avatar" className="h-12 w-12 rounded-full" />
      <div className="">{user?user?.name:"not login"}</div>
      {
      user?(<button
        className="rounded font-bold text-gray-700"
        onClick={() => setIsChanging(true)}
      >
        <FontAwesomeIcon icon={faCog} className="h-4 w-4" />
      </button>)
      :(<button
        className="rounded-lg border border-neutral-500 px-4 py-2 text-neutral-900 shadow hover:bg-neutral-100 focus:outline-none dark:border-neutral-800 dark:border-opacity-50 dark:bg-white dark:text-black dark:hover:bg-neutral-300"
        onClick={() => signIn()}
      >
        登录
      </button>)
      }

      
      {isChanging && (
        <div
          className="z-100 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onKeyDown={handleEnter}
        >
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
              <div
                className="hidden sm:inline-block sm:h-screen sm:align-middle"
                aria-hidden="true"
              />

              <div
                ref={modalRef}
                className="dark:border-netural-400 inline-block max-h-[400px] transform overflow-hidden rounded-lg border border-gray-300 bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all dark:bg-[#202123] sm:my-8 sm:max-h-[600px] sm:w-full sm:max-w-lg sm:p-6 sm:align-middle"
                role="dialog"
              >
                <div className="mb-10 text-4xl">Account Setting</div>
                <div className="mt-6 rounded border p-4">
                  <div className="text-xl font-bold">账户</div>
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 rounded-full bg-gray-200">
                      <img src={user?.image || "https://img-qn.51miz.com/Element/00/88/08/84/72f298b9_E880884_d0f63115.png"} alt="avatar" className='rounded-full' />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">电子邮箱</span>
                      <span className="text-gray-500">{user?.email || '暂无邮箱信息'}</span>
                      <span className="mt-6 text-sm font-semibold">
                        账户积分余额
                      </span>
                      <span className="text-gray-500">{user?.accounts[0].balance}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded border p-4">
                  <div className="text-xl font-bold">积分充值</div>
                  <div className="mt-4 italic">请输入卡密充值,购买链接.</div>

                  <div className="mt-6 text-sm font-bold text-black dark:text-neutral-200">
                    卡密
                  </div>
                  <input
                    className="mt-2 w-full rounded-lg border border-neutral-500 px-4 py-2 text-neutral-900 shadow focus:outline-none dark:border-neutral-800 dark:border-opacity-50 dark:bg-[#40414F] dark:text-neutral-100"
                    type="text"
                    value={cardCode}
                    onChange={(e) => setCardCode(e.target.value)}
                    placeholder="输入卡密"
                  />
                  <button
                    type="button"
                    className="mt-6 w-full rounded-lg border border-neutral-500 px-4 py-2 text-neutral-900 shadow hover:bg-neutral-100 focus:outline-none dark:border-neutral-800 dark:border-opacity-50 dark:bg-white dark:text-black dark:hover:bg-neutral-300"
                    onClick={handleRecharge}
                  >
                    充值
                  </button>
                </div>
                <button
                  type="button"
                  className="mt-6 w-full rounded-lg border border-neutral-500 px-4 py-2 text-neutral-900 shadow hover:bg-neutral-100 focus:outline-none dark:border-neutral-800 dark:border-opacity-50 dark:bg-white dark:text-black dark:hover:bg-neutral-300"
                  onClick={() => setIsChanging(false)}
                >
                  {t('Close')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
