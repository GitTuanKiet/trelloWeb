import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// material-ui
import { useTheme } from '@mui/material/styles'
import {
  Button,
  FormControl,
  Grid,
  OutlinedInput,
  InputLabel,
  Typography,
  useMediaQuery
} from '@mui/material'

// third party
import * as Yup from 'yup'
import { Formik } from 'formik'
import { toast } from 'react-toastify'

// project imports
import AnimateButton from '~/ui-component/extended/AnimateButton'
import { gridSpacing } from '~/utils/constants'
import { forgotPassword } from '~/redux/Auth/thunk'

// ============================|| FIREBASE - FORGOT PASSWORD ||============================ //

const FirebaseForgotPassword = ({ ...others }) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token, user, error } = useSelector((state) => state.auth)

  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'))
  const customization = useSelector((state) => state.customization)

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  useEffect(() => {
    if (token && user) {
      toast.success('Password reset email has been sent.')
      toast.info('New password: ' + user.password)
      navigate('/pages/login/login3')
    }
  }, [token, user, navigate])

  return (
    <Grid container direction="column" justifyContent="center" spacing={gridSpacing}>
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
            >
              Forgot Password
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography
          sx={{
            mb: 2
          }}
        >
          Enter your email address below and we&apos;ll send you password reset
          instructions.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Formik
          initialValues={{
            email: ''
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email('Must be a valid email')
              .max(255)
              .required('Email is required')
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              dispatch(forgotPassword(values))
              setStatus({ success: true })
              setSubmitting(false)
            } catch (err) {
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
            <form noValidate onSubmit={handleSubmit} {...others} >
              <FormControl error={Boolean(touched.email && errors.email)} fullWidth sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-email-login">Email Address</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-email-login"
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Email Address"
                  inputProps={{}}
                />
                {touched.email && errors.email && (
                  <Typography
                    color="error"
                    variant="caption"
                    sx={{ mt: 1.5, mb: 0.5, display: 'block' }}
                  >
                    {errors.email}
                  </Typography>
                )}
              </FormControl>
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
                    <Typography>Send password reset email</Typography>
                  </Button>
                </AnimateButton>
              </Grid>
            </form>
          )}
        </Formik>
      </Grid>
    </Grid>
  )
}

export default FirebaseForgotPassword