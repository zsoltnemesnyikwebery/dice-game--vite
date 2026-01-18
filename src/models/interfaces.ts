import type { Player, GameStatus } from "./types";

export interface Game {
  players: Player[];
  status: GameStatus;
  winner: Player | null;
};