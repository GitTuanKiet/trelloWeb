import MuiCard from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import CommentIcon from '@mui/icons-material/Comment'
import ShareIcon from '@mui/icons-material/Share'
import { Typography } from '@mui/material'

const Card = ({ card }) => {
  const isShowActions = () => (card?.memberIds?.length || card?.comments?.length || card?.attachments?.length) ? true : false
  return (
    <MuiCard sx={{
      minwidth: '100%',
      overflow:'unset',
      cursor:'pointer',
      boxShadow:'0 0 0 1px rgba(9,30,66,.25)',
      '& .MuiCardContent-root:last-child': {
        paddingBottom: '0 !important'
      }
    }}>
      {card?.cover && <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={card.cover}
      />}
      <CardContent sx={{ p:0 }}>
        <Typography>
          {card?.title}
        </Typography>
      </CardContent>
      {isShowActions() && <CardActions sx={{ gap:1 }}>
        {!!card?.memberIds?.length && <Button startIcon={<ThumbUpIcon />} size="small">{card.memberIds.length}</Button>}
        {!!card?.comments?.length && <Button startIcon={<CommentIcon />} size="small">{card.comments.length}</Button>}
        {!!card?.attachments?.length && <Button startIcon={<ShareIcon />} size="small">{card.attachments.length}</Button>}
      </CardActions>}
    </MuiCard>
  )
}

export default Card