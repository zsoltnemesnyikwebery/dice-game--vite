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
      transition={{ duration: .5, ease: "easeOut" }}
      className="sticky top-0 w-full py-4"
    >
      <div className="container mx-auto flex items-center justify-between">
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
      </div>
    </motion.header>
  );
};
