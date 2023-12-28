import MuiCard from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import CommentIcon from '@mui/icons-material/Comment'
import ShareIcon from '@mui/icons-material/Share'
import { Typography } from '@mui/material'

const Card = ({ bool }) => {
  if (bool) {
    return (
      <MuiCard sx={{
        minwidth: '100%',
        minHeight:'auto',
        cursor:'pointer',
        overflow:'unset',
        boxShadow:'0 0 0 1px rgba(9,30,66,.25)',
        '& .MuiCardContent-root:last-child': {
          paddingBottom:1
        },
        '& .MuiCardContent-root': {
          padding: 1
        } }}>
        <CardContent>
          <Typography>
                    Card khac
          </Typography>
        </CardContent>
      </MuiCard>
    )
  }
  return (
    <MuiCard sx={{
      minwidth: '100%',
      minHeight:'auto',
      overflow:'unset',
      cursor:'pointer',
      '& .MuiCardContent-root': {
        padding: 1
      },
      boxShadow:'0 0 0 1px rgba(9,30,66,.25)',
      '& .MuiCardContent-root:last-child': {
        paddingBottom:1
      } }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
      />
      <CardContent>
        <Typography>
            Card tuankiet trello
        </Typography>
      </CardContent>
      <CardActions sx={{ gap:1 }}>
        <Button startIcon={<ThumbUpIcon />} size="small">20</Button>
        <Button startIcon={<CommentIcon />} size="small">21</Button>
        <Button startIcon={<ShareIcon />} size="small">22</Button>
      </CardActions>
    </MuiCard>
  )
}

export default Card