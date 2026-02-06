import type { Player, RollType } from "@/models/types"
import Dice from "./Dice"
import { DICE_COUNT } from "@/lib/constants";

interface Props {
    dice: Player["lastDice"];
    type?: RollType;
}

const Dices = ({ dice, type }: Props) => {
    return (
        <div className="flex max-sm:flex-col max-sm:gap-2 gap-8">
            {Array.from({ length: DICE_COUNT }).map((_, i) => (
                <Dice
                    key={i}
                    value={dice?.[i]}
                    type={type}
                />
            ))}
        </div>
    );
};

export default Dices;
