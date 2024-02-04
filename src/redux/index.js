import { configureStore } from '@reduxjs/toolkit'
import boardSlice from './Board/boardSlice'
import customizationSlice from './Customization/customizationSlice'
import authSlice from './Auth/slice'

export const store = configureStore({
  reducer: {
    board: boardSlice,
    customization: customizationSlice,
    auth: authSlice
  }
})