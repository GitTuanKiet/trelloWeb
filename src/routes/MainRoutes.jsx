import { lazy } from 'react'

// project imports
import MainLayout from '~/layout/MainLayout'
import Loadable from '~/ui-component/Loadable'

// board routing
const Board = Loadable(lazy(() => import('~/views/board')))

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('~/views/utilities/Typography')))
const UtilsColor = Loadable(lazy(() => import('~/views/utilities/Color')))
const UtilsShadow = Loadable(lazy(() => import('~/views/utilities/Shadow')))
const UtilsMaterialIcons = Loadable(lazy(() => import('~/views/utilities/MaterialIcons')))
const UtilsTablerIcons = Loadable(lazy(() => import('~/views/utilities/TablerIcons')))

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '',
  element: <MainLayout />,
  children: [
    {
      path: '',
      element: <Board />
    },
    {
      path: 'board',
      element: <Board />
    },
    {
      path: 'board/:id',
      element: <Board />
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          element: <UtilsColor />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />
        }
      ]
    }
  ]
}

export default MainRoutes
