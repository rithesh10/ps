import React from 'react'
import { Link } from 'react-router-dom'

const Activity = () => {
  return (
    <div className='Activity'>
      <h3># Your weekly activity #</h3>
      <Link to="/dashboard/assessment" className='Activity-item'> 
      <div className='Activity-quiz'></div>
        Assessment
      </Link>
      <div className='Activity-item'>
      <div className='Activity-yoga'></div>
        Yoga
      </div>
      <div className='Activity-item meditation'>
      <div className='Activity-meditation'></div>
        Meditation
      </div>
    </div>
  )
}

export default Activity
