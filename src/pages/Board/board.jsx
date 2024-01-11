import { BoardHeader } from './boardheader'
import { BoardContent } from './boardcontent'
import { AppHeader } from '~/components/appheader'
import { useEffect } from 'react'
import { Container, CircularProgress, Backdrop } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { newCard, newColumn, fetchDetailsBoards, destroyColumn } from '~/redux/board/boardThunk'

export const Board = () => {
  const dispatch = useDispatch()
  const board = useSelector((state) => state.boardSlice.board)
  const loading = useSelector((state) => state.boardSlice.loading)

  useEffect(() => {
    const boardId = '65927eee1bac6f821a61e888'
    dispatch(fetchDetailsBoards(boardId))
  }, [dispatch])

  const addNewColumn = (data) => {
    dispatch(newColumn(board, data))
  }

  const addNewCard = async (data) => {
    dispatch(newCard(board, data))
  }

  const deleteColumn = (columnId) => {
    return dispatch(destroyColumn(board, columnId))
  }

  if (loading || !board) {
    return (
      <Container disableGutters maxWidth='false' sx={{ height:'100vh', '@media (min-width: 600px)': { paddingLeft: '0', paddingRight: '0' } }}>
        <AppHeader />
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>
    )
  }

  return (
    <Container disableGutters maxWidth='false' sx={{ height:'100vh', '@media (min-width: 600px)': { paddingLeft: '0', paddingRight: '0' } }}>
      <AppHeader />
      <BoardHeader board={board} />
      <BoardContent
        board={board}
        addNewColumn={addNewColumn}
        addNewCard={addNewCard}
        deleteColumn={deleteColumn}
      />
    </Container>
  )
}
