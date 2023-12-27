import Container from '@mui/material/Container'
import { BoardContent } from './boardcontent'
import { BoardHeader } from './boardheader'
import { AppHeader } from '@/components/AppHeader'

export const Board = () => {
  return (
    <Container maxWidth='false' sx={{ height:'100vh', '@media (min-width: 600px)': { paddingLeft: '0', paddingRight: '0' } }}>
      <AppHeader />
      <BoardHeader />
      <BoardContent />
    </Container>
  )
}
