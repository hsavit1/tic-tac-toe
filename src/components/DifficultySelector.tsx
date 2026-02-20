import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useGameStore } from "@/store/gameStore";
import type { Difficulty } from "@/lib/ai";

export function DifficultySelector() {
  const difficulty = useGameStore((s) => s.difficulty);
  const setDifficulty = useGameStore((s) => s.setDifficulty);

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-[11px] font-medium uppercase tracking-wider text-white/40">
        Difficulty
      </span>
      <ToggleGroup
        type="single"
        value={difficulty}
        onValueChange={(val) => {
          if (val) setDifficulty(val as Difficulty);
        }}
        aria-label="Select difficulty"
      >
        <ToggleGroupItem value="easy" aria-label="Easy difficulty">
          Easy
        </ToggleGroupItem>
        <ToggleGroupItem value="medium" aria-label="Medium difficulty">
          Medium
        </ToggleGroupItem>
        <ToggleGroupItem value="hard" aria-label="Hard difficulty">
          Hard
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
