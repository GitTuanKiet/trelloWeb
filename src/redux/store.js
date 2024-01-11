import { configureStore } from '@reduxjs/toolkit'
import boardSlice from './board/boardSlice'

export const store = configureStore({
  reducer: {
    boardSlice
  }
})