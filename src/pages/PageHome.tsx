import { Button } from "@/components/ui/button";

export default function PageHome() {
  return (
    <main className="container mx-auto px-5 flex min-h-screen flex-col items-center justify-center">
      <section className="flex gap-y-10 gap-x-5 h-full flex-wrap justify-center p-24">
        <h1 className="text-3xl font-bold w-full">Hello, this is a JS based dice game app! Feel free to play!</h1>
        <Button className="mt-4" variant="default" asChild>
          <a href="/game">Play</a>
        </Button>
      </section>
    </main>
  )
}