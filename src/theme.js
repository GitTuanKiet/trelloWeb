import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { amber, deepOrange, grey } from '@mui/material/colors'


const theme = extendTheme({
  trello: {
    headerHeight: '64px',
    boardHeaderHeight: '64px',
    boardContentHeight: 'calc(100vh - 128px)',
    columns: {
      width: '333px',
      height: 'calc(100vh - 128px - 64px)',
      heightheader: '50px',
      heightfooter: '50px',
      heightcontent: 'calc(100vh - 128px - 64px - 100px)'
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '0.4em',
            height: '0.4em'
          },
          '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            outline: '1px solid slategrey',
            borderRadius: '4px'
          },
          '*::webkit-scrollbar-thumb:hover': {
            backgroundColor: 'rgba(0,0,0,.2)'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '1.25rem',
          fontWeight:'100'
        }
      }
    }
  },
  colorSchemes: {
    light: {
      palette: {
        primary: amber,
        divider: amber[200],
        text: {
          primary: grey[900],
          secondary: grey[800]
        },
        background: {
          default: grey[100],
          paper: grey[100]
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
        primary: deepOrange,
        divider: deepOrange[700],
        background: {
          default: deepOrange[900],
          paper: deepOrange[900]
        },
        text: {
          primary: '#fff',
          secondary: grey[500]
        },
        action: {
          active: '#fff',
          hover: deepOrange[900],
          selected: deepOrange[900],
          disabled: deepOrange[900],
          disabledBackground: deepOrange[900]
        }
      }
    }
  }
})

export default theme
