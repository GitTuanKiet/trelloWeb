import { Board } from './pages/Board/board'
import { Provider } from 'react-redux'
import { store } from './redux/store'

export default function App() {
  return (
    <Provider store={store}>
      <Board />
    </Provider>
  )
}