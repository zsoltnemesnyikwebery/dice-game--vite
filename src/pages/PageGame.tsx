import { useGame } from "@/hooks/useGame";

import GameBoard from "@/components/GameBoard";
import Popup from "@/components/Popup";
import { useActionLock } from "@/hooks/useActionLock";

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
    
    const handleLockComplete = () => {
        clearActions();

        if (activePlayer?.actions.destroy) skip();
    }
    
    const isLocked = useActionLock({
        actions: activePlayer?.actions,
        duration: 2000,
        onComplete: handleLockComplete,
    });

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