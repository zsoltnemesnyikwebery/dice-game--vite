import type { DiceValue, RollType } from "@/models/types"

interface Props {
  value?: DiceValue;
  type?: RollType;
}

const Dice = ({ value, type = "normal" }: Props) => {
  return (
    <div className={`size-[clamp(5rem,15vw,10rem)] rounded-xl shadow-lg bg-white text-black flex items-center justify-center text-[clamp(3rem,8vw,5rem)] font-bold 
      ${type === "celebration"
        ? "bg-yellow-400 text-black shadow-yellow-300/50 shadow-xl"
        : type === "destroy"
          ? "bg-red-500 text-white"
          : "bg-foreground text-background"
      }`}>
      {value ? value : (
        '?'
      )}
    </div>
  )
}
export default Dice