import { RouterProvider } from "react-router-dom";
import { router } from "./screens";
import { QueryClientProvider } from "react-query";
import { UserContext } from "./context";
import { useState } from "react";
import { User } from "./models/User";
import { queryClient } from "./common";

export const App = () => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <QueryClientProvider client={queryClient}>
        <div className="w-2/3 mx-auto">
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </UserContext.Provider>
  );
};
