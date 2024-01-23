import { useSelector } from 'react-redux'

// material-ui
import { useTheme } from '@mui/material/styles'
import {
  Button,
  Grid,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material'

// third party
import * as Yup from 'yup'
import { Formik } from 'formik'

// project imports
import AnimateButton from '~/ui-component/extended/AnimateButton'

// ============================|| FIREBASE - FORGOT PASSWORD ||============================ //

const FirebaseForgotPassword = ({ ...others }) => {
  const theme = useTheme()

  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'))
  const customization = useSelector((state) => state.customization)

  return (
    <Grid container direction="column" justifyContent="center" spacing={2}>
      <Grid item xs={12}>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Grid item>
            <Typography
              variant={matchDownSM ? 'h4' : 'h3'}
              sx={{ color: customization.navType === 'dark' ? '#ffffff' : '' }}
            >
              Forgot Password
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="subtitle1"
          sx={{
            mb: 2,
            color: customization.navType === 'dark' ? '#ffffff' : ''
          }}
        >
          Enter your email address below and we&apos;ll send you password reset
          instructions.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Formik
          initialValues={{
            email: '',
            submit: null
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email('Must be a valid email')
              .max(255)
              .required('Email is required')
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              // NOTE: Make API request
              console.error(values)
              setStatus({ success: true })
              setSubmitting(false)
            } catch (err) {
              console.error(err)
              setStatus({ success: false })
              setErrors({ submit: err.message })
              setSubmitting(false)
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values
          }) => (
            <form noValidate onSubmit={handleSubmit} {...others}>
              <Grid container spacing={matchDownSM ? 0 : 2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    margin="normal"
                    name="email"
                    type="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                    InputProps={{
                      sx: { ...theme.typography.customInput }
                    }}
                    inputProps={{
                      autoComplete: 'new-password',
                      form: {
                        autoComplete: 'off'
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <AnimateButton>
                    <Button
                      disableElevation
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      disabled={isSubmitting}
                    >
                      Send password reset email
                    </Button>
                  </AnimateButton>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Grid>
    </Grid>
  )
}

export default FirebaseForgotPassword