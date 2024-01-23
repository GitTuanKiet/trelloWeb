import { BoardHeader } from './boardheader'
import { BoardContent } from './boardcontent'
import { useEffect } from 'react'
import { Container, CircularProgress, Backdrop } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { newCard, newColumn, fetchDetailsBoards, destroyColumn } from '~/redux/board/boardThunk'

const Board = () => {
  const dispatch = useDispatch()
  const board = useSelector((state) => state.board.board)
  const loading = useSelector((state) => state.board.loading)

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

  if (!board) return (
    <Container disableGutters maxWidth='false' sx={{ height:'100vh', '@media (min-width: 600px)': { paddingLeft: '0', paddingRight: '0' } }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  )

  return (
    <Container disableGutters maxWidth='false' sx={{ height:'100vh', '@media (min-width: 600px)': { paddingLeft: '0', paddingRight: '0' } }}>
      {loading &&
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>}
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

export default Board
