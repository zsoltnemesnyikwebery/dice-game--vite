import { useState } from "react";
import { GAME_STATUS } from "@/lib/constants";
import type { Game } from "@/models/interfaces";
import {
  checkWinner,
  createNewGame,
  endTurn,
  startGame,
  updateAfterRoll,
  startNewRound,
} from "@/lib/gameUtils";

export const useGame = (playerNames: [string, string]) => {
  const [game, setGame] = useState<Game>(() =>
    createNewGame(playerNames)
  );

  const start = () => setGame(startGame);

  const roll = () => {
    setGame(prev => {
      if (prev.status !== GAME_STATUS.STARTED) return prev;

      const updatedGame = updateAfterRoll(prev);
      const isWinner = checkWinner(updatedGame);

      if (!isWinner) return updatedGame;
      
      return {
        ...updatedGame,
        status: GAME_STATUS.ENDED,
        winner: isWinner,
      }
    });
  };

  const skip = () =>
    setGame(prev => {
      if (prev.status !== GAME_STATUS.STARTED) return prev;
      return endTurn(prev);
    });

  const newRound = () =>
    setGame(prev => startNewRound(prev));

  return {
    game,
    start,
    roll,
    skip,
    newRound,
  };
};
