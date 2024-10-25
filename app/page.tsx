import React from 'react'
import LeftBar from './_components/sidebar/left-bar'
import MainContent from './_components/main-content/main-content'

const Home = () => {
  return (
    <div className="bg-white flex flex-row items-center justify-between">
      <LeftBar/>
      <MainContent/>
    </div>
  )
}

export default Home