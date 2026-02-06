import { useActionLock } from "@/hooks/useActionLock";
import { useGame } from "@/hooks/useGame";

import GameBoard from "@/components/GameBoard";
import Popup from "@/components/Popup";
import GradientBackground from "@/components/GradientBackground";

export default function PageGame() {
    const {
        game,
        start,
        roll,
        applyRoll,
        skip,
        newRound,
        reset,
    } = useGame(["Player 1", "Player 2"]);
    const activePlayer = game.players.find(p => p.isActive);
    
    const handleLockComplete = () => {
        if (!activePlayer?.roll) return;

        applyRoll();

        if (activePlayer.roll.type === "destroy") {
            skip();
        }
    };
    
    const isLocked = useActionLock({
        isActive: !!activePlayer?.roll,
        duration: 500,
        onComplete: handleLockComplete,
    });

    return (
        <section className="size-full">
            <GradientBackground colors={["#0000ff", "#ff0000"]} />

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