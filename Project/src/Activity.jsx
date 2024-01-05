import React from 'react'
import { Link } from 'react-router-dom'

const Activity = () => {
  return (
    <div className='Activity'>
      <h3># Your weekly activity #</h3>
      <Link to="/dashboard/assessment" className='Activity-item'> 
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC9_bqR2LJpKs16I5Wnuew0WvwjjHTzzTU6Q&usqp=CAU" alt="" className='Activity-img'/>
        Assessment
      </Link>
      <div className='Activity-item'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXtOvpfcFsOvEpOJUC266YvOfPlOwXC2CXJA&usqp=CAU" alt="" className='Activity-img'/>
        Yoga
      </div>
      <div className='Activity-item meditation'>
        <img src="data:image/png;base64,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" alt="" className='Activity-img'/>
        Meditation
      </div>
    </div>
  )
}

export default Activity
