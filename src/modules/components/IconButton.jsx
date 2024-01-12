import { experimentalStyled as styled } from '@mui/material/styles'
import { IconButton as MuiIconButton } from '@mui/material'

const IconButtonRoot = styled(MuiIconButton)(({ theme, size }) => ({
  padding: theme.spacing(0.9),
  '&:hover': {
    backgroundColor: 'transparent'
  },
  ...(size === 'small' && {
    padding: theme.spacing(0.3)
  }),
  ...(size === 'large' && {
    padding: theme.spacing(0.6)
  })
}))

function IconButton(props) {
  return <IconButtonRoot {...props} />
}

export default IconButton