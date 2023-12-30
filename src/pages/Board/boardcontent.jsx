import Box from '@mui/material/Box'
import ListColumn from './content/ListColumn'
import { useState, useEffect } from 'react'
import { sortArray } from '@/utils/sorts'
import { arrayMove } from '@dnd-kit/sortable'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'

export const BoardContent = ({ board }) => {
  const [columns, setColumns] = useState(sortArray(board?.columns, board?.columnOrderIds, '_id'))

  useEffect(() => {
    setColumns(sortArray(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragEndColumns = (event) => {
    if (!event.over) return
    const { active, over } = event
    if (active.id !== over.id) {
      const oldIndex = columns.findIndex((column) => column._id === active.id)
      const newIndex = columns.findIndex((column) => column._id === over.id)
      setColumns(arrayMove(columns, oldIndex, newIndex))
    }
  }

  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })

  const sensors = useSensors( mouseSensor, touchSensor)
  return (
    <Box sx={{
      width:'100%',
      height: (theme) => (theme.trello.boardContentHeight),
      padding: 2,
      bgcolor: 'primary'
    }}>
      <DndContext onDragEnd={handleDragEndColumns} sensors={sensors}>
        <ListColumn columns={columns}/>
      </DndContext>
    </Box>
  )
}