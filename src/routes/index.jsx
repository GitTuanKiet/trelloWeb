import { useRoutes } from 'react-router-dom'

// routes
import AuthRoutes from './AuthRoutes'
import BoardRoutes from './BoardRoutes'
import MainRoutes from './MainRoutes'

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([MainRoutes, AuthRoutes, BoardRoutes])
}
