import Button from '@mui/material/Button'
import ArrowDropDown from '@mui/icons-material/ArrowDropDown'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import DeleteIcon from '@mui/icons-material/Delete'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import ListCard from './ListCard'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import { sortArray } from '../../../utils/sorts'


const Column = ({ column }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const [cards, setCards] = useState([])

  useEffect(() => {
    setCards(sortArray(column?.cards, column?.cardOrderIds, '_id'))
  }, [column])

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: column._id,
    data: { ...column }
  })

  const dndColumnStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    opacity: isDragging ? 0.5 : 1
  }

  return (
    <div ref={setNodeRef} style={dndColumnStyle} {...attributes}>
      <Box
        {...listeners}
        sx={{
          minWidth: (theme) => (theme.trello.columns.width),
          maxWidth: (theme) => (theme.trello.columns.width),
          maxHeight: (theme) => (theme.trello.columns.height),
          margin:'8px 0px 0px 16px',
          cursor: 'pointer',
          borderRadius: 2,
          height: 'fit-content',
          bgcolor: 'divider'
        }}>
        {/* header column */}
        <Box sx={{
          display: 'flex',
          bgcolor: 'inherit',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(0,0,0,0.12)',
          padding: 1,
          borderRadius: 'inherit',
          alignItems: 'center',
          maxHeight:(theme) => theme.trello.columns.heightheader,
          minHeight:(theme) => theme.trello.columns.heightheader
        }}>
          <Typography variant='h5' sx={{ fontSize:'1.4rem', fontWeight:'bold' }}>{column?.title}</Typography>
          <ArrowDropDown
            id="basic-column-dropdown"
            aria-controls={open ? 'basic-menu-dropdown' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          />
          <Menu
            id="basic-menu-dropdown"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-column-dropdown'
            }}
            sx={{
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              '& .MuiButtonBase-root': {
                gap: 1
              },
              'ul': {
                padding: 0.5
              },
              '& .MuiDivider-root': {
                margin: 0,
                borderColor: 'text.secondary'
              }
            }}
            transformOrigin={{ horizontal: 'left', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          >
            <MenuItem>
              <StarBorderIcon />Star
            </MenuItem>
            <Divider />
            <MenuItem>
              <ContentCopyIcon />Copy
            </MenuItem>
            <MenuItem>
              <DeleteIcon />Destroy
            </MenuItem>
          </Menu>
        </Box>
        {/* cards column */}
        <ListCard key={column._id} cards={cards} />
        {/* footer column */}
        <Box
          sx={{
            display: 'flex',
            bgcolor: 'inherit',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(0,0,0,0.12)',
            borderRadius: 'inherit',
            padding: 1,
            alignItems: 'center',
            maxHeight:(theme) => theme.trello.columns.heightfooter,
            minHeight:(theme) => theme.trello.columns.heightfooter
          }}
        >
          <Button variant="outlined" startIcon={ <AddBoxIcon sx={{ cursor:'pointer', color:'text.primary' }} /> } ><Typography sx={{ color:'text.primary' }}>Add New Card</Typography></Button>
          <Button variant="outlined" endIcon={<DragHandleIcon sx={{ cursor:'pointer', color:'text.primary' }} />} ></Button>
        </Box>
      </Box>
    </div>
  )
}
export default Column
