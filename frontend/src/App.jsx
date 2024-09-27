import { Provider } from 'react-redux'
import './App.css'
import AllRoutes from './routes/AllRoutes'
import { store } from './store'

function App() {
  return (
    <Provider store={store}>
      <AllRoutes />
    </Provider>
  )
}

export default App
