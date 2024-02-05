import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchDetailsBoardsApi, addNewCardApi, addNewColumnApi, destroyColumnApi } from '~/apis'
import { cloneDeep, isEmpty } from 'lodash'
import { sortArray } from '~/utils/sorts'
import { generatePlaceholder } from '~/utils/formatters'
import { setLoading, setError, setBoard, setColumns } from './boardSlice'
import { isAuth } from '~/utils/auth'
import config from '~/config'
import { mockData } from '~/apis/mock-data'

export const fetchDetailsBoards = createAsyncThunk('board/fetchDetailsBoards', async (boardId, { dispatch }) => {
  try {
    dispatch(setLoading(true))

    if (boardId === config.defaultId) {
      dispatch(setBoard(mockData.board))
      return
    }

    const board = await fetchDetailsBoardsApi(boardId)

    if (board.error) {
      return board.error
    }

    board.columns = sortArray(board.columns, board.columnOrderIds, '_id')
    board.columns.map((column) => {
      if (isEmpty(column.cards)) {
        column.cards = [generatePlaceholder(column)]
        column.cardOrderIds = [generatePlaceholder(column)._id]
      } else {
        column.cards = sortArray(column.cards, column.cardOrderIds, '_id')
      }
    })

    dispatch(setBoard(board))
  } catch (error) {
    dispatch(setError(error.message))
  } finally {
    dispatch(setLoading(false))
  }
})

export const newCard = createAsyncThunk('board/newCard', async (data, { dispatch, getState }) => {
  try {
    dispatch(setLoading(true))
    const newCard = await addNewCardApi(getState().board._id, data)

    if (newCard.error) {
      return newCard.error
    }

    const cloneColumns = cloneDeep(getState().board.columns)
    const columnAdd = cloneColumns.find((column) => column._id === data.columnId)
    if (columnAdd) {
      if (columnAdd.cards[0]?._id.includes('-placeholder')) {
        columnAdd.cards = [newCard]
        columnAdd.cardOrderIds = [newCard._id]
      } else {
        columnAdd.cardOrderIds.push(newCard._id)
        columnAdd.cards.push(newCard)
      }
    }
    dispatch(setColumns(cloneColumns))
  } catch (error) {
    dispatch(setError(error.message))
  } finally {
    dispatch(setLoading(false))
  }
})

export const newColumn = createAsyncThunk('board/newColumn', async (data, { dispatch, getState }) => {
  try {
    dispatch(setLoading(true))
    const newColumn = await addNewColumnApi(getState().board._id, data)

    if (newColumn.error) {
      return newColumn.error
    }

    const cloneBoard = cloneDeep(getState().board)
    if (newColumn) {
      newColumn.cards = [generatePlaceholder(newColumn)]
      newColumn.cardOrderIds = [generatePlaceholder(newColumn)._id]
      cloneBoard.columnOrderIds.push(newColumn._id)
      cloneBoard.columns.push(newColumn)
    }
    dispatch(setBoard(cloneBoard))
  } catch (error) {
    dispatch(setError(error.message))
  } finally {
    dispatch(setLoading(false))
  }
})

export const destroyColumn = createAsyncThunk('board/destroyColumn', async (columnId, { dispatch, getState }) => {
  try {
    if (!isAuth()) return 'You must be logged in to perform this action'
    dispatch(setLoading(true))
    const cloneBoard = cloneDeep(getState().board)
    cloneBoard.columns = cloneBoard.columns.filter((column) => column._id !== columnId)
    cloneBoard.columnOrderIds = cloneBoard.columns.map((column) => column._id)
    dispatch(setBoard(cloneBoard))
    const result = await destroyColumnApi(getState().board._id, columnId)

    if (result.payload) {
      return result.payload
    }

  } catch (error) {
    dispatch(setError(error.message))
  } finally {
    dispatch(setLoading(false))
  }
})