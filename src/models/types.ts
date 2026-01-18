export type DiceRoll = [number, number];
export type GameStatus =  "not_started" | "in_progress" | "ended";
export type Player = {
  id: string;
  name: string;
  avatar: string;
  color: string;
  isActive: boolean;
  rolls: DiceRoll | undefined;
  score: {
    current: number;
    total: number;
  };
};