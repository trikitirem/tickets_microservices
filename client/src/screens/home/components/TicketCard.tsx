import { Ticket } from "../../../models";
import { Link } from "react-router-dom";
import { Routes } from "../../routes";

type Props = {
  ticket: Ticket;
};

export const TicketCard = ({ ticket: { title, id } }: Props) => {
  return (
    <Link
      to={Routes.TICKET.replace(":id", id)}
      className="p-4 border border-dashed text-center cursor-pointer"
    >
      {title}
    </Link>
  );
};
