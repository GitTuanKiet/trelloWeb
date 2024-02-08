import axios from 'axios'
import { Authorization } from './authApi'
import { API_HOST } from '~/utils/constants'

export const fetchListUserApi = async () => {
  const response = await axios.get(`${API_HOST}/users/get-list-user`, Authorization())
  return response.data
}

export const inviteMemberApi = async (data) => {
  const response = await axios.post(`${API_HOST}/users/invite-member`, data, Authorization())
  return response.data
}

export const removeMemberApi = async (data) => {
  const response = await axios.post(`${API_HOST}/users/remove-member`, data, Authorization())
  return response.data
}