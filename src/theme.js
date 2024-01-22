import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { amber, pink, grey } from '@mui/material/colors'


const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: amber,
        divider: amber[300],
        text: {
          primary: grey[900],
          secondary: grey[800]
        },
        background: {
          default: grey[100],
          paper: grey[200]
        },
        action: {
          active: grey[900],
          hover: grey[100],
          selected: grey[100],
          disabled: grey[100],
          disabledBackground: grey[100]
        }
      }
    },
    dark: {
      palette: {
        primary: pink,
        divider: pink[400],
        background: {
          default: pink[900],
          paper: pink[800]
        },
        text: {
          primary: grey[50],
          secondary: grey[100]
        },
        action: {
          active: pink[800],
          hover: pink[900],
          selected: pink[900],
          disabled: pink[900],
          disabledBackground: pink[900]
        }
      }
    }
  }
})

export default theme
