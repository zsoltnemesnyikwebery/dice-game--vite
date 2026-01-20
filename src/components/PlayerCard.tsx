import type { Player } from "@/models/types";

export default function PlayerCard({
    name,
    avatar,
    color,
    isActive,
    score,
}: Player) {
    return (
        <div
            className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl relative transition-all ${
                isActive ? "before:bg-red-500 before:size-5 before:absolute before:rounded-full before:-top-5 before:left-1/2 before:-translate-1/2 before:content-['']" : "opacity-30"
            }`}
            style={{ backgroundColor: color }}
        >
            <img
                src={avatar}
                alt={name}
                width={100}
                height={100}
                className="rounded-full"
            />
            <h2 className="font-bold text-lg">{name}</h2>
            <p className="text-2xl font-mono">{score.current}</p>
        </div>
    );
}
