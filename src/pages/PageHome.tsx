import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function PageHome() {
  return (
    <section className="flex gap-y-10 gap-x-5 h-full flex-wrap justify-center p-24 text-center">
      <h1 className="text-3xl font-bold w-full">
        Hello, this is a JS based dice game app! Feel free to play!
      </h1>
      <Button className="mt-4" variant="default" asChild>
        <Link to="/game">Play</Link>
      </Button>
    </section>
  );
}
