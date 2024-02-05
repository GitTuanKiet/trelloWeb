import axios from 'axios'
import { API_HOST } from '~/utils/constants'
import { Authorization } from './authApi'

// fetch
export const fetchDetailsBoardsApi = async (boardId) => {
  const response = await axios.get(`${API_HOST}/boards/${boardId}`, Authorization())
  return response.data
}

// move
export const setMoveCardWithoutColumnApi = async (data) => {
  const response = await axios.post(`${API_HOST}/boards/move`, data, Authorization())
  return response.data
}

// create
export const addBoardApi = async (data) => {
  const response = await axios.post(`${API_HOST}/boards/create`, data, Authorization())
  return response.data
}

export const addNewColumnApi = async (boardId, data) => {
  const response = await axios.post(`${API_HOST}/columns/create/${boardId}`, data, Authorization())
  return response.data
}

export const addNewCardApi = async (boardId, data) => {
  const formData = new FormData()
  formData.append('columnId', data.columnId)
  formData.append('title', data.title)
  if (data.description) formData.append('description', data.description)
  if (data.cover) formData.append('cover', data.cover)

  const response = await axios.post(`${API_HOST}/cards/create/${boardId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  return response.data
}

// update
export const updateBoardApi = async (boardId, data) => {
  const response = await axios.put(`${API_HOST}/boards/${boardId}`, data, Authorization())
  return response.data
}

export const updateColumnApi = async (boardId, data) => {
  const response = await axios.put(`${API_HOST}/columns/${boardId}`, data, Authorization())
  return response.data
}

export const updateCardApi = async (boardId, data) => {
  const response = await axios.put(`${API_HOST}/cards/${boardId}`, data, Authorization())
  return response.data
}

// delete
export const destroyColumnApi = async (boardId, columnId) => {
  const response = await axios.delete(`${API_HOST}/columns/delete/${boardId}&&${columnId}`, Authorization())
  return response.data
}

export const destroyBoardApi = async (boardId) => {
  const response = await axios.delete(`${API_HOST}/boards/delete/${boardId}`, Authorization())
  return response.data
}


