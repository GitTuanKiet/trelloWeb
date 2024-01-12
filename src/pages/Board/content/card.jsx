import MuiCard from '@mui/material/Card'
import { CardContent, CardMedia, Typography, CardActions, Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material'
import {
  ThumbUp as ThumbUpIcon,
  Comment as CommentIcon,
  Share as ShareIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'


const Card = ({ card, dragging }) => {
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

  const isShowActions = () => (!!card?.likes?.length || !!card?.comments?.length || !!card?.shares?.length) ? true : false

  return (
    <MuiCard
      ref={setNodeRef} style={dndCardStyle} {...attributes} {...listeners}
      sx={{
        minWidth: '100%',
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
      <Accordion disableGutters expanded={dragging}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color:(theme) => theme.palette. text.secondary }} />}
        >
          <CardContent sx={{ p:0, '& .MuiTypography-root':{ padding: '1px 4px' } }}>
            <Typography sx={{ fontSize:'1.2rem', fontWeight:'bold' }}>
              {card?.title}
            </Typography>
          </CardContent>
        </AccordionSummary>
        <AccordionDetails>
          {card?.cover && <CardMedia
            component="img"
            image={`data:image/png;base64,${card.cover.toString('base64')}`}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              aspectRatio: '1 / 1'
            }}
          />}
          {card?.description && <CardContent>
            <Typography paragraph>
              {card?.description}
            </Typography>
          </CardContent>}
          {isShowActions() && <CardActions sx={{ gap:1, p:0 }}>
            {!!card?.likes?.length && <Button startIcon={<ThumbUpIcon />} size="small">{card.likes.length}</Button>}
            {!!card?.comments?.length && <Button startIcon={<CommentIcon />} size="small">{card.comments.length}</Button>}
            {!!card?.shares?.length && <Button startIcon={<ShareIcon />} size="small">{card.shares.length}</Button>}
          </CardActions>}
        </AccordionDetails>
      </Accordion>
    </MuiCard>
  )
}

export default Card