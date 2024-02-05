import { Button, InputBase } from '@mui/material'
import { AddBox as AddBoxIcon } from '@mui/icons-material'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { newColumn } from '~/redux/board/boardThunk'

const AddColumnBtn = () => {
  const dispatch = useDispatch()
  const [showAddColumnForm, setShowAddColumnForm] = useState(false)
  const settingShow = () => setShowAddColumnForm(!showAddColumnForm)

  const handleAddColumn = async (e) => {
    if (e.target.value === '') return toast.error('Please enter column title')

    try {


      dispatch(newColumn({ title: e.target.value })).then((result) => {
        if (result.payload) {
          toast.error(result.payload)
          return
        }
        toast.success('Add column' + e.target.value + ' success')
      }).catch((error) => {
        toast.error('Add column failed' + error)
      })

      settingShow()
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