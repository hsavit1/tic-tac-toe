import { Button } from "@/components/ui/button";
import { useGameStore } from "@/store/gameStore";
import { RotateCcw } from "lucide-react";

export function ResetButton() {
  const resetGame = useGameStore((s) => s.resetGame);
  const isGameOver = useGameStore((s) => s.isGameOver);

  return (
    <Button
      onClick={resetGame}
      variant={isGameOver ? "primary" : "default"}
      className="gap-2"
      aria-label="Reset game"
    >
      <RotateCcw className="h-4 w-4" />
      {isGameOver ? "Play Again" : "Reset"}
    </Button>
  );
}
