import { useGame } from "@/hooks/useGame";
import { GAME_STATUS } from "@/lib/constants";

import { Button } from "@/components/ui/button";
import Dice from "@/components/Dice";
import PlayerCard from "@/components/PlayerCard";
import Popup from "@/components/Popup";

export default function PageGame() {
    const {
        game,
        start,
    } = useGame(["Player 1", "Player 2"]);

    console.log("Game State:", game);

    return (
        <section className="flex flex-col gap-6 items-center">
            <h1 className="text-2xl font-bold">🎲 Dice Game</h1>

            {/* Total Score */}
            <p>
                {game.players[0].score.total} :{" "}
                {game.players[1].score.total}
            </p>

            {/* Player Cards */}
            <div
                className={`grid grid-cols-[1fr_3fr_1fr] gap-5 transition-all ${game.status === GAME_STATUS.STARTED
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
            >
                {game.players.map((player) => (
                    <PlayerCard key={player.id} {...player} />
                ))}

                <div className="flex flex-col items-center gap-5 col-start-2 row-span-full">
                    <Dice />

                    <Button>Roll</Button>

                    {game.players.find((p) => p.isActive)?.rolls && (
                        <Button variant="outline">
                            Skip
                        </Button>
                    )}
                </div>
            </div>

            <Popup
                game={game}
                handleStart={start}
            />
        </section>
    );
}
