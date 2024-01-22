import {
  Box, Button, Divider, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Typography,
  Dialog, DialogActions, DialogContent, DialogTitle, TextField
} from '@mui/material'
import {
  AddBox as AddBoxIcon,
  Delete as DeleteIcon,
  DragHandle as DragHandleIcon,
  ArrowDropDown, Cloud, ContentCopy, ContentCut, ContentPaste
} from '@mui/icons-material'
import { useEffect, useState } from 'react'
import ListCard from './ListCard'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'
import FileUploader from '~/components/imageUpload'


const Column = ({ column, addNewCard, deleteColumn }) => {
  const [images, setImages] = useState([])
  const [openDialog, setOpenDialog] = useState(false)

  const showDialog = () => setOpenDialog(!openDialog)

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const dataJson = Object.fromEntries(formData.entries())
    if (dataJson.title === '') return toast.error('Please enter card title')
    showDialog()
    if (images.length > 0) {
      dataJson.cover = images[0]
    }
    addNewCard({ ...dataJson, columnId: column._id })
    toast.success('Add new card success')
  }

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
        toast.success(result.resultDelete)
      })
      .catch(() => {
        /* ... */
      })

  }

  const [cards, setCards] = useState([])

  useEffect(() => {
    setCards(column.cards)
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
                'li': {
                  '& .MuiListItemIcon-root': {
                    color: 'text.secondary'
                  }
                }
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
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopy fontSize="small" />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize="small" />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>
              <MenuItem onClick ={handleDeleteColumn}>
                <ListItemIcon>
                  <DeleteIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
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
        </Box>
        {/* cards column */}
        <ListCard key={column?._id} cards={cards} />
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
          <Button
            variant="outlined"
            onClick={showDialog}
            startIcon={ <AddBoxIcon sx={{ cursor:'pointer', color:'text.primary' }}
            /> } >
            <Typography sx={{ color:'text.primary' }}>Add New Card</Typography>
          </Button>
          <Button variant="outlined" endIcon={<DragHandleIcon sx={{ cursor:'pointer', color:'text.primary' }} />} ></Button>
          <Dialog
            data-no-dnd
            open={openDialog}
            onClose={showDialog}
            PaperProps={{
              component: 'form',
              onSubmit: handleSubmit
            }}
          >
            <DialogTitle>Add New Card</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                required
                margin="dense"
                id="title"
                name="title"
                label="Title"
                type="text"
                fullWidth
                variant="outlined"
              />
              <TextField
                margin="dense"
                id="description"
                name="description"
                label="Description"
                type="text"
                rows={4}
                multiline
                fullWidth
                variant="outlined"
              />
              <Typography sx={{ mt: 2 }}>Cover</Typography>
              <FileUploader
                images={images}
                setImages={setImages}
              ></FileUploader>
            </DialogContent>
            <DialogActions>
              <Button onClick={showDialog}>Cancle</Button>
              <Button type="submit">Add</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </div>
  )
}
export default Column
