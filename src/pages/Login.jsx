import React from "react";
import {useEffect,useState} from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import { useSelector ,useDispatch} from "react-redux";
import {useNavigate} from 'react-router-dom'
import {login,reset} from '../features/auth/authSlice'
import Spinner from "../components/Spinner";

const Login = () => {

  const [formData,setFormdata] = useState({
      email : "",
      password : ""
  })

  const {email,password} = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user , isError , isSucces , isLoadind ,
    message } = useSelector((state)=> state.auth)

    useEffect(()=>{
      if(isError){
        if(message === undefined){
         return alert(new Error(`Login failed plz try agian later`));
        }
        alert(new Error(`Login failed : ${message}`));
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

   const onSubmit = (e) => {
    e.preventDefault()
    dispatch(login(formData))
   }

   if(isLoadind){
    return <Spinner />
   }

    return (
      <>
 
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login your account</p>
      </section>

      <section className="form">
       <form onSubmit={onSubmit}>

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

export default Login