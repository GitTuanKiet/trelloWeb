import * as React from 'react'
import Markdown from '~/modules/components/Markdown'
import Typography from '~/modules/components/Typography'
import AppAppBar from '~/modules/views/layouts/AppAppBar'
import AppFooter from '~/modules/views/layouts/AppFooter'
import privacy from '~/modules/views/md/privacy.md'
import { Box, Container } from '@mui/material'

function Privacy() {
  return (
    <React.Fragment>
      <AppAppBar />
      <Container>
        <Box sx={{ mt: 7, mb: 12 }}>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Privacy
          </Typography>
          <Markdown>{privacy}</Markdown>
        </Box>
      </Container>
      <AppFooter />
    </React.Fragment>
  )
}

export default Privacy
