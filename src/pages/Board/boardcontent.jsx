import Box from '@mui/material/Box'
import ListColumns from './content/listColumns'

export const BoardContent = () => {
  return (
    <Box sx={{
      width:'100%',
      height: (theme) => (theme.trello.boardContentHeight),
      padding: 2,
      bgcolor: 'primary'
    }}>
      <ListColumns />
    </Box>
  )
}