import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useSelector,useDispatch} from "react-redux"
import JobForm from "../components/JobForm";
import Spinner from "../components/Spinner";
import { getAllJobs ,reset} from "../features/jobs/jobSilces";
import JobItem from "../components/JobItem";
import UpdateForm from "../components/UpdateForm";

const Dashboard = () => {
const navigate = useNavigate()
const dispatch = useDispatch()

  const {user} = useSelector((state)=> state.auth)
  const {jobs,isError,isLoading,message,addForm,upDateForm} = useSelector((state)=> state.jobs)

  useEffect(()=>{

    if(isError){
      console.log(message);
    }

    if(!user){
     return navigate("/login")
    }
    dispatch(getAllJobs())
    return  ()=>{
      dispatch(reset())
    }
    
  },[user,navigate,isError,message,dispatch,upDateForm])

  if(isLoading){
    return <Spinner />
  
  }

    return (
      <>
  
      <div>
      <section className="heading">
        <h1>Welcome {user && user.user.name}</h1>
        <p>Jobs DashBoard</p>
      </section>

     {addForm && <JobForm />}
     {upDateForm &&  <UpdateForm />} 
     
       <section className="content">
        {jobs.length  > 0 ? (
          <div className="goals">
          {jobs.map((job)=>(
            <JobItem key={job._id} job={job}/>
          ))}
          </div>
        ) : (<h3>You have not set any jobs</h3>)}
       </section>

     
      </div>
      </>
    )
}

export default Dashboard