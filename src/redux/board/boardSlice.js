import { createSlice } from '@reduxjs/toolkit'
import { updateBoardApi, setMoveCardWithoutColumnApi, updateColumnApi } from '~/apis'
import { mockData } from '~/apis/mock-data'

export const initialState = {
  loading: false,
  error: null,
  ...mockData.board
}

const boardSlice = createSlice({
  name: 'board',
  initialState: initialState,
  reducers: {
    setBoard: (state, action) => {
      state.loading = false
      Object.assign(state, action.payload)

    },
    setColumns: (state, action) => {
      Object.assign(state.columns, action.payload)
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

      Object.assign(state, { columnOrderIds: newColumnOrderIds, columns: orderedColumns })

      updateBoardApi(state._id, { columnOrderIds: newColumnOrderIds })
    },
    setMoveCardWithinColumn: (state, action) => {
      const { newCardOrderIds, orderedCards, columnId } = action.payload

      const column = state.columns.find((column) => column._id === columnId)
      Object.assign(column, { cardOrderIds: newCardOrderIds, cards: orderedCards })

      updateColumnApi(state._id, { _id: columnId, cardOrderIds: newCardOrderIds })
    },
    setMoveCardWithoutColumn: (state, action) => {
      const { newColumns, cardId, prevColumnId, nextColumnId } = action.payload

      Object.assign(state, { columns: newColumns })

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
  setColumns,
  setLoading,
  setError,
  setMoveColumn,
  setMoveCardWithinColumn,
  setMoveCardWithoutColumn
} = boardSlice.actions
