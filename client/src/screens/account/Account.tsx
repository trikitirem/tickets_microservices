import { useContext, useEffect } from "react";
import { UserContext } from "../../context";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Routes } from "../routes";
import { CreateTicket } from "./tickets";
import { QueryKeys, queryClient } from "../../common";

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
          <p className="text-lg">{email}</p>
          <button onClick={handleSignOut}>Sing out</button>
        </div>
        <CreateTicket />
      </div>
    );
  }

  return (
    <>
      <p className="py-2">Kasuj to, kasuj to z internetu</p>
    </>
  );
};
