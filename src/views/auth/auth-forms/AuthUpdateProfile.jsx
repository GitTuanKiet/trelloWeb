import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// material-ui
import { useTheme } from '@mui/material/styles'
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Typography,
  useMediaQuery
} from '@mui/material'

// third party
import * as Yup from 'yup'
import { Formik } from 'formik'
import { toast } from 'react-toastify'

// project imports
import useScriptRef from '~/custom/Hooks/useScriptRef'
import AnimateButton from '~/ui-component/extended/AnimateButton'
import { updateProfile } from '~/redux/Auth/thunk'

const UpdateProfile = ({ ...others }) => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const scriptedRef = useScriptRef()
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'))
  const { user } = useSelector((state) => state.auth)
  const userLocal = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    if (user) {
      toast.success('Update Successfully ! You are ' + user.firstName + ' ' + user.lastName)
    }
  }, [user])

  const handleSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
    if (values.firstName === userLocal.firstName && values.lastName === userLocal.lastName && values.email === userLocal.email) {
      toast.error('You have not made any changes!')
      return
    }
    try {
      if (scriptedRef.current) {
        if (values.email === userLocal.email) {
          delete values.email
        }
        if (values.firstName === userLocal.firstName) {
          delete values.firstName
        }
        if (values.lastName === userLocal.lastName) {
          delete values.lastName
        }
        setStatus({ success: true })
        setSubmitting(false)
        dispatch(updateProfile(values))
      }
    } catch (err) {
      if (scriptedRef.current) {
        setStatus({ success: false })
        setErrors({ submit: err.message })
        setSubmitting(false)
      }
    }
  }

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography>Update Profile</Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          firstName: userLocal.firstName,
          lastName: userLocal.lastName,
          email: userLocal.email
        }}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().max(255).required('First Name is required'),
          lastName: Yup.string().max(255).required('Last Name is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required')
        })}
        onSubmit={handleSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <Grid container spacing={matchDownSM ? 0 : 2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={Boolean(touched.firstName && errors.firstName)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-first-name-register">First Name</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-first-name-register"
                    name="firstName"
                    type="text"
                    value={values.firstName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </FormControl>
                {touched.firstName && errors.firstName && (
                  <FormHelperText error id="standard-weight-helper-text--register">
                    {errors.firstName}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={Boolean(touched.lastName && errors.lastName)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-last-name-register">Last Name</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-last-name-register"
                    name="lastName"
                    type="text"
                    value={values.lastName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </FormControl>
                {touched.lastName && errors.lastName && (
                  <FormHelperText error id="standard-weight-helper-text--register">
                    {errors.lastName}
                  </FormHelperText>
                )}
              </Grid>
            </Grid>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email-register">Email Address</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-register"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text--register">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Update Profile
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  )
}

export default UpdateProfile
