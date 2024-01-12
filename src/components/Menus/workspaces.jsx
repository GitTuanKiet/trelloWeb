import React from 'react'
import { Button, Menu, MenuItem, MenuList, ListItemIcon, ListItemText, Divider, Typography } from '@mui/material'
import { ContentCut, ContentCopy, ContentPaste, DeleteOutline, Cloud } from '@mui/icons-material'

const Board = ({ board }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <div>
      <Button
        id={`basic-button-${board}`}
        aria-controls={open ? `basic-menu-${board}` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          color: 'text.primary',
          fontFamily: '-moz-initial'
        }}
      >
        {board}
      </Button>
      <Menu
        id={`basic-menu-${board}`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': `basic-button-${board}`
        }}
      >
        <MenuList>
          <MenuItem>
            <ListItemIcon>
              <ContentCut fontSize="small" />
            </ListItemIcon>
            <ListItemText>Cut</ListItemText>
            <Typography variant="body2" color="text.secondary">
            ⌘X
            </Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ContentCopy fontSize="small" />
            </ListItemIcon>
            <ListItemText>Copy</ListItemText>
            <Typography variant="body2" color="text.secondary">
            ⌘C
            </Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ContentPaste fontSize="small" />
            </ListItemIcon>
            <ListItemText>Paste</ListItemText>
            <Typography variant="body2" color="text.secondary">
            ⌘V
            </Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <DeleteOutline fontSize="small" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
            <Typography variant="body2" color="text.secondary">
            ⌘D
            </Typography>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <Cloud fontSize="small" />
            </ListItemIcon>
            <ListItemText>Web Clipboard</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  )
}

export default Board

