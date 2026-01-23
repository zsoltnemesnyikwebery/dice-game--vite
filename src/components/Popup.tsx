import type { Game } from "@/models/interfaces";
import { GAME_STATUS } from "@/lib/constants";

import { Button } from "@/components/ui/button";

type Props = {
  game: Game;
  handleStart: () => void;
};

const Popup = ({ game, handleStart }: Props) => {
  const isVisible = game.status !== GAME_STATUS.STARTED;

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-10 flex flex-col items-center justify-center gap-6 bg-black/50">

      <Button onClick={handleStart}>
        Start the Game
      </Button>
    </div>
  );
};

export default Popup;
