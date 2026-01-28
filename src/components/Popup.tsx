import type { Game } from "@/models/interfaces";
import { GAME_STATUS } from "@/lib/constants";

import { Button } from "@/components/ui/button";

type Props = {
  game: Game;
  handleStart: () => void;
  handleNewRound: () => void;
  handleReset: () => void;
};

const Popup = ({ game, handleStart, handleNewRound, handleReset }: Props) => {
  const isVisible = game.status !== GAME_STATUS.STARTED;
  const isFinished = game.status === GAME_STATUS.ENDED;

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-10 flex flex-col items-center justify-center gap-6 bg-black/50"
    >
      {isFinished && (
        <p className="text-center text-5xl font-light">
          Congratulations{" "}
          <span className="text-pink-700 font-extrabold">
            {game.winner?.name}
          </span>
          ! <br /> You won!
        </p>
      )}

      <Button
        onClick={
          isFinished ?
            handleNewRound : handleStart
        }
      >
        {isFinished ? "Play again" : "Start game"}
      </Button>

      {isFinished && (
        <Button
          variant="destructive"
          onClick={handleReset}
        >
          Reset game
        </Button>
      )}
    </div>
  );
};

export default Popup;
