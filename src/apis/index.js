import axios from 'axios'
import { API_HOST } from '~/utils/constants'
import { Authorization } from './authApi'

// Boards
export const fetchDetailsBoardsApi = async (boardId) => {
  const response = await axios.get(`${API_HOST}/boards/${boardId}`)
  return response.data
}

export const addBoardApi = async (data) => {
  const response = await axios.post(`${API_HOST}/boards/create`, data, Authorization())
  return response.data
}

export const updateBoardApi = async (boardId, data) => {
  const response = await axios.put(`${API_HOST}/boards/${boardId}`, data)
  return response.data
}

export const setMoveCardWithoutColumnApi = async (data) => {
  const response = await axios.post(`${API_HOST}/boards/move`, data)
  return response.data
}


// Columns
export const addNewColumnApi = async (data) => {
  const response = await axios.post(`${API_HOST}/columns/create`, data)
  return response.data
}

export const updateColumnApi = async (columnId, data) => {
  const response = await axios.put(`${API_HOST}/columns/${columnId}`, data)
  return response.data
}

export const destroyColumnApi = async (columnId) => {
  const response = await axios.delete(`${API_HOST}/columns/${columnId}`)
  return response.data
}

// Cards
export const addNewCardApi = async (data) => {
  const formData = new FormData()
  formData.append('boardId', data.boardId)
  formData.append('columnId', data.columnId)
  formData.append('title', data.title)
  if (data.description) formData.append('description', data.description)
  if (data.cover) formData.append('cover', data.cover)

  const response = await axios.post(`${API_HOST}/cards/create`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

export const updateCardApi = async (cardId, data) => {
  const response = await axios.put(`${API_HOST}/cards/${cardId}`, data)
  return response.data
}

export const destroyCardApi = async (cardId) => {
  const response = await axios.delete(`${API_HOST}/cards/${cardId}`)
  return response.data
}