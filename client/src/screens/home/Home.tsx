import { Navbar } from "../../components";
import { TicketList } from "./components/TicketList";

export const Home = () => {
  return (
    <>
      <header className="my-8">
        <p className="text-4xl">
          Welcome to the Tickets (briliant name isn't it?)
        </p>
      </header>
      <main>
        <TicketList />
      </main>
    </>
  );
};
