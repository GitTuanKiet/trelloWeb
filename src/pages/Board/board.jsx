import Container from '@mui/material/Container'
import { BoardHeader } from './boardheader'
import { BoardContent } from './boardcontent'
import { AppHeader } from '~/components/appheader'
import { useEffect, useState } from 'react'
import { fetchDetailsBoardsApi, addNewCardApi, addNewColumnApi, updateBoardApi, updateColumnApi, setMoveCardWithoutColumnApi, destroyColumnApi } from '~/apis'
import { cloneDeep, isEmpty } from 'lodash'
import { genereatePlaceholder } from '~/utils/formatters'
import { sortArray } from '~/utils/sorts'
import { Box, CircularProgress, Typography } from '@mui/material'

export const Board = () => {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '65927eee1bac6f821a61e888'
    fetchDetailsBoardsApi(boardId).then((board) => {

      board.columns = sortArray(board.columns, board.columnOrderIds, '_id')

      board.columns.map((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [genereatePlaceholder(column)]
          column.cardOrderIds = [genereatePlaceholder(column)._id]
        } else {
          column.cards = sortArray(column.cards, column.cardOrderIds, '_id')
        }
      })

      setBoard(board)
    })
  }, [])

  const addNewColumn = async (data) => {
    const newData = { ...data, boardId: board._id }
    const newColumn = await addNewColumnApi(newData)
    const cloneBoard = cloneDeep(board)
    if (newColumn) {
      newColumn.cards = [genereatePlaceholder(newColumn)]
      newColumn.cardOrderIds = [genereatePlaceholder(newColumn)._id]
      cloneBoard.columnOrderIds.push(newColumn._id)
      cloneBoard.columns.push(newColumn)
    }
    setBoard(cloneBoard)
  }

  const addNewCard = async (data) => {
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
    setBoard(cloneBoard)
  }

  const setMoveColumn = (newColumnOrderIds, orderedColumns) => {
    const cloneBoard = cloneDeep(board)
    cloneBoard.columnOrderIds = newColumnOrderIds
    cloneBoard.columns = orderedColumns
    setBoard(cloneBoard)
    updateBoardApi(board._id, { columnOrderIds: newColumnOrderIds })
  }

  const setMoveCardWithinColumn = (newCardOrderIds, orderedCards, columnId) => {
    const cloneBoard = cloneDeep(board)
    const column = cloneBoard.columns.find((column) => column._id === columnId)
    column.cardOrderIds = newCardOrderIds
    column.cards = orderedCards
    setBoard(cloneBoard)
    updateColumnApi(columnId, { cardOrderIds: newCardOrderIds })
  }

  const setMoveCardWithoutColumn = (newColumns, cardId, prevColumnId, nextColumnId) => {
    const cloneBoard = cloneDeep(board)
    cloneBoard.columns = newColumns
    setBoard(cloneBoard)

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

  const deleteColumn = (columnId) => {
    const cloneBoard = cloneDeep(board)
    cloneBoard.columns = cloneBoard.columns.filter((column) => column._id !== columnId)
    cloneBoard.columnOrderIds = cloneBoard.columns.map((column) => column._id)
    setBoard(cloneBoard)

    destroyColumnApi(columnId)
  }

  if (!board) return (
    <Container disableGutters maxWidth='false' sx={{ height:'100vh', '@media (min-width: 600px)': { paddingLeft: '0', paddingRight: '0' } }}>
      <AppHeader />
      <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%', gap :2 }}>
        <CircularProgress />
        <Typography>Loading...</Typography>
      </Box>
    </Container>
  )

  return (
    <Container disableGutters maxWidth='false' sx={{ height:'100vh', '@media (min-width: 600px)': { paddingLeft: '0', paddingRight: '0' } }}>
      <AppHeader />
      <BoardHeader board={board} />
      <BoardContent
        board={board}
        addNewColumn={addNewColumn}
        addNewCard={addNewCard}
        setMoveColumn={setMoveColumn}
        setMoveCardWithinColumn={setMoveCardWithinColumn}
        setMoveCardWithoutColumn={setMoveCardWithoutColumn}
        deleteColumn={deleteColumn}
      />
    </Container>
  )
}
