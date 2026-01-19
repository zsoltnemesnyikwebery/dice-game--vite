import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const RulesDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">Szabályok</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Játékszabályok</DialogTitle>
        </DialogHeader>

        <ul className="space-y-2 text-sm">
          <li>🎲 Dobáskor két kockával dobsz</li>
          <li>➕ Az értékek összeadódnak</li>
          <li>🏆 Aki előbb eléri az 50 pontot, nyer</li>
        </ul>
      </DialogContent>
    </Dialog>
  );
};
