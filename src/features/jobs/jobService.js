import axios from "axios";

const url = process.env.REACT_APP_SERVER_URL;



// get all jobs
const getAlljobs = async (token) =>{
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    const response = await axios.get(`${url}/jobs`,config)
    // console.log(response.data.job);
    return response.data.job
}

// delete job
const deleteJob = async (id,token) =>{
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
     await axios.delete(`${url}/jobs/${id}`,config)
    return id
}

// create job
const createJob = async (userData,token) =>{
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    const response = await axios.post(`${url}/jobs`,userData,config)
    const job = response.data.job
    // console.log(job);
    return job
}

// get single job
const singleJob = async (id,token) =>{
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    const response =  await axios.get(`${url}/jobs/${id}`,config)
    return response.data
}

// update job
const updateJob = async (token,obj) =>{
    const {data,id} = obj
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    const response = await axios.patch(`${url}/jobs/${id}`,data,config)
    const job = response.data
    // console.log(job.job);
    return job.job
}

const jobService = {
    createJob,getAlljobs,deleteJob,singleJob,updateJob
}

export default jobService
