import { useState } from "react";
import { GAME_STATUS } from "@/lib/constants";
import type { Game } from "@/models/interfaces";
import {
  checkWinner,
  createNewGame,
  endTurn,
  startGame,
  updateAfterRoll
} from "@/lib/gameUtils";

export const useGame = (playerNames: [string, string]) => {
  const [game, setGame] = useState<Game>(() =>
    createNewGame(playerNames)
  );

  const start = () => setGame(startGame);

  const roll = () => {
    // TODO: check if there is a winner
    const winner = checkWinner(game);
    if (winner) {
      setGame(prev => ({
        ...prev,
        status: GAME_STATUS.ENDED,
        winner,
      }));
      return;
    }

    setGame(prev => {
      if (prev.status !== GAME_STATUS.STARTED) return prev;
      return updateAfterRoll(prev);
    });
  };

  const skip = () =>
    setGame(prev => {
      if (prev.status !== GAME_STATUS.STARTED) return prev;
      return endTurn(prev);
    });

  return {
    game,
    start,
    roll,
    skip,
  };
};
