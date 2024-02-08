

import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

// material-ui
import {
  List,
  Box,
  Paper,
  AvatarGroup,
  ClickAwayListener,
  Popper,
  useTheme,
  OutlinedInput,
  InputAdornment,
  Divider,
  Typography,
  Stack
} from '@mui/material'

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar'


// project imports
import UserCard from './UserCard'
import MainCard from '~/ui-component/cards/MainCard'
import Transitions from '~/ui-component/extended/Transitions'
import Avatar from '~/ui-component/extended/Avatar'
import { API_HOST } from '~/utils/constants'

// assets
import User1 from '~/assets/images/users/user-round.svg'
import { IconSearch } from '@tabler/icons-react'


const GroupMembers = () => {
  const theme = useTheme()
  const board = useSelector((state) => state.board)
  const { members } = useSelector((state) => state.board)


  const [value, setValue] = useState('')
  const [openMembers, setOpenMembers] = useState(false)
  const anchorRefMembers = useRef(null)

  const handleToggle = () => {
    setOpenMembers((prevOpen) => !prevOpen)
  }

  const handleCloseGroupMembers = (event) => {
    if (anchorRefMembers.current && anchorRefMembers.current.contains(event.target)) {
      return
    }
    setOpenMembers(false)
  }

  const prevOpenMembers = useRef(openMembers)
  useEffect(() => {
    if (prevOpenMembers.current === true && openMembers === false) {
      anchorRefMembers.current.focus()
    }
    prevOpenMembers.current = openMembers
  }, [openMembers])

  return (
    <div>
      <AvatarGroup ref={anchorRefMembers} sx={{ display: { xs: 'none', md: 'flex' }, transition: 'all .2s ease-in-out' }}>
        {members.map((user) =>
          (
            <Avatar
              key={user._id}
              tooltip={user.firstName + ' ' + user.lastName}
              src={user.avatar ? API_HOST + user.avatar : User1}
              size='badge'
              outline
              hover
              onClick={handleToggle}
            />
          )
        )}
      </AvatarGroup>
      <Popper
        placement="left-end"
        open={openMembers}
        anchorEl={anchorRefMembers.current}
        role={undefined}
        transition
        disablePortal
        sx={{ zIndex: 9999 }}
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={openMembers} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleCloseGroupMembers}>
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                  <Box sx={{ p: 2 }}>
                    <Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography variant="h4">List Members : </Typography>
                        <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                          {board?.title ? board.title : 'Board'}
                        </Typography>
                      </Stack>
                      <Typography variant="subtitle2">Kick out</Typography>
                    </Stack>
                    <OutlinedInput
                      sx={{ width: '100%', pr: 1, pl: 2, my: 2 }}
                      id="input-search-profile"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Search"
                      startAdornment={
                        <InputAdornment position="start">
                          <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                        </InputAdornment>
                      }
                      aria-describedby="search-helper-text"
                      inputProps={{
                        'aria-label': 'weight'
                      }}
                    />
                    <Divider />
                  </Box>
                  <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}>
                    <Box sx={{ p: 2 }}>
                      <List
                        component="nav"
                        sx={{
                          width: '100%',
                          maxWidth: 350,
                          minWidth: 300,
                          backgroundColor: theme.palette.background.paper,
                          borderRadius: '10px',
                          [theme.breakpoints.down('md')]: {
                            minWidth: '100%'
                          },
                          '& .MuiListItemButton-root': {
                            mt: 0.5
                          }
                        }}
                      >
                        {members.map((user) => (
                          <UserCard key={user._id} user={user} type='delete' />
                        ))}
                      </List>
                    </Box>
                  </PerfectScrollbar>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </div>
  )
}

export default GroupMembers