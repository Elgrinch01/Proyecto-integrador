import { Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import Reserva from './pages/Reserva'
import './App.css'
import Login from './pages/Login'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Index" element={<Index />} />
      <Route path="/reserva" element={<Reserva />} />
    </Routes>
  )
}

export default App