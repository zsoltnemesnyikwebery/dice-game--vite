import { AnimatePresence } from "framer-motion";

import type { Player } from "@/models/types";
import { DestroyParticles } from "./DestroyParticles";

export default function PlayerCard({
    name,
    avatar,
    color,
    isActive,
    score,
    roll,
}: Player) {
    return (
        <div
            className={`playercard flex flex-col items-center justify-center gap-2 p-4 rounded-xl relative transition-all text-center ${
                isActive ? "before:bg-red-500 before:size-5 before:absolute before:rounded-full before:-left-10 sm:before:-top-5 sm:before:left-1/2 sm:before:-translate-1/2 before:content-['']" : "opacity-20"
            }`}
            data-color={color}
        >
            <img
                src={avatar}
                alt={name}
                width={100}
                height={100}
                className="rounded-full aspect-square w-auto max-h-[10vh] md:max-h-[20vh] min-h-12.5"
            />
            <h2 className="font-bold text-lg">{name}</h2>
            {/* SCORE */}
            <div
                className="relative flex flex-col items-center gap-2 p-4 rounded-xl transition-all"
            >
                <span className="relative z-10 text-2xl font-mono">
                    {score.current}
                </span>

                <AnimatePresence>
                    {roll?.type === "destroy" && (
                        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                            <DestroyParticles />
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
