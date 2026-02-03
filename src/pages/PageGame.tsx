import { useEffect, useState } from "react";
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

    const activePlayer = game.players.find(p => p.isActive);
    const celebration = activePlayer?.actions.celebration;

    const [isLocked, setIsLocked] = useState<boolean | undefined>(false)

    useEffect(() => {

        if (!celebration) return;

        const lockTimer = setTimeout(() => {
            setIsLocked(true);
        }, 0);

        const unlockTimer = setTimeout(() => {
            setIsLocked(false);
            clearActions();
        }, 2000);

        return () => {
            clearTimeout(lockTimer);
            clearTimeout(unlockTimer);
        };
    }, [celebration, clearActions]);


    return (
        <section className="size-full">
            {/* Game Board */}
            <GameBoard game={game} handleRoll={roll} handleSkip={skip} isLocked={isLocked} activePlayer={activePlayer} />

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