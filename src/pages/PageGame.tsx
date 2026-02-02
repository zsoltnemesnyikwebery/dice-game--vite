import { useEffect } from "react";
import { useGame } from "@/hooks/useGame";

import GameBoard from "@/components/GameBoard";
import Popup from "@/components/Popup";

export default function PageGame() {
    const {
        game,
        start,
        roll,
        skip,
        newRound,
        reset
    } = useGame(["Player 1", "Player 2"]);

    useEffect(() => {
        game.players.forEach(player => {
            if (player.actions.celebration) {
                console.log("🎉 CELEBRATION:", player.name);
            }

            if (player.actions.destroy) {
                console.log("💀 DESTROY:", player.name);
            }
        });
    }, [game]);

    return (
        <section className="size-full">
            {/* Game Board */}
            <GameBoard game={game} handleRoll={roll} handleSkip={skip} />

            {/* Popup */}
            <Popup
                game={game}
                handleStart={start}
                handleNewRound={newRound}
                handleReset={reset}
            />
        </section>
    );
}