import { useEffect, useState } from "react";
import { useGameStore } from "@/store/gameStore";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  angle: number;
  velocity: number;
  spin: number;
  delay: number;
}

const COLORS = [
  "#38bdf8", // sky-400
  "#818cf8", // indigo-400
  "#34d399", // emerald-400
  "#a78bfa", // violet-400
  "#f472b6", // pink-400
  "#fbbf24", // amber-400
  "#fb923c", // orange-400
];

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 50 + (Math.random() - 0.5) * 20,
    y: 40 + (Math.random() - 0.5) * 10,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: 4 + Math.random() * 6,
    angle: Math.random() * 360,
    velocity: 2 + Math.random() * 4,
    spin: (Math.random() - 0.5) * 720,
    delay: Math.random() * 200,
  }));
}

export function Confetti() {
  const showConfetti = useGameStore((s) => s.showConfetti);
  const winner = useGameStore((s) => s.winner);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (showConfetti && winner === "X") {
      setParticles(generateParticles(40));
      const timeout = setTimeout(() => setParticles([]), 2000);
      return () => clearTimeout(timeout);
    }
    setParticles([]);
  }, [showConfetti, winner]);

  if (particles.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => {
        const rad = (p.angle * Math.PI) / 180;
        const tx = Math.cos(rad) * p.velocity * 80;
        const ty = Math.sin(rad) * p.velocity * 80 - 100;

        return (
          <div
            key={p.id}
            className="absolute confetti-particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size * 0.6,
              backgroundColor: p.color,
              borderRadius: Math.random() > 0.5 ? "50%" : "2px",
              "--tx": `${tx}px`,
              "--ty": `${ty}px`,
              "--spin": `${p.spin}deg`,
              animationDelay: `${p.delay}ms`,
            } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
}
