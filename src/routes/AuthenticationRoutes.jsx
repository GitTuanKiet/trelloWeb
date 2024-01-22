import { lazy } from 'react'

// project imports
import Loadable from '~/ui-component/Loadable'
import MinimalLayout from '~/layout/MinimalLayout'
import MainLayout from '~/layout/MainLayout'

// auth option 3 routing
const Home = Loadable(lazy(() => import('~/views/home/Home')))
const ForgotPassword = Loadable(lazy(() => import('~/views/pages/Auth/ForgotPassword')))
const SignIn = Loadable(lazy(() => import('~/views/pages/Auth/SignIn')))
const SignUp = Loadable(lazy(() => import('~/views/pages/Auth/SignUp')))
const Terms = Loadable(lazy(() => import('~/views/pages/Auth/Terms')))
const Privacy = Loadable(lazy(() => import('~/views/pages/Auth/Privacy')))

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/home',
      element: <Home />
    },
    {
      path: '/sign-in',
      element: <SignIn />
    },
    {
      path: '/sign-up',
      element: <SignUp />
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />
    },
    {
      path: '/terms',
      element: <Terms />
    },
    {
      path: '/privacy',
      element: <Privacy />
    }
  ]
}

export default AuthenticationRoutes
