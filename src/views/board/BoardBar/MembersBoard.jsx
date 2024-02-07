import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

// material-ui
import { AvatarGroup, Chip, Stack } from '@mui/material'
import { useTheme } from '@mui/material'

// third-party
import { toast } from 'react-toastify'

// project imports
import Avatar from '~/ui-component/extended/Avatar'
import Skeleton from '@mui/material/Skeleton'

// assets
import GroupAddIcon from '@mui/icons-material/GroupAdd'

// constant
// const avatarGroupSx = {
//   '& .MuiAvatar-root': {
//     width: 28,
//     height: 28,
//     border: 'none',
//     fontSize: '0.8rem',
//     cursor: 'pointer',
//     '&:hover': {
//       border: '2px solid red',
//       width: 32,
//       height: 32,
//       zIndex: 1
//     }
//   }
// }

// ===========================|| BOARD BAR - MEMBERS ||=========================== //

const MembersBoard = ({ isLoading }) => {
  const board = useSelector((state) => state.board)
  const theme = useTheme()

  const handleAddMember = () => {
    toast.info('You clicked the Add btn.', board)
  }

  const handleMemberClick = () => {
    toast.info('You clicked the Avatar.', board)
  }

  const listUser = [
    {
      id: 1,
      name: 'Remy Sharp',
      avatar: '/static/images/avatar/1.jpg'
    },
    {
      id: 2,
      name: 'Travis Howard',
      avatar: '/static/images/avatar/2.jpg'
    },
    {
      id: 3,
      name: 'Cindy Baker',
      avatar: '/static/images/avatar/3.jpg'
    },
    {
      id: 4,
      name: 'Agnes Walker',
      avatar: '/static/images/avatar/4.jpg'
    },
    {
      id: 5,
      name: 'Trevor Henderson',
      avatar: '/static/images/avatar/5.jpg'
    }
  ]

  return (
    <>
      <Stack direction="row">
        {isLoading ? (<Skeleton variant="circular" width={28} height={28} />) : (
          <Chip
            label="Invite"
            onClick={handleAddMember}
            sx={{
              backgroundColor: theme.palette.secondary.dark,
              color: '#fff',
              '& .MuiChip-icon': {
                color: '#fff'
              }
            }}
            icon={<GroupAddIcon />}
          />
        )}
        {isLoading ? (<Skeleton variant="circular" width={32} height={32} />) : (
          <AvatarGroup sx={{ display: { xs: 'none', md: 'flex' } }}>
            {listUser.map((user) =>
              (
                <Avatar
                  key={user.id}
                  tooltip={user.name}
                  src={user.avatar}
                  size='badge'
                  outline
                  hover
                  onClick={handleMemberClick}
                />
              )
            )}
          </AvatarGroup>)}
      </Stack>
    </>

  )
}

MembersBoard.propTypes = {
  isLoading: PropTypes.bool
}

export default MembersBoard
