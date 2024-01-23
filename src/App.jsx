import { useSelector } from 'react-redux'

import { Experimental_CssVarsProvider as CssVarsprovider } from '@mui/material/styles'
import { CssBaseline, StyledEngineProvider } from '@mui/material'

// routing
import Routes from '~/routes'

// defaultTheme
import themes from '~/themes'

// project imports
import NavigationScroll from '~/layout/NavigationScroll'

// third-party
import { ConfirmProvider } from 'material-ui-confirm'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization)

  return (
    <StyledEngineProvider injectFirst>
      <CssVarsprovider theme={themes(customization)}>
        <ConfirmProvider>
          <CssBaseline />
          <NavigationScroll>
            <Routes />
          </NavigationScroll>
          <ToastContainer
            position="bottom-right"
          />
        </ConfirmProvider>
      </CssVarsprovider>
    </StyledEngineProvider>
  )
}

export default App