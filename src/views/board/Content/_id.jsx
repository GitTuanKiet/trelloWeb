
import BoardContent from '.'
import { useEffect } from 'react'
import { CircularProgress, Backdrop } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDetailsBoards } from '~/redux/board/boardThunk'
import { useParams } from 'react-router-dom'
import config from '~/config'

const _ID = () => {
  const dispatch = useDispatch()
  const { listBoard } = useSelector((state) => state.auth)
  const { loading, error } = useSelector((state) => state.board)
  const { id } = useParams()

  useEffect(() => {
    const boardId = id ? id : config.defaultId
    dispatch(fetchDetailsBoards(boardId))
  }, [dispatch, id])

  if (!listBoard?.map((board) => board._id).includes(id)) {
    return <div>Board not found</div>
  }

  return (
    <>
      {loading &&
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>}
      {error && <div>{error}</div>}
      <BoardContent />
    </>

  )
}

export default _ID
