import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
          <li>🏆 Aki előbb eléri az 50 pontot, nyer</li>
        </ul>
      </DialogContent>
    </Dialog>
  );
};
