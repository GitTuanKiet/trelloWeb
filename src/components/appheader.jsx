import Box from '@mui/material/Box'
import AppsIcon from '@mui/icons-material/Apps'
import TrelloIcon from '../assets/icons/trello.svg?react'
import SvgIcon from '@mui/material/SvgIcon'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Search from './Menus/Search'
import WorkSpaces from './Menus/WorkSpaces'
import Mode from './Menus/Mode'
import Profiles from './Menus/Profile'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'

export const AppHeader = () => {
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
          aria-label="open drawer"
        >
          <AppsIcon />
        </IconButton>
        <SvgIcon component={TrelloIcon} inheritViewBox sx={{ width: 28, height: 28 }} />
        <Typography sx={{ fontSize:'1.4rem', fontWeight:'bold' }}>
        Trello
        </Typography>
        <WorkSpaces />
        <Button startIcon={<LibraryAddIcon />} variant="contained" sx={{ minWidth:'100px' }}>Create</Button>
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