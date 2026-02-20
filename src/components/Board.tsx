import { Card, CardContent } from "@/components/ui/card";
import { Cell } from "./Cell";
import { useGameStore } from "@/store/gameStore";

export function Board() {
  const board = useGameStore((s) => s.board);
  const winningLine = useGameStore((s) => s.winningLine);
  const isGameOver = useGameStore((s) => s.isGameOver);
  const isAiThinking = useGameStore((s) => s.isAiThinking);
  const makeMove = useGameStore((s) => s.makeMove);

  return (
    <Card className="border-white/[0.08] bg-white/[0.03] p-1 sm:p-2">
      <CardContent className="p-2 sm:p-3">
        <div
          className="grid grid-cols-3 gap-2 sm:gap-3"
          role="grid"
          aria-label="Tic-Tac-Toe board"
        >
          {board.map((cell, i) => (
            <Cell
              key={i}
              value={cell}
              index={i}
              isWinning={winningLine?.includes(i) ?? false}
              disabled={isGameOver || isAiThinking}
              onClick={() => makeMove(i)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
