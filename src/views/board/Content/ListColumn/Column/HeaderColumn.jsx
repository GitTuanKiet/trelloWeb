import {
  Box, ListItemIcon, Typography, Menu, MenuItem, MenuList, useTheme, Tooltip,
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button
} from '@mui/material'
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  ArrowDropDown
} from '@mui/icons-material'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'
import { useDispatch } from 'react-redux'
import { destroyColumn, updateColumn } from '~/redux/board/boardThunk'

const HeaderColumn = ({ column }) => {

  const dispatch = useDispatch()
  const theme = useTheme()
  const isRadius = theme?.customization?.borderRadius > 16

  const [openDialog, setOpenDialog] = useState(false)
  const showDialog = () => setOpenDialog(!openDialog)

  const [anchorEl, setAnchorEl] = useState(null)

  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const [title, setTitle] = useState(column?.title)
  const [description, setDescription] = useState(column?.description)

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'title') setTitle(value)
    if (name === 'description') setDescription(value)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const confirm = useConfirm()

  const handleDeleteColumn = async () => {
    try {
      await confirm({
        title: 'Are you sure to delete ' + column?.title + '?',
        description: 'This will delete all cards in ' + column?.title,
        confirmationText: 'Delete',
        cancellationText: 'Cancel',
        dialogProps: { maxWidth: 'sm' },
        confirmationButtonProps: { variant: 'contained', color: 'error' },
        cancellationButtonProps: { variant: 'outlined' }
      }).then(() => {
        dispatch(destroyColumn(column?._id)).then((result) => {
          if (result.payload) {
            toast.error(result.payload)
            return
          }
          toast.success('Delete ' + column?.title + ' success')
        }).catch((error) => {
          toast.error('Delete ' + column?.title + ' failed: ' + error)
        })

      }).catch(() => {
        toast.info('You canceled delete ' + column?.title)
      })

    } catch (error) {
      toast.error(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = {
      title: formData.get('title'),
      description: formData.get('description')
    }

    if (data.title === '') return toast.error('Please enter column title')

    try {
      dispatch(updateColumn({ _id: column?._id, ...data })).then((result) => {
        if (result.payload) {
          toast.error(result.payload)
          return
        }
        toast.success('Update column' + data.title + ' success')
      }).catch((error) => {
        toast.error('Update column failed' + error)
      })

      showDialog()
    }
    catch (error) {
      toast.error(error)
    }
  }

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: (!isRadius) ? 'space-between' : 'center',
      borderBottom: '1px solid rgba(0,0,0,0.12)',
      px: 2,
      alignItems: 'center',
      maxHeight:(theme) => theme.trello.columns.heightheader,
      minHeight:(theme) => theme.trello.columns.heightheader
    }}>
      <Tooltip title={column?.description} placement="top">
        <Typography variant='h5' sx={{ fontSize: '1.4rem', fontWeight: 'bold' }}>{column?.title}</Typography>
      </Tooltip>
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
          <MenuItem onClick={showDialog}>
            <ListItemIcon>
              <EditIcon fontSize="small" color="info" />
            </ListItemIcon>
            <Typography>Edit</Typography>
          </MenuItem>
          <Dialog
            data-no-dnd
            open={openDialog}
            onClose={showDialog}
            PaperProps={{
              component: 'form',
              onSubmit: handleSubmit
            }}
          >
            <DialogTitle>Edit Column</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                required
                margin="dense"
                id="title"
                name="title"
                label="Title"
                type="text"
                value={title}
                fullWidth
                variant="outlined"
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                id="description"
                name="description"
                label="Description"
                type="text"
                value={description}
                rows={4}
                multiline
                fullWidth
                variant="outlined"
                onChange={handleChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={showDialog}>Cancel</Button>
              <Button type="submit">Edit</Button>
            </DialogActions>
          </Dialog>
          <MenuItem onClick={handleDeleteColumn}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" color="warning" />
            </ListItemIcon>
            <Typography>Delete</Typography>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  )
}

export default HeaderColumn