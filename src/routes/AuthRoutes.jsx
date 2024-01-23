import { lazy } from 'react'

// project imports
import Loadable from '~/ui-component/Loadable'
import MinimalLayout from '~/layout/MinimalLayout'

// auth option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('~/views/pages/Auth/authentication3/Login3')))
const AuthRegister3 = Loadable(lazy(() => import('~/views/pages/Auth/authentication3/Register3')))
const AuthForgotPassword3 = Loadable(lazy(() => import('~/views/pages/Auth/authentication3/ForgotPassword3')))

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/pages/login/login3',
      element: <AuthLogin3 />
    },
    {
      path: '/pages/register/register3',
      element: <AuthRegister3 />
    },
    {
      path: '/pages/forgot-password/forgot-password3',
      element: <AuthForgotPassword3 />
    }
  ]
}

export default AuthRoutes
