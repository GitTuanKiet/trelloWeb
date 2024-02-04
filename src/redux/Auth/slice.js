import { createSlice } from '@reduxjs/toolkit'
import { logoutApi } from '~/apis/authApi'
import { setTokenJWT, setProfile, removeTokenJWT } from '~/utils/auth'

export const initialState = {
  loading: false,
  error: null,
  user: null,
  token: null,
  listBoard: []
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setList: (state, action) => {
      state.listBoard = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
      state.loading = false
      setProfile(action.payload)
    },
    setToken: (state, action) => {
      state.token = action.payload
      setTokenJWT(action.payload)
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    logout: (state) => {
      logoutApi()
      state.user = null
      state.token = null
      removeTokenJWT()
    }
  }
})

export const { setUser, setToken, setLoading, setError, logout, setList } = authSlice.actions
export default authSlice.reducer