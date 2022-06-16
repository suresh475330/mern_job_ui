import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import jobService from "./jobService"

const initialState = {
    jobs: [],
    isError: false,
    isSucces: false,
    isLoading: false,
    message: "",
    addForm : false,
    upDateForm : false,
    oneJob : {}
}

// create new Job
export const createJob = createAsyncThunk("jobs/createJob", async (jobData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        const job =  await jobService.createJob(jobData, token)
        return job
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
})

// get all jobs
export const getAllJobs = createAsyncThunk("jobs/getAllJob", async (jobData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await jobService.getAlljobs(token)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
})

// delete job
export const deleteJob = createAsyncThunk("jobs/deleteJob", async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await jobService.deleteJob(id,token)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
})

// get single job
export const singleJob = createAsyncThunk("jobs/singleJob", async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await jobService.singleJob(id,token)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
})

// update job
export const updateJob = createAsyncThunk("jobs/updateJob", async (obj,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await jobService.updateJob(token,obj)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
})


const jobSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
        reset: (state) =>{
            state.isError= false
            state.isSucces= false
            state.isLoading= false
            state.message= ""
        },
        editing : (state,action)=>{
             state.addForm = !state.addForm
        },
        editing2 : (state,action)=>{
             state.upDateForm = !state.upDateForm
        },
    },
    extraReducers: {
    
      [createJob.pending] : (state)=>{
        state.isLoading = false
      },
      [createJob.fulfilled] : (state,action)=>{
        state.isLoading = false
        state.isSucces = true
        state.jobs.push(action.payload)
      },
      [createJob.rejected] : (state,action)=>{
        state.isLoading = false
        state.isSucces = true
        state.message = action.payload
      },
      [getAllJobs.pending] : (state,action)=>{
        state.isLoading = true
      },
      [getAllJobs.fulfilled] : (state,action)=>{
        state.isLoading = false
        state.isSucces = true
        state.jobs = action.payload
      },
      [getAllJobs.rejected] : (state,action)=>{
        state.isLoading = false
        state.isSucces = true
        state.message = action.payload
      },
      [deleteJob.pending] : (state)=>{
        state.isLoading = false
      },
      [deleteJob.fulfilled] : (state,action)=>{
        state.isLoading = false
        state.isSucces = true
        state.jobs = state.jobs.filter((job)=> job._id !== action.payload)
      },
      [deleteJob.rejected] :(state,action)=>{
        state.isLoading = false
        state.isSucces = true
        state.message = action.payload
      },
      [singleJob.pending] : (state)=>{
        state.isLoading = true
      },
      [singleJob.fulfilled] : (state,action)=>{
        state.isLoading = false
        state.isSucces = true
        state.oneJob = action.payload.oneJob
      },
      [singleJob.rejected] :(state,action)=>{
        state.isLoading = false
        state.isSucces = true
        state.message = action.payload
      },
      [updateJob.pending] : (state)=>{
        state.isLoading = false
      },
      [updateJob.fulfilled] : (state,action)=>{
        console.log(action.payload);
        state.isLoading = false
        state.isSucces = true
      },
      [updateJob.rejected] :(state,action)=>{
        state.isLoading = false
        state.isSucces = true
        state.message = action.payload
      }
    }
       

})

export const { reset ,editing,editing2} = jobSlice.actions

export default jobSlice

