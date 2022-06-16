import {configureStore} from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'
import jobSlice from './features/jobs/jobSilces'


const Store = configureStore({
    reducer : {
      auth : authSlice.reducer,
      jobs : jobSlice.reducer
    }
})

export default Store