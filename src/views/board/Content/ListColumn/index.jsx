
import Column from './Column'
import AddColumnBtn from './AddColumnBtn'
import { Box } from '@mui/material'

import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'


const ListColumn = ({ columns }) => {
  return (
    <SortableContext items={columns?.map(column => column._id)} strategy={horizontalListSortingStrategy}>
      <Box sx={{
        display: 'flex',
        width : '100%',
        height: '100%',
        overflow: 'auto',
        gap: 2,
        bgcolor: 'inherit',
        '&::-webkit-scrollbar-track': {
          mx: 1,
          borderRadius: 4,
          backgroundColor: 'rgba(0,0,0,0.12)'
        }
      }}>
        {/* column */}
        {columns?.map((column) => ( <Column key={column?._id} column={column} /> ))}
        {/* add new column */}
        <AddColumnBtn />

      </Box>
    </SortableContext>
  )
}

export default ListColumn