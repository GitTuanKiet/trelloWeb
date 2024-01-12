import { AppBar as MuiAppBar } from '@mui/material'

function AppBar(props) {
  return <MuiAppBar elevation={0} position="fixed" {...props} />
}

export default AppBar
