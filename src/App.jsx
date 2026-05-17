import { Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import Reserva from './pages/Reserva'
import Catalogo from './pages/Catalogo'
import Login from './pages/Login'
import Registro from './pages/Registro'
import AgregarLibro from './pages/AgregarLibro'
import './App.css'

function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Index />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/registro"
        element={<Registro />}
      />

      <Route
        path="/agregar-libro"
        element={<AgregarLibro />}
      />

      <Route
        path="/Index"
        element={<Index />}
      />

      <Route
        path="/reserva"
        element={<Reserva />}
      />

      <Route
        path="/catalogo"
        element={<Catalogo />}
      />

    </Routes>

  )
}

export default App