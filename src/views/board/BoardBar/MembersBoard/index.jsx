import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

// material-ui
import { Stack, Skeleton } from '@mui/material'

// project imports
import BtnInvite from './BtnInvite'
import GroupMembers from './GroupMembers'
import { fetchListUser } from '~/redux/user/userThunk'

const MembersBoard = () => {
  const { loading } = useSelector((state) => state.board)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchListUser())
  }, [dispatch])

  return (
    <>
      <Stack direction="row" spacing={2}>
        {loading ? (<Skeleton variant="circular" width={32} height={32} />) : (
          <BtnInvite />
        )}
        {loading ? (<Skeleton variant="circular" width={32} height={32} />) : (
          <GroupMembers />
        )}
      </Stack>
    </>

  )
}

export default MembersBoard
