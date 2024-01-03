import Box from '@mui/material/Box'
import AppsIcon from '@mui/icons-material/Apps'
import TrelloIcon from '~/assets/icons/trello.svg?react'
import SvgIcon from '@mui/material/SvgIcon'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Search from './Menus/search'
import Mode from './Menus/mode'
import Profiles from './Menus/profile'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import ListBoard from './Menus/listBoard'

export const AppHeader = () => {
  const pages = ['Home', 'Boards', 'Templates', 'Workspace', 'Apps', 'Settings']
  const [anchorElNav, setAnchorElNav] = useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }
  return (
    <Box sx={{
      height: (theme) => theme.trello.headerHeight,
      borderBottom: '2px solid rgba(0,0,0,0.12)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      overflowX: 'auto',
      paddingX: 2
    }}>
      <Box sx={{ display: 'flex', alignItems:'center', gap:1 }}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          aria-label="open drawer"
          onClick={handleOpenNavMenu}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <AppsIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: 'block', md: 'none' }
          }}
        >
          {pages.map((page) => (
            <MenuItem key={page} onClick={handleCloseNavMenu}>
              <Typography textAlign="center">{page}</Typography>
            </MenuItem>
          ))}
        </Menu>
        <SvgIcon component={TrelloIcon} inheritViewBox sx={{
          width: 28,
          height: 28,
          '& .bg':{
            fill:(theme) => theme.palette.divider
          }
          // '& .dai':{
          //   fill: (theme) => theme.palette.background.paper
          // },
          // '& .ngan':{
          //   fill: (theme) => theme.palette.background.default
          // }
        }}
        />
        <Typography
          variant="h5"
          sx={{
            fontSize: '1.5rem',
            display:  'inline-block',
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.1rem',
            color: 'inherit',
            textDecoration: 'none'
          }}
        >
        Trello
        </Typography>
        <ListBoard boards={pages}/>
      </Box>
      <Box sx={{ display: 'flex', alignItems:'center', gap:1 }}>
        <Search />
        <IconButton size="small" color="inherit">
          <Badge color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <IconButton size="small" color="inherit">
          <Badge color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Profiles />
        <Mode />
      </Box>
    </Box>
  )
}