import { Grid } from '@mui/material'
import { gridSpacing } from '~/utils/constants'

// project imports
import ListColumn from './ListColumn'
import Card from './ListColumn/Column/ListCard/Card'
import Column from './ListColumn/Column'
import { generatePlaceholder } from '~/utils/formatters'
import { useState, useEffect, useCallback, useRef } from 'react'
import { cloneDeep, isEmpty } from 'lodash'
import { arrayMove } from '@dnd-kit/sortable'
import { MouseSensor, TouchSensor } from '~/custom/Libs/dndKitSensors'
import {
  DndContext,
  DragOverlay,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors,
  closestCorners,
  pointerWithin,
  getFirstCollision
} from '@dnd-kit/core'
import {
  setMoveColumn,
  setMoveCardWithoutColumn,
  setMoveCardWithinColumn
} from '~/redux/board/boardSlice'
import { useDispatch, useSelector } from 'react-redux'

const Content = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.board.columns)
  const [columns, setColumns] = useState(state)
  const [type, setType] = useState(null)
  const [data, setData] = useState(null)
  const [id, setId] = useState(null)
  const [oldColumn, setOldColumn] = useState(null)

  const lastOverId = useRef(null)

  useEffect(() => {
    setColumns(state)
  }, [state])

  const findColumnWithCardId = (cardId) => {
    return columns.find((column) => column?.cards?.map((card) => card?._id)?.includes(cardId))
  }

  const handleDragStart = (event) => {
    resetState()
    const newType = event?.active?.data?.current?.columnId ? 'card' : 'column'
    return (
      setType(newType),
      setData(event?.active?.data?.current),
      setId(event?.active?.id),
      setOldColumn(newType === 'card' ? findColumnWithCardId(event?.active?.id) : null)
    )
  }

  const handleDragOver = (event) => {

    if (type === 'column') return
    if (!event.active || !event.over) return

    const { active, over } = event
    const { id: activeDraggingCardId, data: { current: activeDraggingCard } } = active
    const { id: overCardId } = over

    const activeColumn = findColumnWithCardId(activeDraggingCardId)
    const overColumn = findColumnWithCardId(overCardId)

    if (!activeColumn || !overColumn) return

    if (activeColumn._id !== overColumn._id) {
      setDraggedCardToNewColumn(overColumn, activeDraggingCardId, overCardId, activeDraggingCard, active, over, activeColumn, 'over')
    }
  }

  const handleDragEnd = (event) => {

    if (!event.active || !event.over) return

    const { active, over } = event

    if (type === 'card') {

      const { id: activeDraggingCardId, data: { current: activeDraggingCard } } = active
      const { id: overCardId } = over

      const activeColumn = findColumnWithCardId(activeDraggingCardId)
      const overColumn = findColumnWithCardId(overCardId)

      if (!activeColumn || !overColumn || !oldColumn) return

      if (oldColumn._id === overColumn._id) {

        const oldCardIndex = oldColumn?.cards?.findIndex((card) => card._id === id)
        const newCardIndex = overColumn?.cards?.findIndex((card) => card._id === overCardId)

        const orderedCards = arrayMove(oldColumn?.cards, oldCardIndex, newCardIndex)
        const newCardOrderIds = orderedCards.map(card => card._id)

        setColumns(prevColumns => {
          const newColumns = cloneDeep(prevColumns)
          const targetColumn = newColumns.find(column => column._id === overColumn._id)
          if (targetColumn) {
            targetColumn.cards = orderedCards
            targetColumn.cardOrderIds = newCardOrderIds
          }
          return newColumns
        })

        dispatch(setMoveCardWithinColumn({ newCardOrderIds, orderedCards, columnId:oldColumn._id }))

      } else {

        setDraggedCardToNewColumn(overColumn, activeDraggingCardId, overCardId, activeDraggingCard, active, over, activeColumn, 'end')

      }
    } else if (type === 'column') {

      if ( over !== active ) {

        const oldColumnIndex = columns.findIndex(column => column._id === active.id)
        const newColumnIndex = columns.findIndex(column => column._id === over.id)

        const orderedColumns = arrayMove(columns, oldColumnIndex, newColumnIndex)
        setColumns(orderedColumns)

        const newColumnOrderIds = orderedColumns.map(column => column._id)
        dispatch(setMoveColumn({ newColumnOrderIds, orderedColumns }))
      }
    }

    return resetState()
  }

  const resetState = () => {
    setType(null)
    setData(null)
    setId(null)
    setOldColumn(null)
  }

  const setDraggedCardToNewColumn = (overColumn, activeDraggingCardId, overCardId, activeDraggingCard, active, over, activeColumn, trigger) => {
    setColumns(prevColumns => {
      const overCardIndex = overColumn?.cards?.findIndex((card) => card._id === overCardId)

      let newCardIndex
      const isBelowOverItem = active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

      const newColumns = cloneDeep(prevColumns)
      const newActiveColumn = newColumns.find(column => column._id === activeColumn._id)
      const newOverColumn = newColumns.find(column => column._id === overColumn._id)

      if (newActiveColumn) {
        newActiveColumn.cards = newActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

        if (isEmpty(newActiveColumn.cards)) newActiveColumn.cards = [generatePlaceholder(newActiveColumn)]

        newActiveColumn.cardOrderIds = newActiveColumn.cards.map(card => card._id)
      }

      if (newOverColumn) {
        newOverColumn.cards = newOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

        newOverColumn.cards = newOverColumn.cards.toSpliced(newCardIndex, 0, {
          ...activeDraggingCard,
          columnId: newOverColumn._id
        })

        newOverColumn.cards = newOverColumn.cards.filter(card => !card.FE_placeholder)

        newOverColumn.cardOrderIds = newOverColumn.cards.map(card => card._id)
      }

      if (trigger === 'end') dispatch(setMoveCardWithoutColumn({ newColumns, cardId:activeDraggingCardId, prevColumnId:oldColumn._id, nextColumnId:overColumn._id }))

      return newColumns
    })
  }

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects[{
      styles:{
        active: {
          opacity: 0.5
        }
      }
    }] }

  const collisionDetectionStrategy = useCallback((args) => {
    if (type === 'column') return closestCorners({ ...args })

    const pointerIntersection = pointerWithin(args)
    if (!pointerIntersection?.length > 0) return
    // const Intersections = pointerIntersection?.length > 0 ? pointerIntersection : rectIntersection(args)
    let overId = getFirstCollision(pointerIntersection)?.id

    if (overId) {
      const overColumn = columns.find(column => column._id === overId)
      if (overColumn) {
        overId = closestCorners({
          ...args,
          droppableContainers: args.droppableContainers.filter((droppable) =>
            droppable.id !== overId && overColumn?.cardOrderIds?.includes(droppable.id))
        })[0]?.id
      }

      lastOverId.current = overId
      return [{ id: overId }]
    }
    return lastOverId.current ? [{ id: lastOverId.current }] : []

  }, [type, columns])

  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })

  const sensors = useSensors( mouseSensor, touchSensor)
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} sx={{ height: (theme) => theme.trello.boardContentHeight }}>
          <ListColumn columns={columns} />
          <DragOverlay dropAnimation={dropAnimation}>
            {!type && null }
            {(type === 'column' && data) && <Column key={id} column={data} />}
            {(type === 'card' && data) && <Card key={id} card={data} dragging={true} />}
          </DragOverlay>
        </Grid>
      </Grid>
    </DndContext>
  )
}

export default Content