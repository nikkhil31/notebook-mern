import { Route, Routes } from 'react-router-dom'
import './App.css'
import PrivateOutlet from './components/PrivateOutlet'
import Login from './pages/Login'
import Notebook from './pages/Notebook'
import Register from './pages/Register'

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='*' element={<PrivateOutlet />}>
        <Route index element={<Notebook />} />
      </Route>
    </Routes>
  )
}

export default App
