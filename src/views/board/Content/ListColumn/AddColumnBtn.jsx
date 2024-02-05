import { Button, InputBase } from '@mui/material'
import { AddBox as AddBoxIcon } from '@mui/icons-material'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { newColumn } from '~/redux/board/boardThunk'

const AddColumnBtn = () => {
  const dispatch = useDispatch()
  const board = useSelector((state) => state.board)
  const { loading, error } = useSelector((state) => state.board)
  const [showAddColumnForm, setShowAddColumnForm] = useState(false)
  const settingShow = () => setShowAddColumnForm(!showAddColumnForm)

  const handleAddColumn = (e) => {
    if (e.target.value === '') return toast.error('Please enter column title')
    try {
      if (loading) {
        toast.error('Please wait, loading...')
        return
      } else if (error) {
        toast.error(error)
        return
      } else {
        dispatch(newColumn({ title: e.target.value }))
        toast.success('Add new column success')
        settingShow()
      }
    } catch (error) {
      toast.error(error)
    }
  }

  return (
    <>
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
            borderRadius: (theme) => (theme?.customization?.borderRadius),
            height: 'fit-content',
            bgcolor: (theme) => theme.palette.secondary.main,
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
    </>
  )
}

export default AddColumnBtn