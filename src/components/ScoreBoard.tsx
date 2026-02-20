import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGameStore } from "@/store/gameStore";
import { cn } from "@/lib/utils";

function ScoreItem({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: "blue" | "orange" | "muted";
}) {
  const colorMap = {
    blue: "text-sky-400",
    orange: "text-orange-400",
    muted: "text-white/50",
  };

  return (
    <div className="flex flex-col items-center gap-1 min-w-[4rem]">
      <span className="text-[11px] font-medium uppercase tracking-wider text-white/40">
        {label}
      </span>
      <span
        className={cn(
          "text-2xl font-bold tabular-nums transition-all duration-300",
          colorMap[color],
        )}
        key={value}
        style={{ animation: "score-pop 0.3s ease-out" }}
      >
        {value}
      </span>
    </div>
  );
}

export function ScoreBoard() {
  const scores = useGameStore((s) => s.scores);

  return (
    <Card className="border-white/[0.08] bg-white/[0.03]">
      <div className="flex items-center justify-center gap-4 px-6 py-4">
        <ScoreItem label="You (X)" value={scores.X} color="blue" />
        <Separator orientation="vertical" className="h-10" />
        <ScoreItem label="Draws" value={scores.draws} color="muted" />
        <Separator orientation="vertical" className="h-10" />
        <ScoreItem label="AI (O)" value={scores.O} color="orange" />
      </div>
    </Card>
  );
}
