import { useState } from "react";
import { GAME_STATUS } from "@/lib/constants";
import type { Game } from "@/models/interfaces";
import {
  checkWinner,
  createNewGame,
  endTurn,
  startGame,
  calculateScore,
  startNewRound,
  updateScore,
} from "@/lib/gameUtils";

export const useGame = (playerNames: [string, string]) => {
  const [game, setGame] = useState<Game>(() =>
    createNewGame(playerNames)
  );

  const start = () => setGame(startGame);

  const roll = () => {
    setGame(prev => {
      if (prev.status !== GAME_STATUS.STARTED) return prev;

      const updatedGame = calculateScore(prev);
      const isWinner = checkWinner(updatedGame);

      if (!isWinner) return updatedGame;

      return {
        ...updatedGame,
        status: GAME_STATUS.ENDED,
        winner: isWinner,
      }
    });
  };

  const applyRoll = () =>
    setGame(prev => updateScore(prev));

  const skip = () =>
    setGame(prev => {
      if (prev.status !== GAME_STATUS.STARTED) return prev;
      return endTurn(prev);
    });

  const newRound = () =>
    setGame(prev => startNewRound(prev));

  const reset = () =>
    setGame(createNewGame(playerNames));

  return {
    game,
    start,
    roll,
    skip,
    newRound,
    reset,
    applyRoll,
  };
};
