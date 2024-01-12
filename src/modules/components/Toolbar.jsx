import { styled } from '@mui/material/styles'
import { Toolbar as MuiToolbar } from '@mui/material'

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  height: 64,
  [theme.breakpoints.up('sm')]: {
    height: 70
  }
}))

export default Toolbar
