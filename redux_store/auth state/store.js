import {configureStore} from '@reduxjs/toolkit'
import { authReducer } from '../config_slices/authSlice'
export const store = configureStore({
reducer:{
  auth: authReducer
}
});