import Box from '@mui/material/Box'
import Card from './Card'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

const ListCard = ({ cards }) => {
  return (
    <SortableContext items={cards?.map(card => card._id)} strategy={verticalListSortingStrategy}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        maxHeight: (theme) => (theme.trello.columns.heightcontent),
        height: 'fit-content',
        gap: 1,
        padding:'0px 5px',
        borderRadius: 2,
        bgcolor: 'primary',
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
        {cards?.map((card) => ( <Card key={card._id} card={card} /> ) )}
      </Box>
    </SortableContext>
  )
}

export default ListCard