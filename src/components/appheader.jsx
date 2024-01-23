import TrelloIcon from '~/assets/icons/trello.svg?react'
import { useState } from 'react'
import { Box, IconButton, Menu, MenuItem, Typography, SvgIcon, Badge } from '@mui/material'
import { Apps as AppsIcon, Mail as MailIcon, Notifications as NotificationsIcon } from '@mui/icons-material'
import ListBoard from './Menus/ListBoard'
import Profiles from './Menus/profile'
import Mode from './Menus/mode'
import Search from './Menus/search'

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
          height: 28
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