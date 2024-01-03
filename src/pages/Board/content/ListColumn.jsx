import Box from '@mui/material/Box'
import Column from './Column'
import Button from '@mui/material/Button'
import AddBoxIcon from '@mui/icons-material/AddBox'
import InputBase from '@mui/material/InputBase'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import { toast } from 'react-toastify'

const ListColumn = ({ columns, addNewColumn, addNewCard, deleteColumn }) => {
  const [showAddColumnForm, setShowAddColumnForm] = useState(false)
  const settingShow = () => setShowAddColumnForm(!showAddColumnForm)

  const handleAddColumn = (e) => {
    if (e.target.value === '') return toast.error('Please enter column title')

    addNewColumn({ title: e.target.value })
    settingShow()
  }
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
        {columns?.map((column) => ( <Column key={column?._id} column={column} addNewCard={addNewCard} deleteColumn={deleteColumn} /> ))}
        {/* add new column */}
        {!showAddColumnForm ?
          <Button
            startIcon={<AddBoxIcon />}
            variant="contained"
            onClick={settingShow}
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
          </Button> :
          <InputBase
            autoFocus
            placeholder='Enter column title...'
            onBlur={settingShow}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddColumn(e)
              }
            }}
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
            }}
          />}

      </Box>
    </SortableContext>
  )
}

export default ListColumn