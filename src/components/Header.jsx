import React from "react";
import {FaSignInAlt,FaSignOutAlt,FaUser,FaUserCircle } from 'react-icons/fa';
import {Link} from 'react-router-dom'
import {useSelector,useDispatch} from "react-redux"
import {useNavigate} from 'react-router-dom'
import {logout,reset} from '../features/auth/authSlice'
import { editing } from "../features/jobs/jobSilces";

const Header = () => {

  const navigate = useNavigate()
  const dispatch  = useDispatch()

  const {user} = useSelector((state)=> state.auth)

  const onLogout = () =>{
    dispatch(logout())
    dispatch(reset())
    navigate("/")
  }

    return (

      <>
    <div className='header'>
      <div className="logo">
          <Link to="/">Jobs Selecter</Link>
         
         {user &&  <button className="btn" onClick={()=> dispatch(editing())}>
               AddJobs
           </button>}
      </div>
     
      <ul>
        {user ? (
          <>
          <FaUserCircle />  <h5 className="user">{user.user.name}</h5>
           <li>
           <button className="btn" onClick={onLogout}>
                <FaSignOutAlt /> Logout
           </button>
        </li>
          </>
        ) : (<>
         <li>
         <Link to="/login">
             <FaSignInAlt /> Login
         </Link>
     </li>
     <li>
         <Link to="/register">
             <FaUser /> Register
         </Link>
     </li>
        </>)}
       
      </ul>
    </div>
      </>
    )
}

export default Header