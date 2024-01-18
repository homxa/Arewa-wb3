import {createSlice} from '@reduxjs/toolkit'

const initialState = {
profile: null,
loading: false,
error: null  
}

const fonts = createSlice({
name: 'profile',
initialState,
reducers:{
  getting: (state)=>{
    state.loading = true
  },
  gotten: (state,action)=>{
    state.loading = false

state.profile = action.payload
  },
  faildGet: (state,action)=>{
    state.loading = false
state.error = action.payload

  }
} 
})

export const {getting,gotten,faildGet} = fonts.actions
export const profile = fonts.reducer