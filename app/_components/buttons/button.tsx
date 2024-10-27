import React from 'react'

interface DefaultButtonTypes{
    label: string;
    varient: string;
    size: string;
}

const DefaultButton = ({label, varient, size}:DefaultButtonTypes) => {
  return (
    <div className={`${varient==="primary" ? "bg-sky-600":"bg-slate-300"} ${size==="large"?"w-[150px]":size==="medium"?"w-[150px]":"w-[90px]"} p-[10px] text-center justify-center rounded-lg hover:cursor-pointer ${varient==="primary"?"hover:bg-sky-700":"hover:bg-slate-400"}`}>
        <p className={`${varient==="primary" ? "text-white" :  "text-sky-600"} font-semibold`}>{label}</p>
    </div>
  )
}

export default DefaultButton;