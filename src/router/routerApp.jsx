import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Index from "../pages/Index";
import Reserva from "../pages/Reserva";
import Catalogo from "../pages/Catalogo";
import Registro from "../pages/Registro";
import AgregarLibro from "../pages/AgregarLibro";

export const routerApp = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registro",
    element: <Registro />,
  },
  {
    path: "/agregar-libro",
    element: <AgregarLibro />,
  },
  {
    path: "/reserva",
    element: <Reserva />,
  },
  {
    path: "/index",
    element: <Index />,
  },
  {
    path: "/catalogo",
    element: <Catalogo />,
  },
]);