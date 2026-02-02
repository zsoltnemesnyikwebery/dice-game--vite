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
        reset,
        clearActions,
    } = useGame(["Player 1", "Player 2"]);

    useEffect(() => {
        let hasAction = false;

        game.players.forEach(player => {
            if (player.actions?.celebration) {
                console.log("🎉 CELEBRATION:", player.name);
                hasAction = true;
            }

            if (player.actions?.destroy) {
                console.log("💥 DESTROY:", player.name);
                hasAction = true;
            }
        });

        if (hasAction) {
            clearActions();
        }
    }, [game.players]);


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