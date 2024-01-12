import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsprovider } from '@mui/material/styles'
import theme from './theme'
import App from './App.jsx'
import { ConfirmProvider } from 'material-ui-confirm'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <CssVarsprovider theme={theme}>
    <ConfirmProvider>
      <CssBaseline />
      <App />
      <ToastContainer
        position="bottom-right"
      />
    </ConfirmProvider>
  </CssVarsprovider>
)
