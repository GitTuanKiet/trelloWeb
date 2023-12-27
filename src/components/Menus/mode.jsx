import Button from '@mui/material/Button'
import { useColorScheme } from '@mui/material/styles'
import WbSunny from '@mui/icons-material/WbSunny'
import Brightness2 from '@mui/icons-material/Brightness2'

const Mode = () => {
  const { mode, setMode } = useColorScheme()
  return (
    <Button
      tabIndex={0}
      type='button'
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light')
      }}
      sx={{
        borderRadius:'50%',
        width: 32,
        height: 32,
        minWidth: 32,
        minHeight: 32,
        backgroundColor: (theme) => theme.palette.primary.main,
        color: (theme) => theme.palette.primary.contrastText,
        '&:hover': {
          backgroundColor: (theme) => theme.palette.primary.dark
        },
        '&:focus': {
          backgroundColor: (theme) => theme.palette.primary.dark
        },
        '&:active': {
          backgroundColor: (theme) => theme.palette.primary.dark
        }
      }}
    >
      {mode === 'light' ? <Brightness2 /> : <WbSunny />}
    </Button>
  )
}

export default Mode