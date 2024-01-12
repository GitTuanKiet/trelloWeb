import { Routes, Route } from 'react-router-dom'
import { Board as _id } from './_id'

export default function Board() {
  return (
    <Routes>
      <Route path="/" element={<_id />} />
    </Routes>
  )
}