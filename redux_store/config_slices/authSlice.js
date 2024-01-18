import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  user: null,
  error: null
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers:{
    // loging parth
  
loginSuccess: (state,action)=>{

  state.user = action.payload
  
},

  loginFaild: (state,action)=>{
    state.error = action.error
    },
  logOut: (state)=>{
    state.user = null
    userProfile = null
    },
  
  }
})

export const authReducer = authSlice.reducer
export const  {loginSuccess,loginFaild,logOut} = authSlice.actions