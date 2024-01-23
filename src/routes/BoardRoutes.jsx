import { lazy } from 'react'

// project imports
import Loadable from '~/ui-component/Loadable'
import MainLayout from '~/layout/MainLayout'

// board routing
const Board = Loadable(lazy(() => import('~/views/pages/Board/_id')))

// ==============================|| BOARD ROUTING ||============================== //

const BoardRoutes = {
  path: '/pages/board',
  element: <MainLayout />,
  children: [
    {
      path: '/pages/board',
      element: <Board />
    }
  ]
}

export default BoardRoutes
