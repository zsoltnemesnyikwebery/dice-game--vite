interface GradientBackgroundProps {
  colors: [string, string];
}

export default function GradientBackground({ colors }: GradientBackgroundProps) {
  return (
    <div
        className={`
            fixed inset-0 z-0 w-screen h-screen overflow-hidden
            bg-size-[180%_180%]
            will-change-transform
            animate-[slowPulse_28s_ease-in-out_infinite]
        `}
        style={{
            backgroundImage: `radial-gradient(circle at 30% 70%, ${colors[0]}, transparent 40%, ${colors[1]} 80%)`,
        }}
    />
  );
}