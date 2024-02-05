
import BoardContent from '.'
import { useEffect } from 'react'
import { CircularProgress, Backdrop } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDetailsBoards } from '~/redux/board/boardThunk'
import { useParams } from 'react-router-dom'
import config from '~/config'
import { toast } from 'react-toastify'

const _ID = () => {
  const dispatch = useDispatch()
  const { listBoard } = useSelector((state) => state.auth)
  const { loading, error } = useSelector((state) => state.board)
  const { id } = useParams()

  useEffect(() => {
    let boardId = id ? id : config.defaultId
    if (!listBoard.find((board) => board._id === boardId)) {
      boardId = listBoard[0]._id
    }
    dispatch(fetchDetailsBoards(boardId))
  }, [dispatch, id, listBoard])

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
      {error && toast.error(error)}
    </>

  )
}

export default _ID
