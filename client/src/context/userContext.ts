import { createContext } from "react";
import { User } from "../models/User";

type UserContext = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const UserContext = createContext<UserContext>({
  user: null,
  setUser: () => {},
});
