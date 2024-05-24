import Image from "next/image";
import Board from "../components/Board";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col px-6">
      <h1 className="font-bold mt-6 text-xl mb-6">Welcome, <span className="font-extralight">
      Wireko-Brobbey</span> </h1>

      <div>
        <Board />
      </div>
     
    </main>
  );
}
