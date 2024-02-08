import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

// material-ui
import { styled, useTheme } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import AddBoxIcon from '@mui/icons-material/AddBox'
import Chip from '@mui/material/Chip'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

// third-party
import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'

// project imports
import MainChip from '~/ui-component/chips/MainChip'
import SkeletonChip from '~/ui-component/chips/Skeleton/TabChip'
import { fetchListBoard, addBoard, destroyBoard } from '~/redux/Auth/thunk'

// assets

// ===========================|| BOARD BAR - TABS CHIP ||=========================== //

const ChipWrapper = styled(MainChip)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70
    }
  }
}))

const TabsChip = () => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const confirm = useConfirm()
  const Navigate = useNavigate()

  const [openDialog, setOpenDialog] = useState(false)
  const showDialog = () => setOpenDialog(!openDialog)
  const { boardId } = useParams()
  const [selected, setSelected] = useState(boardId)

  const { listBoard, loading } = useSelector((state) => state.auth)

  const [list, setList] = useState(listBoard)

  const handleDelete = async ({ board, title }) => {
    try {
      await confirm({
        title: 'Are you sure to delete ' + title + '?',
        description: 'This will delete all cards in ' + title,
        confirmationText: 'Delete',
        cancellationText: 'Cancel',
        dialogProps: { maxWidth: 'sm' },
        confirmationButtonProps: { variant: 'contained', color: 'error' },
        cancellationButtonProps: { variant: 'outlined' }
      }).then(() => {
        dispatch(destroyBoard(board)).then((result) => {
          if (result.payload) {
            toast.error(result.payload)
            return
          }
          toast.success('Delete ' + title + ' success')
        }).catch((error) => {
          toast.error('Delete ' + title + ' failed: ' + error)
        })

      }).catch(() => {
        toast.info('You canceled delete ' + title)
      })

    } catch (error) {
      toast.error('An error occurred: ' + error.message)
    }
  }

  const handleChange = ({ id, title }) => {
    if (selected === id) return
    else {
      toast.success(`You changed to ${title}`)
      setSelected(id)
    }
    return Navigate(`/board/${id}`)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const title = data.get('title')
    const description = data.get('description')

    if (!title) {
      toast.error('Please enter board title')
      return
    }

    if (!description) {
      toast.error('Please enter board description')
      return
    }


    dispatch(addBoard({ title, description })).then((result) => {
      if (result.payload) {
        toast.error(result.payload)
        return
      }
      toast.success('Add board ' + title + ' success')
    }).catch((error) => {
      toast.error('Add board ' + title + ' failed: ' + error)
    })

    showDialog()
  }

  useEffect(() => {
    dispatch(fetchListBoard())
  }, [dispatch])

  useEffect(() => {
    setList(listBoard)
  }, [listBoard])

  return (
    <>
      <Stack direction="row">
        {loading ? (<SkeletonChip />) : (
          list.length > 0 && list.map((board) => {
            const isSelect = selected === board._id
            return (
              <ChipWrapper
                key={board._id}
                title={board.title}
                tooltip={board.description}
                handleDelete={() => handleDelete({ board, title : board.title })}
                handleClick={() => handleChange({ id : board._id, title : board.title })}
                sx={{
                  backgroundColor: theme.palette.primary.dark,
                  color: '#fff',
                  '& .MuiChip-icon': {
                    color: '#fff'
                  }
                }}
                disabled={isSelect}
                {...(isSelect && { sx: { backgroundColor: theme.palette.secondary.dark } })}
              />)
          })
        )}
        <Chip
          label="Add"
          onClick={showDialog}
          sx={{
            backgroundColor: theme.palette.secondary.dark,
            color: '#fff',
            '& .MuiChip-icon': {
              color: '#fff'
            }
          }}
          icon={<AddBoxIcon />}
        />
        <Dialog
          data-no-dnd
          open={openDialog}
          onClose={showDialog}
          PaperProps={{
            component: 'form',
            onSubmit: handleSubmit
          }}
        >
          <DialogTitle>Add New Board</DialogTitle>
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
          </DialogContent>
          <DialogActions>
            <Button onClick={showDialog}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </>
  )
}

export default TabsChip