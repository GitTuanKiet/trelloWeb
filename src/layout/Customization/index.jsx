import { useState } from 'react'
import { useDispatch } from 'react-redux'

// types
import PropTypes from 'prop-types'

// material-ui
import { useTheme } from '@mui/material/styles'
import {
  Drawer,
  Fab,
  IconButton,
  Tooltip,
  Tabs,
  Tab,
  Typography,
  Button,
  Box
} from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import {
  IconSettings,
  IconTextSize,
  IconColorSwatch
} from '@tabler/icons-react'

// project imports
import SubCard from '~/ui-component/cards/SubCard'
import AnimateButton from '~/ui-component/extended/AnimateButton'
import FontTab from './FontTab'
import ThemeTab from './themeTab'
import { RESET_CUSTOMIZATION } from '~/redux/customization/customizationSlice'

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar'

// tab panel
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <>
          {children}
        </>
      )}
    </div>
  )
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}


// ==============================|| LIVE CUSTOMIZATION ||============================== //

const Customization = () => {
  const theme = useTheme()
  const dispatch = useDispatch()

  // drawer on/off
  const [open, setOpen] = useState(false)
  const handleToggle = () => {
    setOpen(!open)
  }

  // tabs value
  const [value, setValue] = useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      {/* toggle button */}
      <Tooltip title="Live Customize">
        <Fab
          component="div"
          onClick={handleToggle}
          size="medium"
          variant="circular"
          color="secondary"
          sx={{
            borderRadius: 0,
            borderTopLeftRadius: '50%',
            borderBottomLeftRadius: '50%',
            borderTopRightRadius: '50%',
            borderBottomRightRadius: '4px',
            top: '25%',
            position: 'fixed',
            right: 10,
            zIndex: theme.zIndex.speedDial
          }}
        >
          <AnimateButton type="rotate">
            <IconButton color="inherit" size="large" disableRipple>
              <IconSettings />
            </IconButton>
          </AnimateButton>
        </Fab>
      </Tooltip>

      <Drawer
        anchor="right"
        onClose={handleToggle}
        open={open}
        PaperProps={{
          sx: {
            width: theme.trello.columns.width
          }
        }}
      >
        <PerfectScrollbar component="div">
          <SubCard
            title="Customize"
            direction="row"
            directionContent="row"
          >
            <Button variant="contained" onClick={() => dispatch(RESET_CUSTOMIZATION())}>
              <Typography variant="subtitle1"> Reset </Typography>
            </Button>
            <ClearIcon onClick={handleToggle} sx={{ cursor: 'pointer' }} />
          </SubCard>
          <Box xs={12}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              aria-label="customization tabs"
            >
              <Tab
                icon={<IconColorSwatch />}
                {...a11yProps(0)}
              />
              <Tab
                icon={<IconTextSize />}
                {...a11yProps(1)}
              />
            </Tabs>
            <CustomTabPanel value={value} index={0}>
              <ThemeTab />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <FontTab />
            </CustomTabPanel>
          </Box>
        </PerfectScrollbar>
      </Drawer>
    </>
  )
}

export default Customization
