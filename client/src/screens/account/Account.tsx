import { useContext, useEffect } from "react";
import { UserContext } from "../../context";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { Routes } from "../routes";
import { CreateTicket } from "./tickets";
import { QueryKeys, queryClient } from "../../common";
import { Orders } from "./orders";

export const Account = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(Routes.HOME);
    }
  }, [user]);

  const handleSignOut = () => {
    setUser(null);
    Cookies.remove("auth");
    queryClient.invalidateQueries(QueryKeys.GET_USER);
    navigate(Routes.HOME);
  };

  if (user) {
    const { email } = user;

    return (
      <div>
        <div className="flex justify-between border-b border-white py-2">
          <div className="flex gap-4 items-center">
            <Link to={Routes.HOME}>Tickets</Link>
            <p className="text-lg">{email}</p>
          </div>
          <button onClick={handleSignOut}>Sing out</button>
        </div>
        <CreateTicket />
        <Orders />
      </div>
    );
  }

  return (
    <>
      <p className="py-2">Kasuj to, kasuj to z internetu</p>
    </>
  );
};
