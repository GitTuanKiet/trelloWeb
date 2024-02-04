
import BoardContent from '.'
import BoardBar from '../BoardBar'
import { useEffect } from 'react'
import { Container, CircularProgress, Backdrop } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDetailsBoards } from '~/redux/board/boardThunk'
import { useParams } from 'react-router-dom'
import config from '~/config'

const _ID = () => {
  const dispatch = useDispatch()
  const { board, loading, error } = useSelector((state) => state.board)
  const { boardId } = useParams()
  let id = boardId ? boardId : config.defaultId

  useEffect(() => {
    dispatch(fetchDetailsBoards('65bfd4d75cf0277111250ac0'))
  }, [dispatch])

  return (
    <>
      {loading &&
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>}
      <BoardContent />
    </>

  )
}

export default _ID
