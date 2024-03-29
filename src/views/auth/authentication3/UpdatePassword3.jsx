import { Link, Navigate } from 'react-router-dom'

// material-ui
import { useTheme } from '@mui/material/styles'
import { Grid, Stack, Typography, useMediaQuery } from '@mui/material'

// third party
import { toast } from 'react-toastify'

// project imports
import AuthWrapper1 from '../AuthWrapper1'
import AuthCardWrapper from '../AuthCardWrapper'
import Logo from '~/ui-component/Logo'
import AuthUpdatePassword from '../auth-forms/AuthUpdatePassword'
import AuthFooter from '~/ui-component/cards/AuthFooter'
import { isAuth } from '~/utils/auth'

const UpdatePassword = () => {
  const theme = useTheme()
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'))

  if (!isAuth()) {
    toast.error('You are not authorized to access this page')
    return <Navigate to="/pages/login/login3" replace />
  }

  return (
    <AuthWrapper1>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item sx={{ mb: 3 }}>
                    <Link to="#">
                      <Logo />
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                      <Grid item>
                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                          <Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h3' : 'h2'}>
                            Update Password
                          </Typography>
                          <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
                            Enter your credentials to continue
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <AuthUpdatePassword />
                  </Grid>
                  <Grid item>
                    <Grid container justifyContent={matchDownSM ? 'center' : 'flex-end'}>
                      <Link to="/board" variant="subtitle2">
                              Back to home
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid>
      </Grid>
    </AuthWrapper1>
  )
}

export default UpdatePassword