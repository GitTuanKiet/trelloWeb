import { createSlice } from '@reduxjs/toolkit'
import { updateBoardApi, setMoveCardWithoutColumnApi, updateColumnApi } from '~/apis'
import { cloneDeep } from 'lodash'

const boardSlice = createSlice({
  name: 'board',
  initialState: {
    board: null,
    loading: false,
    error: null
  },
  reducers: {
    setBoard: (state, action) => {
      state.board = action.payload
      state.loading = false
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
      state.loading = false
    },
    setMoveColumn: (state, action) => {
      const { newColumnOrderIds, orderedColumns } = action.payload
      const cloneBoard = cloneDeep(state.board)
      cloneBoard.columnOrderIds = newColumnOrderIds
      cloneBoard.columns = orderedColumns

      state.board = cloneBoard

      updateBoardApi(cloneBoard._id, { columnOrderIds: newColumnOrderIds })
    },
    setMoveCardWithinColumn: (state, action) => {
      const { newCardOrderIds, orderedCards, columnId } = action.payload
      const cloneBoard = cloneDeep(state.board)
      const column = cloneBoard.columns.find((column) => column._id === columnId)
      column.cardOrderIds = newCardOrderIds
      column.cards = orderedCards

      state.board = cloneBoard

      updateColumnApi(columnId, { cardOrderIds: newCardOrderIds })
    },
    setMoveCardWithoutColumn: (state, action) => {
      const { newColumns, cardId, prevColumnId, nextColumnId } = action.payload
      const cloneBoard = cloneDeep(state.board)
      cloneBoard.columns = newColumns

      state.board = cloneBoard

      let prevCardOrderIds = newColumns.find((column) => column._id === prevColumnId).cardOrderIds.filter((card) => !card.includes('-placeholder'))
      const nextCardOrderIds = newColumns.find((column) => column._id === nextColumnId).cardOrderIds
      setMoveCardWithoutColumnApi({
        cardId,
        prevColumnId,
        prevCardOrderIds,
        nextColumnId,
        nextCardOrderIds
      })
    }
  }
})

export default boardSlice.reducer
export const {
  setBoard,
  setLoading,
  setError,
  setMoveColumn,
  setMoveCardWithinColumn,
  setMoveCardWithoutColumn
} = boardSlice.actions
