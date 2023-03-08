import { useContext } from "react";
import { UserContext } from "../../context";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Routes } from "../routes";

export const Account = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    setUser(null);
    Cookies.remove("auth");
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
      </div>
    );
  }

  return (
    <>
      <p className="py-2">Kasuj to, kasuj to z internetu</p>
    </>
  );
};
