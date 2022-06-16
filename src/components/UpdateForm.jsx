import React,{useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {updateJob,editing2} from "../features/jobs/jobSilces"

const UpdateForm = () => {

    const { oneJob} = useSelector((state)=> state.jobs)
    const dispatch = useDispatch()


    const [company,setCompany] = useState(oneJob.company ? oneJob.company : "")
    const [position,setPosition] = useState(oneJob.position ? oneJob.position : "")


    const onSubmit = (e) =>{
        e.preventDefault()

        const obj = {
            data : {
                company,
                position
               },
               id : oneJob._id
        }
         
        // console.log(obj);
        dispatch(updateJob(obj))
        dispatch(editing2())

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
        <button type="submit" className="btn btn-block">UPDATE Job</button>
         </div>
            </form>
        </section>
    )
}

export default UpdateForm