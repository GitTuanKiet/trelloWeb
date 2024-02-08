import PropTypes from 'prop-types'

// material-ui
import { useTheme } from '@mui/material/styles'
import { Avatar, Box, ButtonBase, Typography } from '@mui/material'

// project imports
import LogoSection from '../LogoSection'
import SearchSection from './SearchSection'
import ProfileSection from './ProfileSection'
import NotificationSection from './NotificationSection'
import Mode from '~/components/Mode'

// assets
import { IconMenu2 } from '@tabler/icons-react'

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme()

  const user = JSON.parse(localStorage.getItem('user'))


  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto'
          }
        }}
      >
        <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
          <LogoSection />
        </Box>
        <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: 'all .2s ease-in-out',
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.dark,
              '&:hover': {
                background: theme.palette.secondary.dark,
                color: theme.palette.secondary.light
              }
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <IconMenu2 stroke={1.5} size="1.3rem" />
          </Avatar>
        </ButtonBase>
      </Box>

      {/* header search */}
      <SearchSection />
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      {/* notification & profile */}
      <Mode />

      {user ?
        <>
          <NotificationSection />
          <ProfileSection user={user} />
        </>
        : <>
          <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden', p: 2 }} onClick={() => window.location.href = '/pages/login/login3'}>
            <Typography variant="h4" sx={{ color: theme.palette.primary.dark, fontWeight: 600, display: { xs: 'none', md: 'block' } }}>
              Sign In
            </Typography>
          </ButtonBase>
          <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden', p: 2 }} onClick={() => window.location.href = '/pages/register/register3'}>
            <Typography variant="h4" sx={{ color: theme.palette.primary.dark, fontWeight: 600, display: { xs: 'none', md: 'block' } }}>
              Sign Up
            </Typography>
          </ButtonBase>
        </>
      }
    </>
  )
}

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func
}

export default Header
