import { cn } from "@/lib/utils";

interface XMarkProps {
  isWinning?: boolean;
}

export function XMark({ isWinning }: XMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("h-10 w-10 sm:h-12 sm:w-12", isWinning && "x-mark-win")}
      aria-hidden="true"
    >
      <line
        x1="16"
        y1="16"
        x2="48"
        y2="48"
        className={cn(
          "stroke-sky-400",
          isWinning && "stroke-emerald-400",
        )}
        strokeWidth="6"
        strokeLinecap="round"
        style={{
          filter: isWinning
            ? "drop-shadow(0 0 8px rgb(52 211 153 / 0.7))"
            : "drop-shadow(0 0 6px rgb(56 189 248 / 0.5))",
          strokeDasharray: 45,
          strokeDashoffset: 45,
          animation: "draw-x 0.35s ease-out forwards",
        }}
      />
      <line
        x1="48"
        y1="16"
        x2="16"
        y2="48"
        className={cn(
          "stroke-sky-400",
          isWinning && "stroke-emerald-400",
        )}
        strokeWidth="6"
        strokeLinecap="round"
        style={{
          filter: isWinning
            ? "drop-shadow(0 0 8px rgb(52 211 153 / 0.7))"
            : "drop-shadow(0 0 6px rgb(56 189 248 / 0.5))",
          strokeDasharray: 45,
          strokeDashoffset: 45,
          animation: "draw-x 0.35s ease-out 0.1s forwards",
        }}
      />
    </svg>
  );
}
