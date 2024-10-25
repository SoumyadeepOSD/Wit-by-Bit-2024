import React from 'react'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { profilePicture } from '@/constants/images'

const BottomProfile = () => {
  return (
    <div className="flex flex-row items-center justify-start gap-2">
        <Image
            src={profilePicture}
            alt="profile-picture"
            height={50}
            width={50}
        />
        <div className="flex flex-col items-start justify-start">
            <p>Andy Samberg</p>
            <p className="text-slate-400">andy.samberg@gmail.com</p>
        </div>
        <ChevronRight color="#1F8CD0"/>
    </div>
  )
}

export default BottomProfile