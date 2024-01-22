import AppBar from '~/modules/components/AppBar'
import Toolbar from '~/modules/components/Toolbar'
import SvgIcon from '~/modules/components/SvgIcon'
import IconButton from '~/modules/components/IconButton'
import TrelloIcon from '~/assets/icons/trello.svg?react'
import { Box, Link } from '@mui/material'
import { Apps as AppsIcon } from '@mui/icons-material'

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3
}

function AuthenticatedAppBar() {
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
            <IconButton
              size="large"
              edge="start"
              color="red"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              aria-label="open drawer"
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              <AppsIcon />
            </IconButton>
            <SvgIcon component={TrelloIcon} inheritViewBox />
            <Link
              variant="h6"
              underline="none"
              color="inherit"
              href="/"
              sx={{ fontSize: 32, fontFamily: 'monospace' }}
            >
              {'trellok'}
            </Link>
          </Box>
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/board/"
            sx={{ fontSize: 32 }}
          >
            {'board'}
          </Link>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="/sign-out/"
              sx={rightLink}
            >
              {'Sign Out'}
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  )
}

export default AuthenticatedAppBar