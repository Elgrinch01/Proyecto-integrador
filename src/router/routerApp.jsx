import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Index from "../pages/Index";
import Reserva from "../pages/Reserva";

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
    path: "/reserva",
    element: <Reserva />,
  },
  {
    path: "/index",
    element: <Index />,
  },
]);