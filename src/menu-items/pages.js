// assets
import { IconKey } from '@tabler/icons-react'

// constant
const icons = {
  IconKey
}

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'Pages',
  caption: 'Pages Caption',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Authentication',
      type: 'collapse',
      icon: icons.IconKey,

      children: [
        {
          id: 'login3',
          title: 'Login',
          type: 'item',
          url: '/pages/login/login3',
          target: false
        },
        {
          id: 'register3',
          title: 'Register',
          type: 'item',
          url: '/pages/register/register3',
          target: false
        },
        {
          id: 'forgot-password3',
          title: 'Forgot Password',
          type: 'item',
          url: '/pages/forgot-password/forgot-password3',
          target: false
        },
        {
          id: 'update-profile3',
          title: 'Update Profile',
          type: 'item',
          url: '/pages/update-profile/update-profile3',
          target: false
        },
        {
          id: 'update-password3',
          title: 'Update Password',
          type: 'item',
          url: '/pages/update-password/update-password3',
          target: false
        }
      ]
    }
  ]
}

export default pages
