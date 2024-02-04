// assets
import { IconDashboard } from '@tabler/icons-react'

// constant
const icons = { IconDashboard }

// ==============================|| BOARD MENU ITEMS ||============================== //

const board = {
  id: 'board',
  title: 'Board',
  type: 'group',
  children: [
    {
      id: 'board',
      title: 'Board',
      type: 'item',
      url: '/board',
      icon: icons.IconDashboard,
      breadcrumbs: false
    }
  ]
}

export default board
