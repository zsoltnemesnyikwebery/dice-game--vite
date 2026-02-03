import { motion } from "framer-motion";

import type { Game } from "@/models/interfaces";

import { Button } from "@/components/ui/button";
import Dices from "@/components/Dices";
import PlayerCard from "@/components/PlayerCard";
import TotalScore from "@/components/TotalScore";

interface Props {
    game: Game;
    handleRoll: () => void;
    handleSkip: () => void;
    isLocked?: boolean;
}

const GameBoard = ({ game, handleRoll, handleSkip, isLocked }: Props) => {
    return (
        <div className="w-full p-12 md:p-24 border rounded-4xl flex flex-col gap-6 items-center">
            {/* Total Score */}
            <TotalScore scores={{
                player1: game.players[0].score.total,
                player2: game.players[1].score.total,
            }} />

            <div
                className={`grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-[1fr_3fr_1fr] gap-5 transition-all
                    ${isLocked ? "opacity-50 pointer-events-none" : "opacity-100 pointer-events-auto"}
                `}
            >
                {game.players.map((player) => (
                    <PlayerCard key={player.id} {...player} />
                ))}

                {game.players.map(player =>
                    player.actions.celebration &&
                    player.rolls?.map((value, i) => (
                        <motion.div
                            key={player.id + "fly" + i}
                            className="absolute z-50 text-xl font-bold"
                            initial={{
                                top: "50%",
                                left: "50%",
                                opacity: 1,
                                scale: 1,
                            }}
                            animate={{
                                top: player.isActive ? "30%" : "70%", // ide később ref
                                left: player.isActive ? "80%" : "20%",
                                opacity: 0,
                                scale: 0.5,
                            }}
                            transition={{
                                delay: 1.5 + i * 0.3,
                                duration: 1,
                                ease: "easeInOut",
                            }}
                        >
                            {value}
                        </motion.div>
                    ))
                )}

                <div className="flex flex-col items-center gap-5 max-sm:self-center  col-start-2 row-span-full">
                    <Dices
                        rollValues={game.players.find((p) => p.isActive)?.rolls}
                        actions={game.players.find((p) => p.isActive)?.actions || {}}
                    />
                    <div className="flex flex-col gap-4">
                        <Button
                            onClick={handleRoll}
                            disabled={isLocked}
                        >
                            Roll
                        </Button>

                        {game.players.find((p) => p.isActive)?.rolls && (
                            <Button
                                variant="outline"
                                onClick={handleSkip}
                                disabled={isLocked}
                            >
                                Skip
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default GameBoard