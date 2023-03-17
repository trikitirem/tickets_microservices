import { useMutation } from "react-query";
import { Input } from "../../../components";
import { ApiError, ApiValidationError, Ticket } from "../../../models";
import { useState } from "react";
import { TicketsApiPaths, request } from "../../../common";

type Props = {
  ticket: Ticket;
};

export const MyTicketCard = ({ ticket }: Props) => {
  const { title, id } = ticket;
  const [price, setPrice] = useState(ticket.price);
  const [globalErrors, setErrors] = useState<string[]>([]);
  const { mutate } = useMutation(
    () =>
      request(TicketsApiPaths.IndexWithId.replace(":id", id), "put", {
        price,
        title,
      }),
    {
      onSuccess: () => {
        setErrors([]);
        alert("TICKET_UPDATED");
      },
      onError: (err) => {
        if (err instanceof ApiError) {
          setErrors(err.mapErrors());
          return;
        }

        if (err instanceof ApiValidationError) {
          setErrors(err.mapErorrsToArray());
          return;
        }

        setErrors(["SOMETHING_WENT_WRONG"]);
      },
    }
  );

  return (
    <div>
      <p className="border-b border-dashed mb-4">{title}</p>
      <p>Update price</p>
      <div>
        <Input
          type="number"
          name="price"
          value={price}
          onChange={({ target: { value } }) => setPrice(parseInt(value))}
        />
        <button onClick={() => mutate()}>Update</button>
      </div>
      {globalErrors.map((error) => (
        <p className="text-xs text-red-500">{error}</p>
      ))}
    </div>
  );
};
