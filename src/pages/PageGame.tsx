import { useActionLock } from "@/hooks/useActionLock";
import { useGame } from "@/hooks/useGame";

import GameBoard from "@/components/GameBoard";
// import LightPillar from '@/components/LightPillar';
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
            {/* <div className="absolute inset-0 z-0 pointer-events-none">
                <LightPillar
                    topColor="red"
                    bottomColor="blue"
                    intensity={1}
                    rotationSpeed={0.3}
                    glowAmount={0.002}
                    pillarWidth={3}
                    pillarHeight={0.4}
                    noiseIntensity={0.5}
                    pillarRotation={25}
                    interactive={true}
                    mixBlendMode="screen"
                    quality="high"
                />
            </div> */}

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