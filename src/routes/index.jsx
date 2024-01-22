import { useRoutes } from 'react-router-dom'

// routes
// import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes'
import BoardRoutes from './BoardRoutes'

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([AuthenticationRoutes, BoardRoutes])
}
