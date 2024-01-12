import * as React from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import { IconButton, Slide, Snackbar as MuiSnackbar } from '@mui/material'
import { snackbarContentClasses } from '@mui/material/SnackbarContent'
import { Info as InfoIcon, Close as CloseIcon } from '@mui/icons-material'

const styles = ({ theme }) => ({
  [`& .${snackbarContentClasses.root}`]: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.text.primary,
    flexWrap: 'inherit',
    [theme.breakpoints.up('md')]: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 4,
      borderBottomLeftRadius: 4
    }
  },
  [`& .${snackbarContentClasses.message}`]: {
    fontSize: 16,
    display: 'flex',
    alignItems: 'center'
  },
  [`& .${snackbarContentClasses.action}`]: {
    paddingLeft: theme.spacing(2)
  },
  '& .MuiSnackbarContent-info': {
    flexShrink: 0,
    marginRight: theme.spacing(2)
  },
  '& .MuiSnackbarContent-close': {
    padding: theme.spacing(1)
  }
})

function Transition(props) {
  return <Slide {...props} direction="down" />
}

function Snackbar(props) {
  const { message, closeFunc, ...other } = props
  const classes = {
    info: 'MuiSnackbarContent-info',
    close: 'MuiSnackbarContent-close'
  }

  return (
    <MuiSnackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={6000}
      TransitionComponent={Transition}
      message={
        <React.Fragment>
          <InfoIcon className={classes.info} />
          <span>{message}</span>
        </React.Fragment>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          className={classes.close}
          onClick={() => closeFunc && closeFunc()}
        >
          <CloseIcon />
        </IconButton>
      ]}
      {...other}
    />
  )
}

Snackbar.propTypes = {
  closeFunc: PropTypes.func,
  /**
   * The message to display.
   */
  message: PropTypes.node
}

const StyledSnackbar = styled(Snackbar)(styles)

export default StyledSnackbar
