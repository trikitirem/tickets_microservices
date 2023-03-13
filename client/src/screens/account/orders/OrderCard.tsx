import { Order } from "./dto";
import { formatDate } from "../../../common";

type Props = {
  order: Order;
};

export const OrderCard = ({
  order: { amount, due, ticketId, createdAt },
}: Props) => {
  return (
    <div className="border border-dashed p-4">
      <p>Ticket: {ticketId}</p>
      <p>Amount: {amount}</p>
      <p>Due: {due}</p>
      <p>Bought: {formatDate(new Date(createdAt))}</p>
    </div>
  );
};
