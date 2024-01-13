import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  user: null,
  userProfile: null,
  error: null
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers:{
    // loging parth
loginstart: (state)=>{
state.loading = true
},
loginSuccess: (state,action)=>{
  state.loading = false

  const { uid, email, userName,emailVerified } = action.payload;
  state.user = {
    uid,
    email,
    userName,
    emailVerified
  // state.user = action.payload
  }},
  loginFaild: (state,action)=>{
    state.loading = false
    state.error = action.error
    },
  // logOut
  logOut: (state)=>{
    state.user = null
    userProfile = null
    },
  
  }
})

export const authReducer = authSlice.reducer
export const  {loginstart,loginSuccess,loginFaild,logOut} = authSlice.actions