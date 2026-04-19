import { createBrowserRouter } from "react-router-dom";
import Index from "../pages/Index";
import Login from "../pages/Login";

export const routerApp = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/index",
    element: <Index />,
  },
]);