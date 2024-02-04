
import BoardContent from './Content'
import BoardBar from './BoardBar'
import { useEffect } from 'react'
import { Container, CircularProgress, Backdrop } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { newCard, newColumn, fetchDetailsBoards, destroyColumn } from '~/redux/Board/boardThunk'
import { useParams } from 'react-router-dom'
import config from '~/config'

const Board = () => {
  const dispatch = useDispatch()
  const board = useSelector((state) => state.board.board)
  const loading = useSelector((state) => state.board.loading)
  const { boardId } = useParams()
  let id = boardId ? boardId : config.defaultId

  useEffect(() => {
    dispatch(fetchDetailsBoards(id))
  }, [dispatch, id])

  const addNewColumn = (data) => {
    dispatch(newColumn(board, data))
  }

  const addNewCard = async (data) => {
    dispatch(newCard(board, data))
  }

  const deleteColumn = (columnId) => {
    return dispatch(destroyColumn(board, columnId))
  }

  return (
    <Container disableGutters maxWidth='false' sx={{ height:'100vh', '@media (min-width: 600px)': { paddingLeft: '0', paddingRight: '0' } }}>
      {loading &&
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>}
      <BoardBar />
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
