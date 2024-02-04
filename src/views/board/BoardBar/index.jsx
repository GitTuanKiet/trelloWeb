import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'


// material-ui
import { Grid } from '@mui/material'

// project imports
import TabsChip from './TabsChip'
import MembersBoard from './MembersBoard'
import { gridSpacing } from '~/utils/constants'
import { fetchListBoard, addBoard } from '~/redux/Auth/thunk'

// ===========================|| BOARD BAR ||=========================== //

const BoardBar = () => {
  const dispatch = useDispatch()
  const { listBoard, loading } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(fetchListBoard())
  }, [dispatch])

  const handleAddBoard = (data) => {
    dispatch(addBoard(data))
  }

  return (
    <Grid container spacing={gridSpacing} sx={{ borderBottom: (theme) => `1px solid ${theme.palette.primary.dark}` }}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item sx={{ flexGrow: 1 }}>
            <TabsChip listBoard={listBoard} isLoading={loading} handleAddBoard={handleAddBoard} />
          </Grid>
          <Grid item >
            <MembersBoard listBoard={listBoard} isLoading={loading} dispatch={dispatch} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default BoardBar