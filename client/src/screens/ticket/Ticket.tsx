import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { QueryKeys, TicketsApiPaths, formatDate, request } from "../../common";
import { Ticket as TicketModel } from "../../models";
import { BuyTicket } from "./BuyTicket";

export const Ticket = () => {
  const { id } = useParams();

  if (id) {
    return <TicketComponent id={id} />;
  }

  return null;
};

export const TicketComponent = ({ id }: { id: string }) => {
  const { data } = useQuery(
    QueryKeys.GET_TICKET(id),
    (): Promise<TicketModel> =>
      request(TicketsApiPaths.IndexWithId.replace(":id", id))
  );

  if (data) {
    const { title, createdAt, price } = data;

    return (
      <div className="my-4">
        <section className="border-b py-2">
          <h1 className="text-3xl">{title}</h1>
          <p className="text-xl">Price: {price}</p>
          <p>Created at: {formatDate(new Date(createdAt))}</p>
        </section>
        <BuyTicket ticketId={id} />
      </div>
    );
  }

  return null;
};
