"use client";

import React, { useEffect, useState } from 'react'
import { orangeLogo } from '@/constants/images'
import Image from 'next/image'
import BottomProfile from './bottom-profile';
import { useGlobalContext } from '@/app/Context/store';
import { sidebarItems } from '@/constants/menu-items';



const LeftBar = () => {
    
    const {menu, setActiveMenu} = useGlobalContext();
    

    const SideBarLabel = ({ label, id }: { label: string, id:number }) => {
        return (
            <div className={`flex flex-row items-center gap-3 hover:cursor-pointer hover:bg-sky-50 ${menu.label===label ? "bg-sky-100":"bg-white"} px-5 py-2 rounded-lg hover:text-sky-500`} onClick={()=>{
                setActiveMenu({
                    id:id,
                    label:label
                });
            }}>
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
            <div className="p-5 flex flex-col items-start justify-between w-1/4 h-screen border-r-slate-300 border-[1px]">
                <section className="w-full h-full">
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
                    <div className="bg-gray-200 h-[2px] w-full mt-3"/>
                    <div className="my-5">
                        {sidebarItems.map((item, index) => {
                            return (
                                <SideBarLabel key={item.id || index} label={item.label} id={item.id}/>
                            );
                        })}
                    </div>
                </section>
                <div className="bg-gray-200 h-[2px] w-full my-8"/>
                <BottomProfile />
            </div>
        )
}

export default LeftBar