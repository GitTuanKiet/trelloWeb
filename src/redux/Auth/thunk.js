import { createAsyncThunk } from '@reduxjs/toolkit'
import { loginApi, registerApi, forgotPasswordApi, updateProfileApi, updatePasswordApi, fetchListBoardApi } from '~/apis/authApi'
import { setLoading, setError, setToken, setUser, setList } from './slice'
import { addBoardApi, destroyBoardApi } from '~/apis'
import { isAuth, getUserId } from '~/utils/auth'
import { cloneDeep } from 'lodash'
import { mockData } from '~/apis/mock-data'

export const login = createAsyncThunk('auth/login', async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const response = await loginApi(data)

    if (response.error) {
      return response.error
    }

    const { token, user } = response
    dispatch(setToken(token))
    dispatch(setUser(user))
  } catch (error) {
    dispatch(setError(error.message))
  } finally {
    dispatch(setLoading(false))
  }
})

export const register = createAsyncThunk('auth/register', async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const response = await registerApi(data)

    if (response.error) {
      return response.error
    }

    const { token, user } = response
    dispatch(setToken(token))
    dispatch(setUser(user))
  } catch (error) {
    dispatch(setError(error.message))
  } finally {
    dispatch(setLoading(false))
  }
})

export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const response = await forgotPasswordApi(data)

    if (response.error) {
      return response.error
    }

    const { token, user } = response
    dispatch(setToken(token))
    dispatch(setUser(user))
  } catch (error) {
    dispatch(setError(error.message))
  } finally {
    dispatch(setLoading(false))
  }
})

export const updateProfile = createAsyncThunk('auth/updateProfile', async (data, { dispatch }) => {
  if (!isAuth()) return 'You must be logged in to update your profile'
  try {
    dispatch(setLoading(true))
    const response = await updateProfileApi(data)

    if (response.error) {
      return response.error
    }

    dispatch(setUser(response))
  } catch (error) {
    dispatch(setError(error.message))
  } finally {
    dispatch(setLoading(false))
  }
})

export const updatePassword = createAsyncThunk('auth/updatePassword', async (data, { dispatch }) => {
  if (!isAuth()) return 'You must be logged in to update your password'
  try {
    dispatch(setLoading(true))
    const result = await updatePasswordApi(data)

    if (result.error) {
      return result.error
    }

    return result
  } catch (error) {
    dispatch(setError(error.message))
  } finally {
    dispatch(setLoading(false))
  }
})

export const fetchListBoard = createAsyncThunk('boardBar/fetchListBoard', async (_, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const response = await fetchListBoardApi()

    if (response.error) {
      return response.error
    }

    if (response.length === 0) response.push({ _id: mockData.board._id, title: mockData.board.title, description: mockData.board.description })
    dispatch(setList(response))
  } catch (error) {
    dispatch(setError(error.message))
  } finally {
    dispatch(setLoading(false))
  }
})

export const addBoard = createAsyncThunk('boardBar/addBoard', async (data, { dispatch, getState }) => {
  try {
    if (!isAuth()) return 'You must be logged in to perform this action'
    dispatch(setLoading(true))
    const response = await addBoardApi(data)

    if (response.error) {
      return response.error
    }

    const clone = cloneDeep(getState().auth.listBoard)
    clone.push(response)
    dispatch(setList(clone))
  } catch (error) {
    dispatch(setError(error.message))
  } finally {
    dispatch(setLoading(false))
  }
})

export const destroyBoard = createAsyncThunk('boardBar/destroyBoard', async (board, { dispatch, getState }) => {
  if (!isAuth()) return 'You must be logged in to perform this action'
  if (getState().board.userId !== getUserId()) return 'You are not the owner of this board'
  if (board._id === mockData.board._id) return 'You cannot delete this board'
  try {
    dispatch(setLoading(true))
    const result = await destroyBoardApi(board._id)

    if (result.error) {
      return result.error
    }

    const clone = cloneDeep(getState().auth.listBoard)
    const newList = clone.filter((item) => item._id !== board._id)
    if (newList.length === 0) newList.push({ _id: mockData.board._id, title: mockData.board.title, description: mockData.board.description })
    dispatch(setList(newList))

  } catch (error) {
    dispatch(setError(error.message))
  } finally {
    dispatch(setLoading(false))
  }
})