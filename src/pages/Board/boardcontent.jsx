import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import CommentIcon from '@mui/icons-material/Comment'
import ShareIcon from '@mui/icons-material/Share'
import ArrowDropDown from '@mui/icons-material/ArrowDropDown'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Divider from '@mui/material/Divider'
import DeleteIcon from '@mui/icons-material/Delete'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import React from 'react'

export const BoardContent = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Box sx={{
      display: 'flex',
      overflowX: 'auto',
      height: (theme) => (theme.trello.boardContentHeight)
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 2,
        padding: 2
      }}>
        {/* column */}
        <Box sx={{
          display: 'flex',
          minWidth: (theme) => (theme.trello.columns.width),
          maxWidth: (theme) => (theme.trello.columns.width),
          minHeight: (theme) => (theme.trello.columns.height),
          maxHeight: (theme) => (theme.trello.columns.height),
          padding: 2,
          borderRadius: 4,
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'space-between',
          bgcolor: 'grey'
        }}>
          {/* header column */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width:'100%',
            height:(theme) => theme.trello.columns.heightheader,
            borderBottom:'1px solid blue' }}>
            <Typography sx={{ fontSize:'1.4rem' }}>Column number one</Typography>
            <ArrowDropDown
              id="basic-column-dropdown"
              aria-controls={open ? 'basic-menu-dropdown' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            />
            <Menu
              id="basic-menu-dropdown"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-column-dropdown'
              }}
            >
              <MenuList>
                <MenuItem>
                  <StarBorderIcon />Star
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ContentCopyIcon />Copy
                </MenuItem>
                <MenuItem>
                  <DeleteIcon />Destroy
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
          {/* cards column */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            minHeight: (theme) => (theme.trello.columns.heightcontent),
            maxHeight: (theme) => (theme.trello.columns.heightcontent),
            width:'100%',
            gap: 1,
            borderRadius: 2,
            bgcolor: 'white',
            overflowY: 'hidden',
            '& .MuiCardContent-root': {
              padding: 0
            },
            '& .MuiCardActions-root': {
              padding: 1,
              justifyContent: 'flex-end'
            },
            '& .MuiTypography-root': {
              display: 'flex',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              justifyContent: 'center',
              padding: 1
            },
            '& .MuiButton-root': {
              padding: 0,
              minWidth: 'auto',
              width: 'auto',
              height: 'auto',
              '& .MuiSvgIcon-root': {
                fontSize: '1.2rem'
              },
              '& .MuiCardContent-root:last-child': {
                padding: 0
              }
            }
          }}>
            {/* card 1 */}
            <Card sx={{ minwidth: '100%', minHeight:'auto' }}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
              />
              <CardContent>
                <Typography variant="h5" component="div">
                Card tuankiet trello
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small"><ThumbUpIcon /></Button>
                <Button size="small"><CommentIcon /></Button>
                <Button size="small"><ShareIcon /></Button>
              </CardActions>
            </Card>
            {/* card 2 */}
            <Card sx={{ minwidth: '100%', minHeight:'auto' }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
              </CardContent>
            </Card>
          </Box>
          {/* footer column */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width:'100%',
            height:(theme) => theme.trello.columns.heightfooter,
            borderTop:'1px solid blue' }}>
            <Typography sx={{ fontSize:'1.4rem' }}>Drag and drop to list</Typography>
            <DragHandleIcon />
          </Box>
        </Box>

      </Box>
    </Box>
  )
}