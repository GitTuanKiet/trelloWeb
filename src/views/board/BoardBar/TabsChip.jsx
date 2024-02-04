import PropTypes from 'prop-types'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

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
import { gridSpacing } from '~/utils/constants'
import { destroyBoardApi } from '~/apis/authApi'

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

const TabsChip = ({ listBoard, isLoading, handleAddBoard }) => {
  const theme = useTheme()
  const [openDialog, setOpenDialog] = useState(false)
  const showDialog = () => setOpenDialog(!openDialog)
  const Navigate = useNavigate()
  const { boardId } = useParams()
  const [selected, setSelected] = useState(boardId)

  const confirm = useConfirm()

  const handleDelete = ({ id, title }) => {
    confirm({
      title: 'Are you sure delete ' + title + '?',
      description: 'This will delete all in ' + title,
      confirmationText: 'Delete',
      cancellationText: 'Cancel',
      dialogProps: { maxWidth: 'sm' },
      confirmationButtonProps: { variant: 'contained', color: 'error' },
      cancellationButtonProps: { variant: 'outlined' }
    })
      .then(async () => {
        const result = await destroyBoardApi(id)
        if (result.resultDelete) toast.success(result.resultDelete)
        else toast.error(result)
      })
      .catch((error) => {
        toast.error(error)
      })

  }

  const handleChange = ({ id, title }) => {
    if (selected === id) return
    toast.success(`You changed to ${title}`)
    setSelected(id)
    return Navigate(`/board/${id}`)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const dataJson = Object.fromEntries(formData.entries())
    handleAddBoard(dataJson)
    showDialog()
  }

  return (
    <>
      <Stack direction="row" spacing={gridSpacing}>
        {isLoading ? (<SkeletonChip />) : (
          listBoard && listBoard.map((board, index) => {
            const { _id, title, description } = board
            return (
              <ChipWrapper
                key={index}
                title={title}
                tooltip={description}
                handleDelete={() => handleDelete({ id : _id, title : title })}
                handleClick={() => handleChange({ id : _id, title : title })}
                sx={{
                  backgroundColor: theme.palette.primary.dark,
                  color: '#fff',
                  '& .MuiChip-icon': {
                    color: '#fff'
                  }
                }}
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

TabsChip.propTypes = {
  isLoading: PropTypes.bool
}

export default TabsChip