import { Badge } from "@/components/ui/badge";
import { useGameStore } from "@/store/gameStore";
import { cn } from "@/lib/utils";

export function GameStatus() {
  const winner = useGameStore((s) => s.winner);
  const isDraw = useGameStore((s) => s.isDraw);
  const isAiThinking = useGameStore((s) => s.isAiThinking);
  const currentPlayer = useGameStore((s) => s.currentPlayer);

  if (winner) {
    const isPlayerWin = winner === "X";
    return (
      <div className="flex items-center justify-center gap-3 status-animate">
        <Badge variant={isPlayerWin ? "blue" : "orange"} className="text-sm px-4 py-1.5">
          {isPlayerWin ? "You win!" : "AI wins!"}
        </Badge>
      </div>
    );
  }

  if (isDraw) {
    return (
      <div className="flex items-center justify-center status-animate">
        <Badge variant="muted" className="text-sm px-4 py-1.5">
          It's a draw
        </Badge>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-3">
      <Badge
        variant={currentPlayer === "X" ? "blue" : "orange"}
        className={cn("text-sm px-4 py-1.5 transition-all duration-200", isAiThinking && "ai-thinking")}
      >
        {isAiThinking ? (
          <span className="flex items-center gap-2">
            <span className="flex gap-0.5">
              <span className="h-1 w-1 rounded-full bg-current thinking-dot" style={{ animationDelay: "0ms" }} />
              <span className="h-1 w-1 rounded-full bg-current thinking-dot" style={{ animationDelay: "150ms" }} />
              <span className="h-1 w-1 rounded-full bg-current thinking-dot" style={{ animationDelay: "300ms" }} />
            </span>
            AI thinking
          </span>
        ) : (
          "Your turn"
        )}
      </Badge>
    </div>
  );
}
