import React from 'react'

import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Results_graph from './Results_graph'
import Activity from './Activity'

const Dashboad = () => {
  return (
    <>
      <Sidebar/>
      <Navbar/>
      <Results_graph/>
      <Activity/>
    </>
  )
}

export default Dashboad
