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

  // const { userId, email, userName,emailVerified } = action.payload;
  state.user = action.payload
  //   userId,
  //   email,
  //   emailVerified
  // // state.user = action.payload
   
},
  loginSuccess2:(state,action)=>{
userProfile = action.payload
  },
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
export const  {loginstart,loginSuccess,loginFaild,logOut,loginSuccess2} = authSlice.actions