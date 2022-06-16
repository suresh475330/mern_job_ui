import React from "react";
import {useEffect,useState} from 'react'
import {FaUser} from 'react-icons/fa'
import { useSelector ,useDispatch} from "react-redux";
import {useNavigate} from 'react-router-dom'
import {register,reset} from '../features/auth/authSlice'
import Spinner from "../components/Spinner";

const Register = () => {

  
  const [formData,setFormdata] = useState({
     name : "",
     email : "",
      password : ""
  })

  const {name,email,password} = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user , isError , isSucces , isLoadind ,
    message } = useSelector((state)=> state.auth)

    // console.log(user);

    useEffect(()=>{
     if(isError){
      alert(new Error(`Register failed : ${message}`));
     }
     if(isSucces || user){
      navigate("/")
     }
     dispatch(reset())

    },[user , isError , isSucces , message,navigate,dispatch])

   const onChange = (e) => {
     setFormdata(prvState => ({
      ...prvState,
      [e.target.name] : e.target.value
     }))
     
   }

   //qwbBobK3JLgAWJAy

   const onSubmit = (e) => {
    e.preventDefault()
      dispatch(register(formData))
   }

   if(isLoadind){
    return <Spinner />
   }

    return (
      <>
 
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Pleace create an account</p>
      </section>

      <section className="form">
       <form onSubmit={onSubmit}>

        <div className="form-group">
        <input type="text" className="form-control" id="name"
         name="name" value={name} placeholder='Enter your name'
         onChange={onChange} required/>
         </div>

        <div className="form-group">
        <input type="email" className="form-control" id="email"
         name="email" value={email} placeholder='Enter your Email'
         onChange={onChange} required/>
         </div>

        <div className="form-group">
        <input type="password" className="form-control" id="password"
         name="password" value={password} placeholder='Enter your password'
         onChange={onChange} required/>
         </div>

        <div className="form-group">
        <button type="submit" className="btn btn-block">Submit</button>
         </div>

       </form>
      </section>
      </>
    )
}

export default Register