import Image from "next/image";
import Board from "../components/Board";
import Welcome from "../components/Welcome";

export default function Home() {
  // const result = 
  return (
    <main className="flex flex-col px-6 mt-16 w-fit">
      <Welcome />

      <div>
        <Board />
      </div>
    </main>
  );
}
