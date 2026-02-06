import type { GAME_STATUS } from "@/lib/constants";

export type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;
export type DiceRoll = DiceValue[];
export type RollType = "normal" | "celebration" | "destroy"
export type GameStatus = typeof GAME_STATUS[keyof typeof GAME_STATUS];
export type Player = {
  id: string;
  name: string;
  avatar: string;
  color: string;
  isActive: boolean;
  roll?: {
    dice: DiceRoll;
    score: number;
    type: RollType;
  };
  score: {
    current: number;
    total: number;
  };
};