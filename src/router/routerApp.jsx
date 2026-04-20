import { createBrowserRouter } from "react-router-dom";
import Index from "../pages"
import Reserva from "../pages"

export const routerApp = createBrowserRouter ([
  {
    path: "/",
    element: <Reserva />,
  },
  {
    path: "/index",
    element: <Index />,
  },
]);