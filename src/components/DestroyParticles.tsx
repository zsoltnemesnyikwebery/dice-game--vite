/* eslint-disable react-hooks/purity */
import { motion } from "framer-motion";

export function DestroyParticles() {
  return (
    <>
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          initial={{
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
          }}
          animate={{
            x: Math.random() * 160 - 80,
            y: Math.random() * 160 - 80,
            scale: 0,
            opacity: 0,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          style={{
            width: 8 + Math.random() * 8,
            height: 8 + Math.random() * 8,
            background: `hsl(${Math.random() * 360}, 80%, 60%)`,
          }}
        />
      ))}
    </>
  );
}
