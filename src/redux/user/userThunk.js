import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchListUserApi, inviteMemberApi, removeMemberApi } from '~/apis/userApi'
import { setListUser, setLoading, setError } from './userSlice'
import { setBoard } from '../board/boardSlice'
import { cloneDeep } from 'lodash'
import { getUserId, isAuth } from '~/utils/auth'

export const fetchListUser = createAsyncThunk('listUser/fetchListBoard', async (_, { dispatch }) => {
  try {
    dispatch(setLoading(true))
    const response = await fetchListUserApi()

    if (response.error) {
      return response.error
    }

    dispatch(setListUser(response))
  } catch (error) {
    dispatch(setError(error.message))
  } finally {
    dispatch(setLoading(false))
  }
})

export const inviteMember = createAsyncThunk('listUser/inviteMember', async (data, { dispatch }) => {
  if (!isAuth()) return 'You must login to invite member'
  if ( data.board.members.find(member => member._id === data.user._id)) return 'This user is already a member of this board'
  try {
    dispatch(setLoading(true))

    const response = await inviteMemberApi(data)

    if (response.error) {
      return response.error
    }

    const cloneBoard = cloneDeep(data.board)
    cloneBoard.members.push(data.user)
    dispatch(setBoard(cloneBoard))
    dispatch(fetchListUser())
  } catch (error) {
    dispatch(setError(error.message))
  } finally {
    dispatch(setLoading(false))
  }
})

export const removeMember = createAsyncThunk('listUser/removeMember', async (data, { dispatch }) => {
  if (!isAuth()) return 'You must login to remove member'
  try {
    dispatch(setLoading(true))
    const response = await removeMemberApi(data)

    if (response.error) {
      return response.error
    }

    const cloneBoard = cloneDeep(data.board)
    const index = cloneBoard.members.findIndex((member) => member._id === data.user._id)
    cloneBoard.members.splice(index, 1)
    dispatch(setBoard(cloneBoard))
    dispatch(fetchListUser())
  } catch (error) {
    dispatch(setError(error.message))
  } finally {
    dispatch(setLoading(false))
  }
})