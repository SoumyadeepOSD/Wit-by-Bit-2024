import React from 'react'

interface DefaultButtonTypes{
    label: string;
    varient: string;
    size: string;
}

const DefaultButton = ({label, varient, size}:DefaultButtonTypes) => {
  return (
    <div className={`${varient==="primary" ? "bg-sky-600":"bg-slate-300"} max-w-fit rounded-lg hover:cursor-pointer ${varient==="primary"?"hover:bg-sky-700":"hover:bg-slate-400"}`}>
        <p className={`${varient==="primary" ? "text-white" :  "text-sky-600"} font-semibold ${size==="big" ? "px-8" : "px-5"} py-2 text-sm`}>{label}</p>
    </div>
  )
}

export default DefaultButton;