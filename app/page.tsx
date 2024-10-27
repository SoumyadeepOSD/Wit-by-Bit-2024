"use client";

import React from 'react'
import LeftBar from './_components/sidebar/left-bar'
import MainContent from './_components/main-content/main-content'
import { useGlobalContext } from './Context/store'

const Home = () => {
  const {menu} = useGlobalContext();
  return (
    <div className="bg-white flex flex-row items-center justify-between">
      <LeftBar/>
       {menu.id===3 &&(<MainContent/>)}
    </div>
  )
}

export default Home