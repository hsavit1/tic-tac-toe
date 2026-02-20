import { cn } from "@/lib/utils";

interface OMarkProps {
  isWinning?: boolean;
}

export function OMark({ isWinning }: OMarkProps) {
  const circumference = 2 * Math.PI * 20;

  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("h-10 w-10 sm:h-12 sm:w-12", isWinning && "o-mark-win")}
      aria-hidden="true"
    >
      <circle
        cx="32"
        cy="32"
        r="20"
        fill="none"
        className={cn(
          "stroke-orange-400",
          isWinning && "stroke-emerald-400",
        )}
        strokeWidth="6"
        strokeLinecap="round"
        style={{
          filter: isWinning
            ? "drop-shadow(0 0 8px rgb(52 211 153 / 0.7))"
            : "drop-shadow(0 0 6px rgb(251 146 60 / 0.5))",
          strokeDasharray: circumference,
          strokeDashoffset: circumference,
          animation: "draw-o 0.45s ease-out forwards",
        }}
      />
    </svg>
  );
}
