import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  type Board,
  type Player,
  type Difficulty,
  checkWinner,
  isDraw,
  getAIMove,
} from "@/lib/ai";

interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player | null;
  winningLine: number[] | null;
  isGameOver: boolean;
  isDraw: boolean;
  difficulty: Difficulty;
  scores: { X: number; O: number; draws: number };
  isAiThinking: boolean;
  showConfetti: boolean;

  makeMove: (index: number) => void;
  resetGame: () => void;
  setDifficulty: (d: Difficulty) => void;
  resetScores: () => void;
}

const EMPTY_BOARD: Board = Array(9).fill(null);

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      board: [...EMPTY_BOARD],
      currentPlayer: "X",
      winner: null,
      winningLine: null,
      isGameOver: false,
      isDraw: false,
      difficulty: "medium",
      scores: { X: 0, O: 0, draws: 0 },
      isAiThinking: false,
      showConfetti: false,

      makeMove: (index: number) => {
        const state = get();
        if (
          state.board[index] ||
          state.isGameOver ||
          state.isAiThinking ||
          state.currentPlayer !== "X"
        )
          return;

        const newBoard = [...state.board];
        newBoard[index] = "X";

        const { winner, line } = checkWinner(newBoard);
        if (winner) {
          set({
            board: newBoard,
            winner,
            winningLine: line,
            isGameOver: true,
            showConfetti: true,
            scores: { ...state.scores, X: state.scores.X + 1 },
          });
          return;
        }

        if (isDraw(newBoard)) {
          set({
            board: newBoard,
            isGameOver: true,
            isDraw: true,
            scores: { ...state.scores, draws: state.scores.draws + 1 },
          });
          return;
        }

        set({
          board: newBoard,
          currentPlayer: "O",
          isAiThinking: true,
        });

        // AI move with delay for UX
        setTimeout(() => {
          const currentState = get();
          if (currentState.isGameOver) return;

          const aiMove = getAIMove(
            [...currentState.board],
            currentState.difficulty,
          );
          const aiBoard = [...currentState.board];
          aiBoard[aiMove] = "O";

          const { winner: aiWinner, line: aiLine } = checkWinner(aiBoard);
          if (aiWinner) {
            set({
              board: aiBoard,
              winner: aiWinner,
              winningLine: aiLine,
              isGameOver: true,
              isAiThinking: false,
              scores: {
                ...currentState.scores,
                O: currentState.scores.O + 1,
              },
            });
            return;
          }

          if (isDraw(aiBoard)) {
            set({
              board: aiBoard,
              isGameOver: true,
              isDraw: true,
              isAiThinking: false,
              scores: {
                ...currentState.scores,
                draws: currentState.scores.draws + 1,
              },
            });
            return;
          }

          set({
            board: aiBoard,
            currentPlayer: "X",
            isAiThinking: false,
          });
        }, 500);
      },

      resetGame: () => {
        set({
          board: [...EMPTY_BOARD],
          currentPlayer: "X",
          winner: null,
          winningLine: null,
          isGameOver: false,
          isDraw: false,
          isAiThinking: false,
          showConfetti: false,
        });
      },

      setDifficulty: (difficulty: Difficulty) => {
        set({ difficulty });
        get().resetGame();
      },

      resetScores: () => {
        set({ scores: { X: 0, O: 0, draws: 0 } });
      },
    }),
    {
      name: "tic-tac-toe-storage",
      partialize: (state) => ({
        scores: state.scores,
        difficulty: state.difficulty,
      }),
    },
  ),
);
