import Box from '@mui/material/Box'
import AppsIcon from '@mui/icons-material/Apps'
import TrelloIcon from '@/assets/icons/trello.svg?react'
import SvgIcon from '@mui/material/SvgIcon'
import IconButton from '@mui/material/IconButton'
import AppBar from '@mui/material/AppBar'
import Badge from '@mui/material/Badge'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Search from './Menus/search'
import WorkSpaces from './Menus/workspaces'
import Mode from './Menus/mode'
import Profiles from './Menus/profile'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'

export const AppHeader = () => {
  return (
    <AppBar position='static'>
      <Box sx={{
        height: '64px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflowX: 'auto',
        paddingX: 3
      }}>
        <Box sx={{ display: 'flex', alignItems:'center' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ gap: 1 }}
          >
            <AppsIcon />
          </IconButton>
          <SvgIcon component={TrelloIcon} inheritViewBox sx={{ mr:0.5 }} />
          <Typography sx={{ fontSize:'1.5rem' }}>
        Trello
          </Typography>
          <WorkSpaces />
          <Button startIcon={<LibraryAddIcon />} variant="contained" sx={{ ml:2 }}>Create</Button>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems:'center', gap:1 }}>
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
    </AppBar>
  )
}