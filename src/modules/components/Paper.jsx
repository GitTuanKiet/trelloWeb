import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import { Paper as MuiPaper } from '@mui/material'

const PaperRoot = styled(MuiPaper, {
  shouldForwardProp: (prop) => prop !== 'background' && prop !== 'padding'
})(({ theme, background, padding }) => ({
  backgroundColor: theme.palette.secondary[background],
  ...(padding && {
    padding: theme.spacing(1)
  })
}))

function Paper(props) {
  const { background, classes, className, padding = false, ...other } = props

  return (
    <PaperRoot
      square
      elevation={0}
      background={background}
      classes={classes}
      padding={padding}
      className={className}
      {...other}
    />
  )
}

Paper.propTypes = {
  background: PropTypes.oneOf(['dark', 'light', 'main']).isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  className: PropTypes.string,
  padding: PropTypes.bool
}

export default Paper
