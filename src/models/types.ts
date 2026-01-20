import type { GAME_STATUS } from "@/lib/constants";

export type DiceRoll = [number, number];
export type GameStatus = typeof GAME_STATUS[keyof typeof GAME_STATUS];
export type Player = {
  id: string | undefined;
  name: string;
  avatar: string | undefined;
  color: string;
  isActive: boolean;
  rolls: DiceRoll | undefined;
  score: {
    current: number;
    total: number;
  };
};