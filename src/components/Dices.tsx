import type { DiceValue } from "@/models/types"
import Dice from "./Dice"

interface Props {
    rollValues: DiceValue[] | undefined
}

const Dices = ({ rollValues }: Props) => {
    const diceCount = rollValues?.length ?? 2;

    return (
        <div className="flex max-sm:flex-col max-sm:gap-2 gap-8">
            {Array.from({ length: diceCount }).map((_, i) => (
                <Dice key={i} value={rollValues?.[i]} />
            ))}
        </div>
    )
}
export default Dices