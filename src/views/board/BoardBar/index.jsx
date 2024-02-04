
// material-ui
import { Grid } from '@mui/material'

// project imports
import TabsChip from './TabsChip'
import MembersBoard from './MembersBoard'
import { gridSpacing } from '~/utils/constants'


// ===========================|| BOARD BAR ||=========================== //

const BoardBar = () => {
  return (
    <Grid container spacing={gridSpacing} sx={{ borderBottom: (theme) => `1px solid ${theme.palette.primary.dark}` }}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item sx={{ flexGrow: 1 }}>
            <TabsChip />
          </Grid>
          <Grid item >
            <MembersBoard />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default BoardBar