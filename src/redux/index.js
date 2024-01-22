import { configureStore } from '@reduxjs/toolkit'
import boardSlice from './board/boardSlice'
import reducer from './store/reducer'

export const store = configureStore({
  reducer: {
    boardSlice,
    reducer
  }
})