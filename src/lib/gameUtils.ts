import type { Game } from "@/models/interfaces";
import { v4 as uuidv4 } from "uuid";
import {
    DEFAULT_SCORE,
} from "@/lib/constants";
import type { DiceRoll } from "@/models/types";

/** INIT NEW GAME */
export const createNewGame = (playerNames: [string, string]): Game => ({
    players: playerNames.map((name, i) => ({
        id: undefined,
        name,
        avatar: undefined,
        color: i === 0 ? "blue" : "red",
        isActive: i === 0,
        rolls: undefined,
        score: {
            current: DEFAULT_SCORE,
            total: DEFAULT_SCORE,
        },
    })),
    status: "not_started",
    winner: null,
});

/** START THE GAME */
export const startGame = (game: Game): Game => ({
    ...game,
    players: game.players.map((player, i) => ({
        ...player,
        id: uuidv4(),
        avatar: `https://picsum.photos/300?random=${i}`,
    })),
    status: "in_progress",
});

/** ROLL THE DICE */
export const rollDice = (): DiceRoll => [
    Math.floor(Math.random() * 6) + 1,
    Math.floor(Math.random() * 6) + 1,
];

export const updateAfterRoll = (game: Game): Game => {
  const rollResult = rollDice();
  const rollScore = rollResult[0] + rollResult[1];

  const activeIndex = game.players.findIndex(p => p.isActive);

  const players = game.players.map((player, i) =>
    i === activeIndex
      ? {
          ...player,
          rolls: rollResult,
          score: {
            ...player.score,
            current: player.score.current + rollScore,
          },
        }
      : player
  );

  return {
    ...game,
    players,
  };
};
