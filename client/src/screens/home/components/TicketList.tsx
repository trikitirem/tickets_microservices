import { useQuery } from "react-query";
import { QueryKeys, TicketsApiPaths, request } from "../../../common";
import { TicketsResponse } from "./dto";
import { TicketCard } from "./TicketCard";

export const TicketList = () => {
  const { data, isLoading, error } = useQuery(
    QueryKeys.GET_TICKETS,
    (): Promise<TicketsResponse> => request(TicketsApiPaths.TicketsIndex)
  );

  if (isLoading) {
    return <span>Loading tickets....</span>;
  }

  if (error) {
    return <span className="text-red-500">COULD_NOT_LOAD_TICKETS</span>;
  }

  if (data) {
    const { tickets } = data;

    return (
      <section>
        <h1 className="text-2xl mb-2">Tickets</h1>
        {tickets.length > 0 ? (
          <div className="grid grid-cols-3">
            {tickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ) : (
          <span className="text-2xl text-red-500">
            There are no tickets yet!
          </span>
        )}
      </section>
    );
  }

  return null;
};
