import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchDetailsBoardsApi, addNewCardApi, addNewColumnApi, destroyColumnApi } from '~/apis'
import { cloneDeep, isEmpty } from 'lodash'
import { sortArray } from '~/utils/sorts'
import { generatePlaceholder } from '~/utils/formatters'
import { setLoading, setError, setBoard } from './boardSlice'
import { isAuth } from '~/utils/auth'
import config from '~/config'

export const fetchDetailsBoards = createAsyncThunk('board/fetchDetailsBoards', async (boardId, { dispatch }) => {
  if ( boardId === config.defaultId ) return
  try {
    dispatch(setLoading(true))

    const board = await fetchDetailsBoardsApi(boardId)

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
    const newCard = await addNewCardApi(getState().board.board._id, data)
    const cloneBoard = cloneDeep(getState().board.board)
    const columnAdd = cloneBoard.columns.find((column) => column._id === data.columnId)
    if (columnAdd) {
      if (columnAdd.cards[0]?._id.includes('-placeholder')) {
        columnAdd.cards = [newCard]
        columnAdd.cardOrderIds = [newCard._id]
      } else {
        columnAdd.cardOrderIds.push(newCard._id)
        columnAdd.cards.push(newCard)
      }
    }
    dispatch(setBoard(cloneBoard))
  } catch (error) {
    dispatch(setError(error.message))
  } finally {
    dispatch(setLoading(false))
  }
})

export const newColumn = createAsyncThunk('board/newColumn', async (data, { dispatch, getState }) => {
  try {
    dispatch(setLoading(true))
    const newColumn = await addNewColumnApi(getState().board.board._id, data)
    const cloneBoard = cloneDeep(getState().board.board)
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
    const cloneBoard = cloneDeep(getState().board.board)
    cloneBoard.columns = cloneBoard.columns.filter((column) => column._id !== columnId)
    cloneBoard.columnOrderIds = cloneBoard.columns.map((column) => column._id)
    dispatch(setBoard(cloneBoard))
    const result = await destroyColumnApi(getState().board.board._id)
    return result
  } catch (error) {
    dispatch(setError(error.message))
  } finally {
    dispatch(setLoading(false))
  }
})