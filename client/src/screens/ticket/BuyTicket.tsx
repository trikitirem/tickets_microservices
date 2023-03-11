import { useState } from "react";
import { Input } from "../../components";

type Props = {
  ticketId: string;
};

export const BuyTicket = ({ ticketId }: Props) => {
  const [amount, setAmount] = useState(1);
  //TODO: make mutation to order api

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
        <button>Buy</button>
      </div>
    </section>
  );
};
