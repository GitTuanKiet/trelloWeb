import SignIn from './SignIn'
import SignUp from './SignUp'

export default function Auth() {
  return (
    <div className="auth-container">
      <SignIn />
      <SignUp />
    </div>
  )
}