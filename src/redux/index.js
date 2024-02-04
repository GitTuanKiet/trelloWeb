import { configureStore } from '@reduxjs/toolkit'
import boardSlice from './board/boardSlice'
import customizationSlice from './customization/customizationSlice'
import authSlice from './Auth/slice'

export const store = configureStore({
  reducer: {
    board: boardSlice,
    customization: customizationSlice,
    auth: authSlice
  }
})