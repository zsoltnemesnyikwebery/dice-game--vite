import type {DiceRoll} from "@/models/types"
import Dice from "./Dice"

interface Props {
    rollValues: DiceRoll | undefined
}

const Dices = ({ rollValues }: Props) => {
  return (
    <div className="flex gap-2">
        <Dice value={rollValues?.[0]} />
        <Dice value={rollValues?.[1]} />
    </div>
  )
}
export default Dices