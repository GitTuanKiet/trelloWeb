import * as jose from 'jose'
const { JWT } = jose

export const generateToken = (user) => {
  return JWT.sign(user, import.meta.env.SECRET_KEY, {
    expiresIn: '1d',
    algorithm: 'HS256'
  })
}

export const setProfile = (user) => {
  localStorage.setItem('user', JSON.stringify(user))
}

export const setTokenJWT = (token) => {
  localStorage.setItem('token', token)
}

export const getTokenJWT = () => {
  return localStorage.getItem('token')
}

export const removeTokenJWT = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

export const isAuth = () => {
  return getTokenJWT() !== null
}
