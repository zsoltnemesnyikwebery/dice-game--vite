import type { DiceValue } from "@/models/types"

interface Props {
    value: DiceValue | undefined
}

const Dice = ({ value }: Props) => {
  return (
    <div>
      {value ? (
        <div className="w-15 h-15 flex items-center justify-center border-2 border-black rounded-md bg-foreground text-background text-4xl font-bold">
          {value}
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
export default Dice