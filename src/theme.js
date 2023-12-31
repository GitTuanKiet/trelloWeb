import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { amber, deepOrange, grey } from '@mui/material/colors'


const theme = extendTheme({
  trello: {
    headerHeight: '64px',
    boardHeaderHeight: '64px',
    boardContentHeight: 'calc(100vh - 128px)',
    columns: {
      width: '333px',
      height: 'calc(100vh - 128px - 24px)',
      heightheader: '64px',
      heightfooter: '56px',
      heightcontent: 'calc(100vh - 128px - 24px - 134px)'
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
            'WebkitBoxShadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
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
          fontWeight:'bold',
          border:'none',
          '&:hover': {
            border:'none',
            backgroundColor: 'transparent'
          }
        }
      }
    }
  },
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
        primary: deepOrange,
        divider: deepOrange[700],
        background: {
          default: deepOrange[900],
          paper: deepOrange[800]
        },
        text: {
          primary: grey[400],
          secondary: grey[500]
        },
        action: {
          active: deepOrange[800],
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
