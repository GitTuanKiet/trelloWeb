
import { useSelector, useDispatch } from 'react-redux'

// material-ui
import {
  ListItemAvatar,
  ListItem,
  ListItemText,
  Typography,
  Skeleton
} from '@mui/material'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import IconButton from '@mui/material/IconButton'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

//third party
import { toast } from 'react-toastify'

// project imports
import { API_HOST } from '~/utils/constants'
import { inviteMember, removeMember } from '~/redux/user/userThunk'
import { getUserId } from '~/utils/auth'
import Avatar from '~/ui-component/extended/Avatar'

// assets
import User1 from '~/assets/images/users/user-round.svg'


const isOwner = (board, userId) => {
  if (userId == 'guest') return false
  return board?.userId === userId.toString()
}

const UserCard = ({ user, type }) => {
  const board = useSelector((state) => state.board)
  const dispatch = useDispatch()
  const customization = useSelector((state) => state.customization)
  const { loading } = useSelector((state) => state.user)

  const handleInviteMember = (user) => {
    dispatch(inviteMember({ board, user })).then((result) => {
      if (result.payload) {
        toast.error(result.payload)
      } else
        toast.success('Invite '+user.firstName+' '+user.lastName+' success')
    })
  }

  const handleRemoveMember = (user) => {
    if (!isOwner(board, getUserId())) {
      toast.error('You are not the owner of this board')
      return
    }
    dispatch(removeMember({ board, user })).then((result) => {
      if (result.payload) {
        toast.error(result.payload)
      } else
        toast.success('Remove '+user.firstName+' '+user.lastName+' success')
    })
  }

  return (
    loading ? <Skeleton variant="circular" width={28} height={28} /> :
      <ListItem
        sx={{ borderRadius: `${customization.borderRadius}px` }}
        secondaryAction={type === 'add' ?
          <IconButton edge="end" aria-label="add" onClick={() => handleInviteMember(user)}>
            <PersonAddIcon />
          </IconButton>
          :
          <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveMember(user)}>
            <PersonRemoveIcon />
          </IconButton>
        }
      >
        <ListItemAvatar>
          <Avatar
            key={user._id}
            src={user.avatar ? API_HOST + user.avatar : User1}
            size='badge'
            outline
          />
        </ListItemAvatar>
        <ListItemText
          primary={<Typography variant="body2">{user.firstName + ' ' + user.lastName}</Typography>}
          secondary={<Typography variant="caption">{user.email}</Typography>}
        />
      </ListItem>
  )
}

export default UserCard
