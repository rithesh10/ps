import React from 'react'

import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Results_graph from './Results_graph'
import Activity from './Activity'
import Footer from './Footer'

const Dashboad = () => {
  return (
    <>
      <Sidebar/>
      <Navbar/>
      <Results_graph/>
      <Activity/>
      <Footer/>
    </>
  )
}

export default Dashboad
