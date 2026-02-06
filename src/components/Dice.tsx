import type { DiceValue, RollType } from "@/models/types"

interface Props {
  value?: DiceValue;
  type?: RollType;
}

const Dice = ({ value, type = "normal" }: Props) => {
  return (
    <div>
      <div className={`w-16 h-16 rounded-xl shadow-lg flex items-center justify-center text-2xl font-bold ${
        type === "celebration"
          ? "bg-yellow-400 text-black shadow-yellow-300/50 shadow-xl"
          : type === "destroy"
          ? "bg-red-500 text-white"
          : "bg-foreground text-background"
      }`}>
        {value ? value : (
          '?'
        )}
      </div>
    </div>
  )
}
export default Dice