import { useState } from "react";
import { GAME_STATUS } from "@/lib/constants";
import type { Game } from "@/models/interfaces";
import {
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

  const roll = () =>
    setGame(prev => {
      if (prev.status !== GAME_STATUS.STARTED) return prev;
      return updateAfterRoll(prev);
    });

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
