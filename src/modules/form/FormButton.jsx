import PropTypes from 'prop-types'

import Button from '../components/Button'
import defer from './defer'

function FormButton(props) {
  const { disabled, mounted, ...others } = props
  return (
    <Button
      disabled={!mounted || !!disabled}
      type="submit"
      variant="contained"
      {...others}
    />
  )
}

FormButton.propTypes = {
  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,
  mounted: PropTypes.bool
}

const FormButtonWithRef = defer(FormButton)

export default FormButtonWithRef
