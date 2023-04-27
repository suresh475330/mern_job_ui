import axios from "axios";

const url = "https://cat-job.onrender.com/api/v1";

const register = async (userData) =>{
    const {data} = await axios.post(`${url}/auth/register`,userData)
    if(data){
        localStorage.setItem("user",JSON.stringify(data))
    }
    return data
}

const login = async (userData) =>{
    const {data} = await axios.post(`${url}/auth/login`,userData)
    if(data){
        localStorage.setItem("user",JSON.stringify(data))
    }
    return data
}

const logout = async () =>{
 localStorage.removeItem("user")
}

const authService = {
    register,logout,login
}

export default authService
