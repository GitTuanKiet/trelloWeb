
import BoardContent from './Content/_id'
import BoardBar from './BoardBar'
import { Container } from '@mui/material'


const Board = () => {
  return (
    <Container disableGutters maxWidth='false'>
      <BoardBar />
      <BoardContent />
    </Container>
  )
}

export default Board
