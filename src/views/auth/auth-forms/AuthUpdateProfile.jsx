import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

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
import ImageUpload from '~/components/imageUpload'
import User1 from '~/assets/images/users/user-round.svg'
import { API_HOST } from '~/utils/constants'

const UpdateProfile = ({ ...others }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const theme = useTheme()
  const scriptedRef = useScriptRef()
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'))
  const { user, error } = useSelector((state) => state.auth)
  let userLocal = JSON.parse(localStorage.getItem('user'))
  const avatar = userLocal.avatar ? API_HOST + userLocal.avatar : User1
  const [images, setImages] = useState([avatar])

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  const handleSubmit = async (values, { setErrors, setStatus, setSubmitting }) => {
    if (values.firstName === userLocal.firstName &&
      values.lastName === userLocal.lastName &&
      values.email === userLocal.email &&
      images.length === 0) {
      toast.error('You have not made any changes!')
      return
    }
    try {
      if (scriptedRef.current) {
        const formData = new FormData()
        formData.append('firstName', values.firstName)
        formData.append('lastName', values.lastName)
        formData.append('email', values.email)
        if (images.length === 1) formData.append('avatar', images[0])
        dispatch(updateProfile(formData)).then((response) => {
          if (response.payload) {
            toast.error(response.payload)
            return
          }
          setStatus({ success: true })
          setSubmitting(false)
          if (user) userLocal = user
          toast.success('Update Successfully ! You are ' + userLocal.firstName + ' ' + userLocal.lastName)
          navigate('/board')
        })
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
          <Typography variant="h4">Avatar</Typography>
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
              <Grid item xs={12}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <ImageUpload
                    id="outlined-adornment-avatar"
                    name="avatar"
                    type="avatar"
                    images={images}
                    src={avatar}
                    setImages={setImages}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={Boolean(touched.firstName && errors.firstName)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-first-name">First Name</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-first-name"
                    name="firstName"
                    type="text"
                    value={values.firstName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </FormControl>
                {touched.firstName && errors.firstName && (
                  <FormHelperText error id="standard-weight-helper-text">
                    {errors.firstName}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={Boolean(touched.lastName && errors.lastName)} sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-last-name">Last Name</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-last-name"
                    name="lastName"
                    type="text"
                    value={values.lastName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </FormControl>
                {touched.lastName && errors.lastName && (
                  <FormHelperText error id="standard-weight-helper-text">
                    {errors.lastName}
                  </FormHelperText>
                )}
              </Grid>
            </Grid>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-email">Email Address</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text">
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
