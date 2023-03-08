import { Navbar } from "../../components";
import { Tickets } from "./Tickets";

export const Home = () => {
  return (
    <>
      <Navbar />
      <header className="my-8">
        <p className="text-4xl">
          Welcome to the Tickets (briliant name isn't it?)
        </p>
      </header>
      <main>
        <Tickets />
      </main>
    </>
  );
};
