

import { useState, useEffect, useRef, useMemo } from 'react'
import { useSelector } from 'react-redux'

// material-ui
import {
  Chip,
  List,
  useTheme,
  Box,
  Paper,
  ClickAwayListener,
  Popper,
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

// assets
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import { IconSearch } from '@tabler/icons-react'


const BtnInvite = () => {
  const theme = useTheme()
  const board = useSelector((state) => state.board)
  const { listUser } = useSelector((state) => state.user)

  const [list, setList] = useState(listUser)
  const memberSet = useMemo(() => new Set(board.members.map(member => member._id)), [board.members])

  useEffect(() => {
    setList(listUser.filter(user => !memberSet.has(user._id)))
  }, [listUser, memberSet])

  const [value, setValue] = useState('')
  const [openInvite, setOpenInvite] = useState(false)
  const anchorRefInvite = useRef(null)

  const handleToggle = () => {
    setOpenInvite((prevOpen) => !prevOpen)
  }

  const handleCloseAddMember = (event) => {
    if (anchorRefInvite.current && anchorRefInvite.current.contains(event.target)) {
      return
    }
    setOpenInvite(false)
  }

  const prevOpenInvite = useRef(openInvite)
  useEffect(() => {
    if (prevOpenInvite.current === true && openInvite === false) {
      anchorRefInvite.current.focus()
    }
    prevOpenInvite.current = openInvite
  }, [openInvite])

  return (
    <>
      <Chip
        label="Invite"
        ref={anchorRefInvite}
        onClick={handleToggle}
        sx={{
          transition: 'all .2s ease-in-out',
          backgroundColor: theme.palette.secondary.dark,
          color: '#fff',
          '& .MuiChip-icon': {
            color: '#fff'
          }
        }}
        icon={<GroupAddIcon />}
      />
      <Popper
        placement="left-end"
        open={openInvite}
        anchorEl={anchorRefInvite.current}
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
          <Transitions in={openInvite} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleCloseAddMember}>
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                  <Box sx={{ p: 2 }}>
                    <Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography variant="h4">Invite Members :</Typography>
                        <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                          {board?.title ? board.title : 'Board'}
                        </Typography>
                      </Stack>
                      <Typography variant="subtitle2">Find and invite members to join your board.</Typography>
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
                        {list.map((user) => (
                          <UserCard key={user._id} user={user} type='add' />
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
    </>
  )
}

export default BtnInvite