import Box from '@mui/material/Box'
import Column from './column'
import { Button } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'

const ListColumns = () => {

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'flex-start',
      overflowX:'auto',
      overflowY:'hidden',
      bgcolor: 'inherit',
      gap: 2,
      '&::-webkit-scrollbar-track': {
        mx: 2,
        borderRadius: 4,
        backgroundColor: 'rgba(0,0,0,0.12)'
      }
    }}>
      {/* column */}
      <Column />
      <Column />

      {/* add new column */}
      <Box sx={{
        minWidth: (theme) => (theme.trello.columns.width),
        maxWidth: (theme) => (theme.trello.columns.width),
        maxHeight: (theme) => (theme.trello.columns.height),
        padding: 1,
        borderRadius: 4,
        height: 'fit-content',
        bgcolor: 'divider',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
      }}>
        <Button
          startIcon={<AddBoxIcon />}
          sx={{ color:'white', fontWeight:'bold', fontSize:'1.2rem', borderRadius:4 }}
        >
          Add new column
        </Button>
      </Box>
    </Box>
  )
}

export default ListColumns