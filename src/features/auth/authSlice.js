import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import authService from "./authService"

// get user from localStorage
const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
  user : user ? user : null,
  isError : false,
  isSucces : false,
  isLoadind : false,
  message : ""
}

// regster user
export const register = createAsyncThunk("auth/register",async (user,thunkAPI)=>{
   try {
    return await authService.register(user)
   } catch (error) {
    if(error.response.data.msg){
      return thunkAPI.rejectWithValue(error.response.data.msg)
    } else {
      return thunkAPI.rejectWithValue(error.response.data.mag)
    }
   }
})

// login user
export const login = createAsyncThunk("auth/login",async (user,thunkAPI)=>{
   try {
    return await authService.login(user)
   } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
   }
})

// logout user
export const logout = createAsyncThunk("auth/logout",async ()=>{
   await authService.logout()
})

export const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
      reset : (state,action) => {
        state.isError = false
        state.isSucces = false
        state.isLoadind = false
        state.message = ""
      }
    },
    extraReducers : {
        [register.pending] : (state)=>{
         state.isLoadind = true
        },
        [register.fulfilled] : (state,action)=>{
          state.isLoadind = false
          state.isSucces = true
          state.user = action.payload
        },
        [register.rejected] : (state,action)=>{
            state.isLoadind = false
            state.isError = true
            state.message = action.payload
            state.user = null
          },
          [logout.fulfilled] : (state) =>{
            state.user = null
          },
          [login.pending] : (state)=>{
            state.isLoadind = true
           },
           [login.fulfilled] : (state,action)=>{
             state.isLoadind = false
             state.isSucces = true
             state.user = action.payload
           },
           [login.rejected] : (state,action)=>{
               state.isLoadind = false
               state.isError = true
               state.message = action.payload
               state.user = null
             },
    }
})

export const {reset} = authSlice.actions

export default authSlice