import Container from '@mui/material/Container'
import { BoardContent } from './BoardContent'
import { BoardHeader } from './BoardHeader'
import { AppHeader } from '../../components/AppHeader'
import { mockData } from '../../apis/mock-data'

export const Board = () => {
  return (
    <Container disableGutters maxWidth='false' sx={{ height:'100vh', '@media (min-width: 600px)': { paddingLeft: '0', paddingRight: '0' } }}>
      <AppHeader />
      <BoardHeader board={mockData.board} />
      <BoardContent board={mockData.board}/>
    </Container>
  )
}
