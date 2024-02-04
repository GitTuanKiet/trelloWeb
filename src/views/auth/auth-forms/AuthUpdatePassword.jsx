import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// material-ui
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material'

// third party
import * as Yup from 'yup'
import { Formik } from 'formik'
import { toast } from 'react-toastify'

// project imports
import useScriptRef from '~/custom/Hooks/useScriptRef'
import AnimateButton from '~/ui-component/extended/AnimateButton'
import { strengthColor, strengthIndicator } from '~/utils/password-strength'
import { updatePassword } from '~/redux/Auth/thunk'

// assets
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const AuthUpdatePassword = ({ ...others }) => {

  const theme = useTheme()
  const scriptedRef = useScriptRef()
  const dispatch = useDispatch()
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'))
  const { error } = useSelector((state) => state.auth)

  const [showPassword, setShowPassword] = useState(false)

  const [strength, setStrength] = useState(0)
  const [level, setLevel] = useState()

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  const handleShowPassword = () => {
    setShowPassword((show) => !show)
  }

  const changePassword = (value) => {
    const temp = strengthIndicator(value)
    setStrength(temp)
    setLevel(strengthColor(temp))
  }

  return (
    <Formik
      initialValues={{
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }}
      validationSchema={Yup.object().shape({
        oldPassword: Yup.string().required('Required'),
        newPassword: Yup.string().required('Required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          if (values.newPassword === values.oldPassword) {
            toast.error('New password must be different from old password')
            return
          }
          if (scriptedRef.current) {
            setStatus({ success: true })
            setSubmitting(true)
            dispatch(updatePassword(values))
          }
        } catch (err) {
          if (scriptedRef.current) {
            setStatus({ success: false })
            setErrors({ submit: err.message })
            setSubmitting(false)
          }
        }
      }}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        values,
        errors,
        touched
      }) => (
        <form noValidate onSubmit={handleSubmit} {...others}>
          <Grid container spacing={matchDownSM ? 0 : 2}>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-password">Old Password</InputLabel>
                <OutlinedInput
                  id="oldPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={values.oldPassword}
                  name="oldPassword"
                  label="Old Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.oldPassword) && Boolean(errors.oldPassword)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {Boolean(touched.oldPassword) && Boolean(errors.oldPassword) && (
                  <FormHelperText error id="standard-weight-helper-text-oldPassword">
                    {touched.oldPassword && errors.oldPassword}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                <OutlinedInput
                  id="newPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={values.newPassword}
                  name="newPassword"
                  label="New Password"
                  onChange={(e) => {
                    handleChange(e)
                    changePassword(e.target.value)
                  }}
                  onBlur={handleBlur}
                  error={Boolean(touched.newPassword) && Boolean(errors.newPassword)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {Boolean(touched.newPassword) && Boolean(errors.newPassword) && (
                  <FormHelperText error id="standard-weight-helper-text-newPassword">
                    {touched.newPassword && errors.newPassword}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                <OutlinedInput
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={values.confirmPassword}
                  name="confirmPassword"
                  label="Confirm Password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.confirmPassword) && Boolean(errors.confirmPassword)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {Boolean(touched.confirmPassword) && Boolean(errors.confirmPassword) && (
                  <FormHelperText error id="standard-weight-helper-text-confirmPassword">
                    {touched.confirmPassword && errors.confirmPassword}
                  </FormHelperText>
                )}
              </FormControl>

              {strength !== 0 && (
                <FormControl fullWidth>
                  <Box sx={{ mb: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item>
                        <Box style={{ backgroundColor: level?.color }} sx={{ width: 85, height: 8, borderRadius: '7px' }} />
                      </Grid>
                      <Grid item>
                        <Typography fontSize="0.75rem">
                          {level?.label}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </FormControl>
              )}
            </Grid>
            <Grid item xs={12}>
              <AnimateButton>
                <Button disableElevation fullWidth size="large" type="submit" variant="contained" disabled={isSubmitting}>
                  <Typography>Update Password</Typography>
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  )
}

export default AuthUpdatePassword