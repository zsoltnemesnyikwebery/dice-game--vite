import { motion } from "framer-motion";

import type { Game } from "@/models/interfaces";
import { Button } from "@/components/ui/button";
import Dices from "@/components/Dices";
import PlayerCard from "@/components/PlayerCard";
import TotalScore from "@/components/TotalScore";
import type { Player } from "@/models/types";

interface Props {
    game: Game;
    activePlayer?: Player | undefined;
    handleRoll: () => void;
    handleSkip: () => void;
    isLocked?: boolean;
}

const GameBoard = ({ game, handleRoll, handleSkip, isLocked, activePlayer }: Props) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="glassmorph w-full p-6 md:p-12 lg:p-24 border rounded-4xl flex flex-col gap-6 items-center">
            <TotalScore
                scores={{
                    player1: game.players[0].score.total,
                    player2: game.players[1].score.total,
                }}
            />

            <div className="w-full grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-[1fr_3fr_1fr] gap-5 transition-all relative">
                {/* PlayerCards */}
                {game.players.map((player) => (
                    <PlayerCard
                        key={player.id}
                        {...player}
                    />
                ))}

                {/* Dice + gombok */}
                <div
                    className="flex flex-col items-center gap-5 max-sm:self-center col-start-2 row-span-full relative"
                >
                    {activePlayer && (
                        <Dices
                            dice={activePlayer.lastDice}
                            type={activePlayer.roll?.type}
                        />
                    )}

                    <div className="flex flex-col md:flex-row gap-4">
                        <Button
                            onClick={() => {
                                handleRoll();
                            }}
                            disabled={isLocked}
                        >
                            Roll
                        </Button>

                        <Button
                            variant="outline"
                            onClick={handleSkip}
                            disabled={isLocked}
                        >
                            Skip
                        </Button>
                    </div>
                </div>

                {/* FLYING NUMBER */}
                {activePlayer?.roll?.type === "celebration" && (
                    <motion.div
                        className="fixed z-50 text-5xl font-bold text-foreground -translate-1/2"
                        initial={{
                            left: "50%",
                            top: "50%",
                            opacity: 1,
                            scale: 1,
                        }}
                        animate={{
                            left: activePlayer === game.players[0] ? "20%" : "80%",
                            top: "75%",
                            opacity: 0,
                            scale: 0.5,
                        }}
                        transition={{
                            duration: 1,
                            ease: "easeInOut",
                        }}
                    >
                        12
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default GameBoard;
