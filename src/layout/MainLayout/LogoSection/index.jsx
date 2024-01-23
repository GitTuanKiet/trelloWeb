import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// material-ui
import { ButtonBase } from '@mui/material'

// project imports
import config from '~/config'
import Logo from '~/ui-component/Logo'
import { MENU_OPEN } from '~/redux/customization/customizationSlice'

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const defaultId = useSelector((state) => state.customization.defaultId)
  const dispatch = useDispatch()
  return (
    <ButtonBase disableRipple onClick={() => dispatch(MENU_OPEN( defaultId ))} component={Link} to={config.defaultPath}>
      <Logo />
    </ButtonBase>
  )
}

export default LogoSection
