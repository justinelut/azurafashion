import React from 'react'
import AccountBalanceIcon from '/public/icons/AccountBalanceIcon';
import LogoutIcon from "/public/icons/LogoutIcon";
import DashboardIcon from "/public/icons/DashboardIcon";
import { pb } from '@/app/pocketbase';
import Image from 'next/image';
import { imageurl } from '@/components/Util/getimage';
import { useAccountBalance } from "@/components/Header/AccountBalance";
import { usePocketbase } from "@/app/provider";


export default function ProfileCard() {
    const accountBalance = useAccountBalance()
    const { logout } = usePocketbase();
    const user = pb.authStore.model
    return (
        <div className="font-sans leading-tight bg-grey-lighter">
            <div className="w-full bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="bg-cover h-40" style={{ backgroundImage: `url(${imageurl(user?.collectionId, user?.id, user?.featuredimage) })`}}>
                </div>
                <div className="border-b px-4 pb-6">
                    <div className="text-center sm:text-left sm:flex mb-4">
                        <Image className="h-32 w-32 rounded-full border-4 border-white -mt-16 mr-4" src={imageurl(user?.collectionId, user?.id, user?.avatar)} width={320} height={320} alt="" />
                        <div className="py-2">
                            <h3 className="font-bold text-2xl mb-1">{user?.name}</h3>
                            <div className="inline-flex text-grey-dark sm:flex items-center">
                                <AccountBalanceIcon />
                                <span className='ml-4'>KSH {accountBalance && accountBalance}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <button className="flex items-center w-full border-2 border-grey text-slate-800 antialiased font-bold hover:bg-blue-dark px-4 py-2 mr-2">
                            <DashboardIcon /> Dashboard
                            </button>
                        <button onClick={logout} className="flex items-center w-full border-2 border-grey font-semibold text-black px-4 py-2">
                            <LogoutIcon className="mr-2" /> Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
