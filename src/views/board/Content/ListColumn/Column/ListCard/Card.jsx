import MuiCard from '@mui/material/Card'
import { CardContent, CardMedia, Typography, CardActions, Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material'
import {
  ThumbUp as ThumbUpIcon,
  Favorite as FavoriteIcon,
  FileDownload as FileDownloadIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import { API_HOST } from '~/utils/constants'
import { useDispatch } from 'react-redux'
import { likeCard, favoriteCard, fileDownload } from '~/redux/board/boardSlice'
import { useEffect } from 'react'

const Card = ({ card, dragging }) => {
  const dispatch = useDispatch()

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

  const isShowActions = card?.cover ? true : false
  const { likes, favorites, downloads } = card

  return (
    <MuiCard
      ref={setNodeRef} style={dndCardStyle} {...attributes} {...listeners}
      sx={{
        minWidth: '100%',
        overflow:'unset',
        display: card?.FE_placeholder ? 'none' : 'block',
        boxShadow:'0 0 0 1px rgba(9,30,66,.25)',
        '& .MuiCardContent-root:last-child': {
          paddingBottom: '0 !important'
        }
      }}>
      <Accordion disableGutters expanded={dragging}
        sx={{
          bgcolor: (theme) => theme.palette.primary.main
        }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color:(theme) => theme.palette.secondary.light }} />}
        >
          <CardContent sx={{ p:0, '& .MuiTypography-root':{ padding: '1px 4px' } }}>
            <Typography sx={{ fontSize:'1.2rem', fontWeight:'bold' }}>
              {card?.title}
            </Typography>
          </CardContent>
        </AccordionSummary>
        <AccordionDetails sx={{ bgcolor: (theme) => theme.palette.background.paper }}>
          {card?.cover && <CardMedia
            component="img"
            image={API_HOST + card.cover}
            alt={card.title}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />}
          {card?.description && <CardContent>
            <Typography paragraph>
              {card?.description}
            </Typography>
          </CardContent>}
          {isShowActions && <CardActions sx={{ gap:1, p:0 }}>
            <Button
              onClick={() => dispatch(likeCard(card))}
              startIcon={<ThumbUpIcon />} size="small">{likes?.length || 0}</Button>
            <Button
              onClick={() => dispatch(favoriteCard(card))}
              startIcon={<FavoriteIcon />} size="small">{favorites?.length || 0}</Button>
            <Button
              onClick={() => dispatch(fileDownload(card)) }
              startIcon={<FileDownloadIcon />}
              size="small">{downloads}</Button>
          </CardActions>}
        </AccordionDetails>
      </Accordion>
    </MuiCard>
  )
}

export default Card