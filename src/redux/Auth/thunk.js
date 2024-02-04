import { createAsyncThunk } from '@reduxjs/toolkit'
import { loginApi, registerApi, forgotPasswordApi, updateProfileApi, updatePasswordApi, fetchListBoardApi, destroyBoardApi } from '~/apis/authApi'
import { setLoading, setError, setToken, setUser, setList, getState } from './slice'
import { addBoardApi } from '~/apis'
import { isAuth } from '~/utils/auth'
import { cloneDeep } from 'lodash'

export const login = createAsyncThunk('auth/login', async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const response = await loginApi(data)
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
  try {
    dispatch(setLoading(true))
    const response = await updateProfileApi(data)
    dispatch(setUser(response))
  } catch (error) {
    dispatch(setError(error.message))
  } finally {
    dispatch(setLoading(false))
  }
})

export const updatePassword = createAsyncThunk('auth/updatePassword', async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    await updatePasswordApi(data)
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
    dispatch(setList(response))
  } catch (error) {
    dispatch(setError(error.message))
  } finally {
    dispatch(setLoading(false))
  }
})

export const addBoard = createAsyncThunk('boardBar/addBoard', async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const response = await addBoardApi(data)
    const newList = [...getState().auth.listBoard, response]
    dispatch(setList(newList))
  } catch (error) {
    dispatch(setError(error.message))
  } finally {
    dispatch(setLoading(false))
  }
})

export const destroyBoard = (boardId) => async (dispatch) => {
  try {
    if (!isAuth()) return 'You must be logged in to perform this action'
    dispatch(setLoading(true))
    const clone = cloneDeep(getState().auth.listBoard)
    const newList = clone.filter((item) => item._id !== boardId)
    dispatch(setList(newList))
    return await destroyBoardApi(boardId)
  } catch (error) {
    dispatch(setError(error.message))
  } finally {
    dispatch(setLoading(false))
  }
}