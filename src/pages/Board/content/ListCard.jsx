import Box from '@mui/material/Box'
import Card from './Card'
import { useState } from 'react'
import { sortArray } from '@/utils/sorts'

const ListCard = ({ column }) => {
  const [cards, setCards] = useState(sortArray(column?.cards, column?.cardOrderIds, '_id'))
  return (
    <Box sx={{
      p:'1px 5px 1px',
      m:'0 5px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      maxHeight: (theme) => (theme.trello.columns.heightcontent),
      width:'100%',
      gap: 1,
      borderRadius: 2,
      bgcolor: 'inherit',
      overflowX: 'hidden',
      overflowY: 'auto',
      '& .MuiCardActions-root': {
        justifyContent: 'flex-end'
      },
      '& .MuiTypography-root': {
        display: 'flex',
        fontSize: '1.25rem',
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
        '&::webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,0.12)',
          borderRadius: 4
        },
        '&::webkit-scrollbar-thumb:hover': {
          backgroundColor: 'rgba(0,0,0,0.24)'
        }
      }
    }}>
      {/* card */}
      {cards?.map((card) => {
        return (
          <Card key={card._id} card={card} />
        )
      })}
    </Box>
  )
}

export default ListCard