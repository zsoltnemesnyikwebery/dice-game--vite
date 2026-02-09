import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DEFAULT_MAX_SCORE } from "@/lib/constants";

export const RulesDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="cursor-pointer hover:opacity-50">Szabályok</span>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Játékszabályok</DialogTitle>
        </DialogHeader>

        <ul className="space-y-2 text-sm">
          <li>🎲 Dobáskor két kockával dobsz</li>
          <li>➕ Az értékek összeadódnak</li>
          <li>🎉 Ha az összes kockával 6-ost dobsz, az dupla pontot ér</li>
          <li>❌ Ha az összes kockával 1-est dobsz, az összes pontszámod nullázódik</li>
          <li>🏆 Aki előbb eléri az {DEFAULT_MAX_SCORE} pontot, nyer</li>
        </ul>
      </DialogContent>
    </Dialog>
  );
};
