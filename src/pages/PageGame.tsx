import { useGame } from "@/hooks/useGame";
import { GAME_STATUS } from "@/lib/constants";

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

    return (
        <section className="flex flex-col gap-6 items-center">
            <div className={`flex flex-col items-center gap-6 transition-opacity ${game.status === GAME_STATUS.STARTED
                ? "opacity-100"
                : "opacity-20 pointer-events-none"
                }`}>

                {/* Game Board */}
                <GameBoard game={game} handleRoll={roll} handleSkip={skip} />
            </div>

            <Popup
                game={game}
                handleStart={start}
                handleNewRound={newRound}
                handleReset={reset}
            />
        </section>
    );
}