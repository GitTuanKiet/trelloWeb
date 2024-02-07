
// material-ui
import { Box, Stack } from '@mui/material'
import { useTheme } from '@mui/material'

// project imports
import TabsChip from './TabsChip'
import MembersBoard from './MembersBoard'


// ===========================|| BOARD BAR ||=========================== //

const BoardBar = () => {
  const theme = useTheme()
  return (
    <>
      <Stack
        direction="row"
        sx={{
          bgcolor: theme.palette.background.paper,
          display: 'flex',
          gap:2,
          alignItems: 'center',
          overflowX: 'auto',
          overflowY: 'hidden',
          px: 1,
          justifyContent: 'space-between',
          [theme.breakpoints.down('md')]: {
            width: 'auto'
          }
        }}
      >
        <TabsChip />
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ flexGrow: 1 }} />
        <MembersBoard />
      </Stack>
    </>
  )
}

export default BoardBar