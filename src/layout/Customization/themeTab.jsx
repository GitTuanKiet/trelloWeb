import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// material-ui
import { useTheme } from '@mui/material/styles'
import {
  Button,
  ButtonGroup,
  useColorScheme
} from '@mui/material'
import {
  Brightness3,
  LightMode,
  SettingsBrightness as SettingsBrightnessIcon
} from '@mui/icons-material'

// project imports
import { SET_MODE } from '~/redux/Customization/customizationSlice'
import SubCard from '~/ui-component/cards/SubCard'

// ==============================|| THEME TAB ||============================== //

const ThemeTab = () => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const customization = useSelector((state) => state.customization)

  // state - mode
  const { mode, setMode } = useColorScheme()
  const handleMode = (event, newMode) => {
    setMode(newMode)
  }

  useEffect(() => {
    setMode(customization.mode)
  }, [customization, setMode])

  useEffect(() => {
    dispatch(SET_MODE( mode ))
  }, [dispatch, mode])

  return (
    <SubCard
      title="Theme Mode"
      darkTitle
      direction="row"
    >
      {/* theme mode */}
      <ButtonGroup
        variant="contained"
        color="primary"
        aria-label="split button"
      >
        <Button
          variant={mode === 'light' ? 'contained' : 'outlined'}
          onClick={(e) => handleMode(e, 'light')}
        >
          <LightMode />
        </Button>
        <Button
          variant={mode === 'system' ? 'contained' : 'outlined'}
          onClick={(e) => handleMode(e, 'system')}
        >
          <SettingsBrightnessIcon />
        </Button>
        <Button
          variant={mode === 'dark' ? 'contained' : 'outlined'}
          onClick={(e) => handleMode(e, 'dark')}
        >
          <Brightness3 />
        </Button>
      </ButtonGroup>
    </SubCard>
  )
}

export default ThemeTab