import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchDetailsBoardsApi, addNewCardApi, addNewColumnApi, destroyColumnApi } from '~/apis'
import { cloneDeep, isEmpty } from 'lodash'
import { sortArray } from '~/utils/sorts'
import { generatePlaceholder } from '~/utils/formatters'
import { setLoading, setError, setBoard } from './boardSlice'

export const fetchDetailsBoards = createAsyncThunk('board/fetchDetailsBoards', async (boardId, { dispatch }) => {
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

export const newCard = (board, data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    const newData = { ...data, boardId: board._id }
    const newCard = await addNewCardApi(newData)
    const cloneBoard = cloneDeep(board)
    const columnAdd = cloneBoard?.columns?.find((column) => column._id === newData.columnId)
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
}

export const newColumn = (board, data) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    const newData = { ...data, boardId: board._id }
    const newColumn = await addNewColumnApi(newData)
    const cloneBoard = cloneDeep(board)
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
}

export const destroyColumn = (board, columnId) => async (dispatch) => {
  try {
    dispatch(setLoading(true))
    const cloneBoard = cloneDeep(board)
    cloneBoard.columns = cloneBoard.columns.filter((column) => column._id !== columnId)
    cloneBoard.columnOrderIds = cloneBoard.columns.map((column) => column._id)
    dispatch(setBoard(cloneBoard))
    return await destroyColumnApi(columnId)
  } catch (error) {
    dispatch(setError(error.message))
  } finally {
    dispatch(setLoading(false))
  }
}