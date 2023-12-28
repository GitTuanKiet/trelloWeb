import Button from '@mui/material/Button'
import ArrowDropDown from '@mui/icons-material/ArrowDropDown'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Divider from '@mui/material/Divider'
import DeleteIcon from '@mui/icons-material/Delete'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useState } from 'react'
import ListCards from './listCards'


const Column = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Box sx={{
      display: 'flex',
      minWidth: (theme) => (theme.trello.columns.width),
      maxWidth: (theme) => (theme.trello.columns.width),
      maxHeight: (theme) => (theme.trello.columns.height),
      padding: 2,
      borderRadius: 4,
      height: 'fit-content',
      flexDirection: 'column',
      justifyContent: 'space-between',
      bgcolor: 'divider'
    }}>
      {/* header column */}
      <Box sx={{
        display: 'flex',
        bgcolor: 'inherit',
        justifyContent: 'space-between',
        alignItems: 'center',
        p:2,
        width:'100%',
        height:(theme) => theme.trello.columns.heightheader
      }}>
        <Typography variant='h5' sx={{ fontSize:'1.4rem', fontWeight:'bold' }}>Column number one</Typography>
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
        >
          <MenuList>
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
          </MenuList>
        </Menu>
      </Box>
      {/* cards column */}
      <ListCards />
      {/* footer column */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p:2,
        width:'100%',
        height:(theme) => theme.trello.columns.heightfooter
      }}>
        <Button
          startIcon={ <AddBoxIcon sx={{ cursor:'pointer' }} /> }
          sx={{ fontSize:'1rem', color:(theme) => theme.palette.text.primary }}>
                Drag and drop to list
        </Button>
        <Button endIcon={<DragHandleIcon sx={{ cursor:'pointer' }} />}
          sx={{ fontSize:'1rem', color:(theme) => theme.palette.text.primary }}
        ></Button>

      </Box>
    </Box>
  )
}
export default Column
