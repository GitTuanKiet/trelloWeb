import MuiCard from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import CommentIcon from '@mui/icons-material/Comment'
import ShareIcon from '@mui/icons-material/Share'
import { Typography } from '@mui/material'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'

const Card = ({ card }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: card._id,
    data: { ...card }
  })

  const dndCardStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    opacity: isDragging ? 0.5 : 1,
    border: isDragging ? '1px solid red' : 'none'
  }
  const isShowActions = () => (card?.memberIds?.length || card?.comments?.length || card?.attachments?.length) ? true : false
  return (
    <MuiCard
      ref={setNodeRef} style={dndCardStyle} {...attributes} {...listeners}
      sx={{
        minwidth: '100%',
        overflow:'unset',
        bgcolor: 'background.paper',
        display: card?.FE_placeholder ? 'none' : 'block',
        // overflow: card?.FE_placeholder ? 'hidden' : 'unset',
        // height: card?.FE_placeholder ? '0px' : 'auto',
        boxShadow:'0 0 0 1px rgba(9,30,66,.25)',
        '& .MuiCardContent-root:last-child': {
          paddingBottom: '0 !important'
        }
      }}>
      {card?.cover && <CardMedia
        component="img"
        height="140"
        image={card.cover}
        sx={{ borderRadius:'4px' }}
      />}
      <CardContent sx={{ p:0, '& .MuiTypography-root':{ padding: '1px 4px' } }}>
        <Typography >
          {card?.title}
        </Typography>
      </CardContent>
      {isShowActions() && <CardActions sx={{ gap:1, p:0 }}>
        {!!card?.memberIds?.length && <Button startIcon={<ThumbUpIcon />} size="small">{card.memberIds.length}</Button>}
        {!!card?.comments?.length && <Button startIcon={<CommentIcon />} size="small">{card.comments.length}</Button>}
        {!!card?.attachments?.length && <Button startIcon={<ShareIcon />} size="small">{card.attachments.length}</Button>}
      </CardActions>}
    </MuiCard>
  )
}

export default Card