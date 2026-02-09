import { motion } from "framer-motion"
import type { DiceValue, RollType } from "@/models/types"

interface Props {
  value?: DiceValue;
  type?: RollType;
}

const Dice = ({ value, type = "normal" }: Props) => {
  const isDestroy = type === "destroy"
  const isCelebration = type === "celebration"

  const animate = isDestroy
    ? {
      x: [0, -4, 4, -6, 6, -4, 4, -2, 2, 0],
      y: [0, -2, 2, 2, -2, 2, -2, 1, -1, 0],
      rotate: [0, -2, 2, -3, 3, -2, 2, -1, 1, 0],
      scale: [1, 0.95, 1],
    }
    : { x: 0, y: 0, rotate: 0, scale: 1 }

  const baseClasses =
    "size-[clamp(5rem,15vw,10rem)] rounded-xl shadow-lg flex items-center justify-center text-[clamp(3rem,8vw,5rem)] font-bold"

  const stateClasses = isCelebration
    ? "bg-yellow-400 text-black shadow-yellow-300/50 shadow-xl"
    : isDestroy
      ? "bg-red-500/25 text-white"
      : "bg-white text-black"

  return (
    <motion.div
      animate={animate}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`${baseClasses} ${stateClasses}`}
    >
      {value ?? "?"}
    </motion.div>
  )
}

export default Dice
