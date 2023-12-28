import Box from '@mui/material/Box'
import Card from './card'

const ListCards = () => {
  return (
    <Box sx={{
      p:'0 5px',
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
      <Card />
      <Card bool={true} />
      <Card bool={true} />
      <Card bool={true} />
      <Card bool={true} />
      <Card bool={true} />
      <Card bool={true} />
      <Card bool={true} />
      <Card bool={true} />
      <Card bool={true} />
    </Box>
  )
}

export default ListCards