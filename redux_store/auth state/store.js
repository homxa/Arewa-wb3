import {configureStore} from '@reduxjs/toolkit'
  import { Iterable } from 'immutable'


  
import { authReducer } from '../config_slices/authSlice'
import { profile } from '../config_slices/profile';
export const store = configureStore({
reducer:{
  auth: authReducer,
  userP: profile,
},
});