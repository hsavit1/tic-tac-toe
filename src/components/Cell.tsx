import { cn } from "@/lib/utils";
import { XMark } from "./XMark";
import { OMark } from "./OMark";
import type { CellValue } from "@/lib/ai";

interface CellProps {
  value: CellValue;
  index: number;
  isWinning: boolean;
  disabled: boolean;
  onClick: () => void;
}

export function Cell({ value, index, isWinning, disabled, onClick }: CellProps) {
  const row = Math.floor(index / 3);
  const col = index % 3;

  return (
    <button
      onClick={onClick}
      disabled={disabled || value !== null}
      aria-label={
        value
          ? `Cell ${row + 1}, ${col + 1}: ${value}`
          : `Cell ${row + 1}, ${col + 1}: empty`
      }
      className={cn(
        "relative flex items-center justify-center aspect-square rounded-xl transition-all duration-200 cursor-pointer",
        "min-h-[5.5rem] min-w-[5.5rem] sm:min-h-24 sm:min-w-24",
        "bg-white/[0.03] border border-white/[0.08]",
        "hover:bg-white/[0.08] hover:border-white/20 hover:scale-[1.03]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
        "active:scale-[0.97]",
        "disabled:cursor-default disabled:hover:scale-100 disabled:hover:bg-white/[0.03] disabled:hover:border-white/[0.08]",
        isWinning && "bg-emerald-500/10 border-emerald-400/30 winning-cell",
        value === "X" && !isWinning && "bg-sky-500/[0.06] border-sky-400/20",
        value === "O" && !isWinning && "bg-orange-500/[0.06] border-orange-400/20",
      )}
    >
      {value === "X" && <XMark isWinning={isWinning} />}
      {value === "O" && <OMark isWinning={isWinning} />}
      {!value && !disabled && (
        <span className="absolute inset-0 flex items-center justify-center text-white/[0.06] text-2xl font-bold select-none pointer-events-none">
          {index + 1}
        </span>
      )}
    </button>
  );
}
