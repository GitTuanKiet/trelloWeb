import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import WorkSpaces from './workspaces'

const ListBoard = ({ boards }) => {

  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      {boards.map((board, index) => (<WorkSpaces key={index} board={board} />))}
      <Button startIcon={<LibraryAddIcon />} variant="contained" sx={{ ml:1, minWidth:'100px' }}>Create</Button>
    </Box>
  )
}

export default ListBoard