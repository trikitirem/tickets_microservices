import { createBrowserRouter } from "react-router-dom";
import { Home } from "./home";
import { Signup, Signin } from "./auth";
import { Account } from "./account";

export enum Routes {
  HOME = "/",
  SIGNIN = "/signin",
  SIGNUP = "/signup",
  ACCOUNT = "/account",
}

export const router = createBrowserRouter([
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
    path: Routes.ACCOUNT,
    element: <Account />,
  },
]);
