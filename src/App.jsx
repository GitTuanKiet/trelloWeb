import { Provider } from 'react-redux'
import { store } from './redux/store'
import Pages from './pages'

export default function App() {
  return (
    <Provider store={store}>
      <Pages />
    </Provider>
  )
}