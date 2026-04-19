import { Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import Reserva from './pages/Reserva'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/Index" element={<Index />} />
      <Route path="/reserva" element={<Reserva />} />
    </Routes>
  )
}

export default App