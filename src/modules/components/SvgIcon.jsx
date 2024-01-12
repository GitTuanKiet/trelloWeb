import { experimentalStyled as styled } from '@mui/material/styles'
import { SvgIcon as MuiSvgIcon } from '@mui/material'

const SvgIconRoot = styled(MuiSvgIcon)(({ theme, inheritViewBox }) => ({
  width: 32,
  height: 32,
  '& .bg': {
    fill: theme.palette.divider
  },
  ...(inheritViewBox && {
    '& svg': {
      width: '100%',
      height: '100%'
    }
  })
}))

function SvgIcon(props) {
  return <SvgIconRoot {...props} />
}

export default SvgIcon