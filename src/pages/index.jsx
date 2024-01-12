import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Board from './Board'
import Auth from './Auth'

export default function Pages() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/trellok/auth/sign-in" />} />
        <Route path="/trellok/auth/*" element={<Auth />} />
        <Route path="/trellok/board/*" element={<Board />} />
      </Routes>
    </Router>
  )
}