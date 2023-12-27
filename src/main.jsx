import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsprovider } from '@mui/material/styles'
import theme from './theme'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssVarsprovider theme={theme}>
      <CssBaseline />
      <App />
    </CssVarsprovider>
  </React.StrictMode>
)
