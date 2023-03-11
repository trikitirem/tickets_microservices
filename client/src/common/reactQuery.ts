import { QueryClient } from "react-query";

export const queryClient = new QueryClient();

export const QueryKeys = {
  GET_USER: "GET_USER",
  GET_TICKETS: "GET_TICKETS",
  GET_MY_TICKETS: "GET_MY_TICKETS",
  GET_TICKET: (id: string) => ["GET_TICKET", id],
};
