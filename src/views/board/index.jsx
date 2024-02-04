
import BoardContent from './Content/_id'
import BoardBar from './BoardBar'
import { useEffect } from 'react'
import { Container, CircularProgress, Backdrop } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { newCard, newColumn, fetchDetailsBoards, destroyColumn } from '~/redux/board/boardThunk'
import { useParams } from 'react-router-dom'
import config from '~/config'


// material-ui
import { Grid } from '@mui/material'

// project imports
import { fetchListBoard, addBoard, destroyBoard } from '~/redux/Auth/thunk'
import { jwtDecode } from 'jwt-decode'

const Board = () => {
  return (
    <Container disableGutters maxWidth='false' sx={{ height: '100vh', '@media (min-width: 600px)': { paddingLeft: '0', paddingRight: '0' } }}>
      <BoardBar />
      <BoardContent />
    </Container>
  )
}

export default Board
