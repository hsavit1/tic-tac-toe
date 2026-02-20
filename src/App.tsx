import { Board } from "@/components/Board";
import { GameStatus } from "@/components/GameStatus";
import { ScoreBoard } from "@/components/ScoreBoard";
import { DifficultySelector } from "@/components/DifficultySelector";
import { ResetButton } from "@/components/ResetButton";
import { Confetti } from "@/components/Confetti";
import { Button } from "@/components/ui/button";
import { useGameStore } from "@/store/gameStore";
import { Trash2 } from "lucide-react";

export default function App() {
  const resetScores = useGameStore((s) => s.resetScores);

  return (
    <>
      <div className="ambient-bg" />
      <Confetti />

      <main className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-4 py-8 sm:py-12">
        <div className="flex w-full max-w-sm flex-col items-center gap-6">
          {/* Title */}
          <div className="flex flex-col items-center gap-1">
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Tic-Tac-Toe
            </h1>
            <p className="text-sm text-white/40">You are X. Beat the AI.</p>
          </div>

          {/* Difficulty */}
          <DifficultySelector />

          {/* Status */}
          <GameStatus />

          {/* Board */}
          <Board />

          {/* Score */}
          <ScoreBoard />

          {/* Actions */}
          <div className="flex items-center gap-3">
            <ResetButton />
            <Button
              variant="ghost"
              size="icon"
              onClick={resetScores}
              aria-label="Reset scores"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
