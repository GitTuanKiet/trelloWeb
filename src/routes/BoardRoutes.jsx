import { lazy } from 'react'

// project imports
import Loadable from '~/ui-component/Loadable'
import MinimalLayout from '~/layout/MinimalLayout'

// board routing
const Board = Loadable(lazy(() => import('~/views/pages/Board/_id')))

// ==============================|| BOARD ROUTING ||============================== //

const BoardRoutes = {
  path: '/board',
  element: <MinimalLayout />,
  children: [
    {
      path: '/board',
      element: <Board />
    }
  ]
}

export default BoardRoutes
