"use client";

import React, { useEffect, useState } from 'react'
import { orangeLogo } from '@/constants/images'
import Image from 'next/image'
import BottomProfile from './bottom-profile';

const LeftBar = () => {
    const sidebarItems = [
        {
            id: 1,
            label: "Home"
        },
        {
            id: 2,
            label: "Stores"
        },
        {
            id: 3,
            label: "Products"
        },
        {
            id: 4,
            label: "Catalogue"
        },
        {
            id: 5,
            label: "Promotions"
        },
        {
            id: 6,
            label: "Reports"
        },
        {
            id: 7,
            label: "Docs"
        },
        {
            id: 8,
            label: "Settings"
        }
    ];

    const SideBarLabel = ({ label }: { label: string }) => {
        return (
            <div className="flex flex-row items-center gap-3 hover:bg-sky-100 px-5 py-2 rounded-lg hover:text-sky-500">
                <input type="checkbox" className="w-5 h-5" />
                <p>{label}</p>
            </div>
        );
    };
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])
    if (isClient)
        return (
            <div className="p-5 flex flex-col items-start justify-between w-1/3 h-screen border-r-slate-300 border-[1px]">
                <section>
                    <div className="bg-teal-700 max-w-fit px-10 rounded-lg py-2">
                        <div className="flex flex-row items-center justify-between gap-2">
                            <Image
                                src={orangeLogo}
                                alt="lemon"
                                width={30}
                                height={30}
                            />
                            <p className="flex flex-col items-start">
                                <p className="text-white">Lemon</p>
                                <p className="text-white">INC.</p>
                            </p>
                        </div>
                    </div>
                    
                    <div>
                        {sidebarItems.map((item, index) => {
                            return (
                                <SideBarLabel key={item.id || index} label={item.label} />
                            );
                        })}
                    </div>
                </section>
                <BottomProfile />
            </div>
        )
}

export default LeftBar