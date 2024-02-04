import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

// material-ui
import { AvatarGroup, Button, Stack } from '@mui/material'

// project imports
import Avatar from '~/ui-component/extended/Avatar'
import Skeleton from '@mui/material/Skeleton'

// assets
import GroupAddIcon from '@mui/icons-material/GroupAdd'

// constant
const avatarGroupSx = {
  '& .MuiAvatar-root': {
    width: 28,
    height: 28,
    border: 'none',
    fontSize: '0.8rem',
    cursor: 'pointer',
    '&:hover': {
      border: '2px solid red',
      width: 32,
      height: 32,
      zIndex: 1
    }
  }
}

// ===========================|| BOARD BAR - MEMBERS ||=========================== //

const MembersBoard = ({ isLoading }) => {
  const { board } = useSelector((state) => state.board)

  const handleAddMember = () => {
    console.info('You clicked the Add btn.', board)
  }

  const handleMemberClick = () => {
    console.info('You clicked the Avatar.', board)
  }

  return (
    <Stack direction="row" spacing={1}>
      {isLoading ? (<Skeleton variant="circular" width={28} height={28} />) : (
        <Button
          startIcon={<GroupAddIcon />} variant="contained"
          sx={{ marginX: 2, minWidth: '100px' }}
          onClick={handleAddMember}
        >
          Invite
        </Button>
      )}
      {isLoading ? (<Skeleton variant="circular" width={28} height={28} />) : (
        <AvatarGroup max={3} sx={avatarGroupSx}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" onClick={handleMemberClick} />
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" onClick={handleMemberClick} />
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" onClick={handleMemberClick} />
          <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" onClick={handleMemberClick} />
          <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" onClick={handleMemberClick} />
        </AvatarGroup>)}
    </Stack>
  )
}

MembersBoard.propTypes = {
  isLoading: PropTypes.bool
}

export default MembersBoard
