import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import ListCard from './ListCard'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import HeaderColumn from './HeaderColumn'
import FooterColumn from './FooterColumn'


const Column = ({ column, addNewCard, deleteColumn }) => {

  const [cards, setCards] = useState([])

  useEffect(() => {
    setCards(column.cards)
  }, [column])

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: column._id,
    data: { ...column }
  })

  const dndColumnStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    opacity: isDragging ? 0.5 : 1
  }

  return (
    <div ref={setNodeRef} style={dndColumnStyle} {...attributes}>
      <Box
        {...listeners}
        sx={{
          minWidth: (theme) => (theme.trello.columns.width),
          maxWidth: (theme) => (theme.trello.columns.width),
          maxHeight: (theme) => (theme.trello.columns.height),
          margin:'8px 0px 0px 8px',
          cursor: 'pointer',
          height: 'fit-content',
          bgcolor: 'none'
        }}>
        {/* header column */}
        <HeaderColumn deleteColumn={deleteColumn} column={column} />
        {/* cards column */}
        <ListCard key={column?._id} cards={cards} />
        {/* footer column */}
        <FooterColumn column={column} addNewCard={addNewCard} />
      </Box>
    </div>
  )
}
export default Column
