import { createSlice } from '@reduxjs/toolkit'
import { mockData } from '~/apis/mock-data'


export const initialState = {
  loading: false,
  error: null,
  listUser: [
    ...mockData.board.members
  ]
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setListUser: (state, action) => {
      state.listUser = action.payload
      state.loading = false
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    }
  }
})

export const { setListUser, setLoading, setError } = userSlice.actions
export default userSlice.reducer