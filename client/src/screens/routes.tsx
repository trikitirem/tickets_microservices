import { createBrowserRouter } from "react-router-dom";
import { Home } from "./home";
import { Signup, Signin } from "./auth";
import { Account } from "./account";
import { Ticket } from "./ticket";
import { MainLayout } from "./MainLayout";

export enum Routes {
  HOME = "/",
  SIGNIN = "/signin",
  SIGNUP = "/signup",
  ACCOUNT = "/account",
  TICKET = "/ticket/:id",
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: Routes.HOME,
        element: <Home />,
      },
      {
        path: Routes.SIGNUP,
        element: <Signup />,
      },
      {
        path: Routes.SIGNIN,
        element: <Signin />,
      },
      {
        path: Routes.TICKET,
        element: <Ticket />,
      },
    ],
  },
  {
    path: Routes.ACCOUNT,
    element: <Account />,
  },
]);
