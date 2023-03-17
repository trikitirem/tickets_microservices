import { useQuery } from "react-query";
import { QueryKeys, TicketsApiPaths, request } from "../../../common";
import { MyTicektsResponse } from "../orders/dto";
import { MyTicketCard } from "./MyTicketCard";

export const GetMyTickets = () => {
  const { data } = useQuery(
    QueryKeys.GET_MY_TICKETS,
    (): Promise<MyTicektsResponse> => request(TicketsApiPaths.Index)
  );

  if (data) {
    const { tickets } = data;

    return (
      <section>
        <p className="py-2 text-2xl">My Tickets</p>
        {tickets.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {tickets.map((ticket) => (
              <MyTicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ) : (
          <p>You haven't created tickets yet</p>
        )}
      </section>
    );
  }

  return null;
};
