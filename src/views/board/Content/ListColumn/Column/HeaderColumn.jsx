import {
  Box, Divider, ListItemIcon, Typography, Menu, MenuItem, MenuList
} from '@mui/material'
import {
  Delete as DeleteIcon,
  ArrowDropDown, Cloud, ContentCopy, ContentCut, ContentPaste
} from '@mui/icons-material'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'

const HeaderColumn = ({ deleteColumn, column }) => {

  const [anchorEl, setAnchorEl] = useState(null)

  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const confirm = useConfirm()

  const handleDeleteColumn = () => {
    confirm({
      title: 'Are you sure delete ' + column.title + '?',
      description: 'This will delete all cards in ' + column.title,
      confirmationText: 'Delete',
      cancellationText: 'Cancel',
      dialogProps: { maxWidth: 'sm' },
      confirmationButtonProps: { variant: 'contained', color: 'error' },
      cancellationButtonProps: { variant: 'outlined' }
    })
      .then(async () => {
        handleClose()

        const result = await deleteColumn(column._id)
        if (result.resultDelete) toast.success(result.resultDelete)
        else toast.error(result)
      })
      .catch((error) => {
        toast.error(error)
      })

  }

  return (
    <Box sx={{
      display: 'flex',
      bgcolor: (theme) => theme.palette.primary.main,
      justifyContent: 'space-between',
      borderBottom: '1px solid rgba(0,0,0,0.12)',
      padding: 1,
      borderRadius: (theme) => (theme?.customization?.borderRadius),
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
          }
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <MenuList>
          <MenuItem>
            <ListItemIcon>
              <ContentCut fontSize="small" />
            </ListItemIcon>
            <Typography>Cut</Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ContentCopy fontSize="small" />
            </ListItemIcon>
            <Typography>Copy</Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ContentPaste fontSize="small" />
            </ListItemIcon>
            <Typography>Paste</Typography>
          </MenuItem>
          <MenuItem onClick ={handleDeleteColumn}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <Typography>Delete</Typography>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <Cloud fontSize="small" />
            </ListItemIcon>
            <Typography>Web Clipboard</Typography>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  )
}

export default HeaderColumn