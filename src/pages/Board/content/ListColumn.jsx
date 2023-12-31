import Box from '@mui/material/Box'
import Column from './Column'
import { Button } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

const ListColumn = ({ columns }) => {
  return (
    <SortableContext items={columns?.map(column => column._id)} strategy={horizontalListSortingStrategy}>
      <Box sx={{
        display: 'flex',
        width : '100%',
        height: '100%',
        overflowX:'auto',
        overflowY:'hidden',
        bgcolor: 'inherit',
        '&::-webkit-scrollbar-track': {
          mx: 2,
          borderRadius: 4,
          backgroundColor: 'rgba(0,0,0,0.12)'
        }
      }}>
        {/* column */}
        {columns?.map((column) => ( <Column key={column._id} column={column} /> ))}
        {/* add new column */}
        <Button
          startIcon={<AddBoxIcon />}
          variant="contained"
          sx={{
            minWidth: (theme) => (theme.trello.columns.width),
            maxWidth: (theme) => (theme.trello.columns.width),
            maxHeight: (theme) => (theme.trello.columns.height),
            padding: 1,
            borderRadius: 2,
            height: 'fit-content',
            bgcolor: 'divider',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            margin:'8px 0px 0px 16px',
            color:'text.primary',
            fontWeight:'bold',
            fontSize:'1.2rem'
          }}>
          Add new column
        </Button>
      </Box>
    </SortableContext>
  )
}

export default ListColumn