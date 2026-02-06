import type { Player } from "@/models/types"
import Dice from "./Dice"

interface Props {
    roll?: Player["roll"];
}

const Dices = ({ roll }: Props) => {
    const diceCount = roll?.dice.length ?? 2;

    return (
        <div className="flex max-sm:flex-col max-sm:gap-2 gap-8">
            {Array.from({ length: diceCount }).map((_, i) => (
                <Dice
                    key={i}
                    value={roll?.dice[i]}
                    type={roll?.type}
                />
            ))}
        </div>
    );
};

export default Dices;
