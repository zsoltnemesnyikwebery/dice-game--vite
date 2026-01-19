import { motion } from "framer-motion";
import { RulesDialog } from "@/components/DialogRules";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-between px-6 py-4 border-b border-zinc-800"
    >
      {/* Logo */}
      <div className="font-bold text-lg">
        🎲 Dice Game
      </div>

      {/* Menu */}
      <div className="flex items-center gap-2">
        <RulesDialog />

        <Button variant="ghost" onClick={toggleTheme}>
          {theme === "dark" ? "🌙" : "☀️"}
        </Button>
      </div>
    </motion.header>
  );
};
