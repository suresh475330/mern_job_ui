import React from 'react'
import { useDispatch } from 'react-redux'
import {deleteJob} from "../features/jobs/jobSilces"
import {FaTrashAlt,FaEdit} from 'react-icons/fa'
import {editing2,singleJob} from '../features/jobs/jobSilces'

const JobItem = ({job}) => {
  const dispatch =  useDispatch()

const click = (id) => {
  dispatch(singleJob(id))
  dispatch(editing2())
}


  return(
  <>
 
  <div className='goal'>
    <h2>{job.company}</h2>
    <h4>{job.position}</h4>
    <p>
      createdAt : <span>{ new Date(job.createdAt).toLocaleString()}</span>
    </p>
    <div className='buttons'>
    <div onClick={()=> dispatch(deleteJob(job._id))} className="button"><FaTrashAlt /> Delete</div>
    <div onClick={()=> click(job._id)} className="button"><FaEdit /> Edit</div>
    </div>
  </div>
  </>
  )
}

export default JobItem