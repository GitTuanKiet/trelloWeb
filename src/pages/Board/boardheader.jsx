import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import AvatarGroup from '@mui/material/AvatarGroup'
import Chip from '@mui/material/Chip'
import FlutterDashIcon from '@mui/icons-material/FlutterDash'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator'
import GamepadIcon from '@mui/icons-material/Gamepad'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import Tooltip from '@mui/material/Tooltip'

export const BoardHeader = () => {
  const styled = {
    fontSize: '1.2rem',
    backgroundColor: 'inherit',
    border: 'none',
    padding: 2,
    borderRadius: 4,
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.12)',
      color: 'white'
    },
    '&:active': {
      backgroundColor: 'rgba(0,0,0,0.16)',
      color: 'white'
    },
    '&:focus': {
      backgroundColor: 'rgba(0,0,0,0.12)',
      color: 'white'
    },
    '&:focus-visible': {
      backgroundColor: 'rgba(0,0,0,0.12)',
      color: 'white'
    },
    '&:disabled': {
      backgroundColor: 'rgba(0,0,0,0.08)',
      color: 'rgba(0,0,0,0.26)'
    },
    '&:disabled:hover': {
      backgroundColor: 'rgba(0,0,0,0.08)',
      color: 'rgba(0,0,0,0.26)'
    },
    '&:disabled:active': {
      backgroundColor: 'rgba(0,0,0,0.08)',
      color: 'rgba(0,0,0,0.26)'
    },
    '&:disabled:focus': {
      backgroundColor: 'rgba(0,0,0,0.08)',
      color: 'rgba(0,0,0,0.26)'
    },
    '&:disabled:focus-visible': {
      backgroundColor: 'rgba(0,0,0,0.08)',
      color: 'rgba(0,0,0,0.26)'
    }
  }
  return (
    <Box sx={{
      height:(theme) => theme.trello.boardHeaderHeight,
      weight:'100%',
      borderBottom: '2px solid rgba(0,0,0,0.12)'
    }}>
      <Toolbar>
        <Box sx={{ flexGrow:1, display: { xs: 'none', md: 'flex' }, gap:2 }}>
          <Chip sx={styled} icon={<FlutterDashIcon />} label="TuanKiet trelloWebsite-project" variant="outlined" clickable/>
          <Chip sx={styled} icon={<RemoveModeratorIcon />} label="Private trello" variant="outlined" clickable/>
          <Chip sx={styled} icon={<GamepadIcon />} label="Game board" variant="outlined" clickable/>
          <Chip sx={styled} icon={<AddToDriveIcon />} label="Add to Google Driver" variant="outlined" clickable/>
          <Chip sx={styled} icon={<FilterAltIcon />} label="Filter" variant="outlined" clickable/>
        </Box>
        <Button startIcon={<GroupAddIcon />} variant="contained" sx={{ marginX:4 }}>Invite</Button>
        <AvatarGroup max={6}>
          <Tooltip>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Tooltip>
          <Tooltip>
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          </Tooltip>
          <Tooltip>
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          </Tooltip>
          <Tooltip>
            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
          </Tooltip>
          <Tooltip>
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
          </Tooltip>
          <Tooltip>
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/6.jpg" />
          </Tooltip>
          <Tooltip>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Tooltip>
          <Tooltip>
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          </Tooltip>
          <Tooltip>
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          </Tooltip>
          <Tooltip>
            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
          </Tooltip>
          <Tooltip>
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
          </Tooltip>
          <Tooltip>
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/6.jpg" />
          </Tooltip>
        </AvatarGroup>
      </Toolbar>
    </Box>
  )
}