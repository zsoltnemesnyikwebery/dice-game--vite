import { useState } from "react";
import type { Game } from "@/models/interfaces";
import {
  createNewGame,
  startGame,
} from "@/lib/gameUtils";

export const useGame = (playerNames: [string, string]) => {
  // Init new game
  const [game, setGame] = useState<Game>(() =>
    createNewGame(playerNames)
  );

  const start = () => setGame(startGame);

  return {
    game,
    start,
  };
};
