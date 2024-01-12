import Home from './Home'
import ForgotPassword from './ForgotPassword'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Terms from './Terms'
import Privacy from './Privacy'
import { Routes, Route } from 'react-router-dom'

export default function Auth() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
    </Routes>
  )
}