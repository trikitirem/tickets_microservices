import { useState } from "react";
import { Input } from "../../components";
import { useMutation } from "react-query";
import { OrdersApiPaths, QueryKeys, queryClient, request } from "../../common";
import { ApiError, ApiValidationError } from "../../models";

type Props = {
  ticketId: string;
};

export const BuyTicket = ({ ticketId }: Props) => {
  const [amount, setAmount] = useState(1);
  const [errors, setErrors] = useState<string[]>([]);
  const { mutate, isLoading } = useMutation(
    () => request(OrdersApiPaths.Index, "post", { ticketId, amount }),
    {
      onSuccess: (_) => {
        alert("Ticket has been bought!");
        queryClient.invalidateQueries(QueryKeys.GET_ORDERS);
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
    <section className="my-4">
      <h1 className="pb-4">Buy ticket</h1>
      <div className="flex gap-4">
        <Input
          name=""
          type="number"
          value={amount}
          onChange={({ target: { value } }) => setAmount(parseInt(value))}
        />
        <button disabled={isLoading} onClick={() => mutate()}>
          {isLoading ? "Loading...." : "Buy"}
        </button>
      </div>
      {errors.map((error) => (
        <p className="text-red-500 text-xs">{error}</p>
      ))}
    </section>
  );
};
3;
