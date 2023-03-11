import { useContext } from "react";
import { Link } from "react-router-dom";
import { Routes } from "../../screens";
import { UserContext } from "../../context";
import { useQuery } from "react-query";
import { UsersApiPaths, request, QueryKeys } from "../../common";
import { CurrentUser } from "./dto";
import Cookies from "js-cookie";

export const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const authCookie = Cookies.get("auth");

  useQuery<CurrentUser>(
    QueryKeys.GET_USER,
    () => request(UsersApiPaths.CurrentUser),
    {
      onSuccess: (data) => setUser(data.currentUser),
      enabled: !user && authCookie !== undefined,
    }
  );

  return (
    <nav className="flex justify-between items-center border-b border-white py-2">
      <Link to={Routes.HOME} className="font-medium">
        Tickets
      </Link>

      {user ? (
        <Link to={Routes.ACCOUNT}>Account</Link>
      ) : (
        <div className="flex gap-2">
          <Link to={Routes.SIGNIN}>Sign in</Link>
          <Link to={Routes.SIGNUP}>Sign up</Link>
        </div>
      )}
    </nav>
  );
};
