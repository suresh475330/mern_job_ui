import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import {createJob} from "../features/jobs/jobSilces"


const JobForm = () => {

    const dispatch = useDispatch()

    const [company,setCompany] = useState("")
    const [position,setPosition] = useState("")

    const onSubmit = (e) =>{
        e.preventDefault()
        const obj = {
         company,
         position
        }
        // console.log(obj);
        dispatch(createJob(obj)); 
        setCompany("")
        setPosition("")

    } 

    return (
        <section className='form'>
            <form onSubmit={onSubmit}>

            <div className="form-group">
                <label>Company</label>
                <input type="text" value={company} name='company' 
                 placeholder='Enter your company'  
                  onChange={(e)=> setCompany(e.target.value)} required/>
            </div>
            <div className="form-group">
                <label>Position</label>
                <input type="text" value={position} name='position'
                 placeholder='Enter your  position'  
                 onChange={(e)=> setPosition(e.target.value)}  required/>
            </div>
            
        <div className="form-group">
        <button type="submit" className="btn btn-block">Add Job</button>
         </div>
            </form>
        </section>
    )
}

export default JobForm