import {
  Box, Button, Typography,
  Dialog, DialogActions, DialogContent, DialogTitle, TextField
} from '@mui/material'
import {
  AddBox as AddBoxIcon,
  DragHandle as DragHandleIcon
} from '@mui/icons-material'
import { useState } from 'react'
import { toast } from 'react-toastify'
import FileUploader from '~/components/imageUpload'
import { useSelector, useDispatch } from 'react-redux'
import { newCard } from '~/redux/board/boardThunk'


const FooterColumn = ({ column }) => {
  const dispatch = useDispatch()
  const board = useSelector((state) => state.board)
  const { loading, error } = useSelector((state) => state.board)

  const [images, setImages] = useState([])
  const [openDialog, setOpenDialog] = useState(false)

  const showDialog = () => setOpenDialog(!openDialog)

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      cover: images
    }
    try {
      if (loading) {
        toast.error('Please wait, loading...')
        return
      } else if (error) {
        toast.error(error)
        return
      } else {
        dispatch(newCard({ columnId:column?._id, ...data }))
        toast.success('Add new card success')
        showDialog()
      }
    } catch (error) {
      toast.error(error)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        bgcolor: (theme) => theme.palette.secondary.main,
        justifyContent: 'space-between',
        borderTop: '1px solid rgba(0,0,0,0.12)',
        borderRadius: (theme) => (theme?.customization?.borderRadius),
        padding: 1,
        alignItems: 'center',
        maxHeight:(theme) => theme.trello.columns.heightfooter,
        minHeight:(theme) => theme.trello.columns.heightfooter
      }}
    >
      <Button
        variant="contained"
        onClick={showDialog}
        startIcon={ <AddBoxIcon sx={{ cursor:'pointer', color:'text.primary' }}
        /> } >
        <Typography sx={{ color:'text.primary' }}>Add New Card</Typography>
      </Button>
      <Button variant="contained" endIcon={<DragHandleIcon sx={{ cursor:'pointer', color:'text.primary' }} />} ></Button>
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
          <Button onClick={showDialog}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
export default FooterColumn
