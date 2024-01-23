import React from 'react'

import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Results_graph from './Results_graph'
import Activity from './Activity'
import Footer from './Footer'
import Box from './Box'
import Results from './Results'

const Dashboad = () => {
  return (
    <>
      <Sidebar/>
      <Navbar/>
      <Results_graph/>
      <Activity/>
      <Box/>
      {/* <Footer/> */}
    </>
  )
}

export default Dashboad
