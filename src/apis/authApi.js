import axios from 'axios'
import { getTokenJWT } from '~/utils/auth'
import { API_HOST } from '~/utils/constants'

export const Authorization = (token = getTokenJWT()) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}

export const loginApi = async (data) => {
  const response = await axios.post(`${API_HOST}/auth/login`, data)
  return response.data
}

export const registerApi = async (data) => {
  const response = await axios.post(`${API_HOST}/auth/register`, data)
  return response.data
}

export const forgotPasswordApi = async (data) => {
  const response = await axios.post(`${API_HOST}/auth/forgot-password`, data)
  return response.data
}

export const logoutApi = async () => {
  await axios.get(`${API_HOST}/auth/logout`, Authorization())
}

export const updateProfileApi = async (data) => {
  const response = await axios.post(`${API_HOST}/auth/update-profile`, data, Authorization())
  return response.data
}

export const updatePasswordApi = async (data) => {
  const response = await axios.post(`${API_HOST}/auth/update-password`, data, Authorization())
  return response.data
}

export const fetchListBoardApi = async () => {
  const response = await axios.get(`${API_HOST}/auth/get-list-board`, Authorization())
  return response.data
}

export const destroyBoardApi = async (boardId) => {
  const response = await axios.delete(`${API_HOST}/boards/${boardId}`, Authorization())
  return response.data
}