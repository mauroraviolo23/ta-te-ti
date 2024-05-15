import { useState } from "react";
import confetti from "canvas-confetti";

import { Square } from "./components/Square.jsx";
import { WinnerModal } from "./components/WinnerModal.jsx";
import { Config } from "./components/Config.jsx";
import { ResetGame } from "./components/ResetGame.jsx";
import { TURNS, WINNER_COMBINATIONS } from "./constants.js";

function App() {
	const [board, setBoard] = useState(() => {
		const gameInProgressFromStorage = window.localStorage.getItem("board");
		return gameInProgressFromStorage
			? JSON.parse(gameInProgressFromStorage)
			: Array(9).fill(null);
	});
	const [turn, setTurn] = useState(() => {
		const turnForGameInProgress = window.localStorage.getItem("turn");
		return turnForGameInProgress ?? TURNS.X;
	});

	// null === no winner, false === draw
	const [winner, setWinner] = useState(null);

	const resetGame = () => {
		setBoard(Array(9).fill(null));
		setTurn(TURNS.X);
		setWinner(null);

		window.localStorage.removeItem("board");
		window.localStorage.removeItem("turn");
	};

	const checkEndGame = (board) => {
		return board.every((square) => square !== null);
	};

	const updateBoard = (index) => {
		if (board[index] || winner) return;

		const newBoard = [...board];
		newBoard[index] = turn;
		setBoard(newBoard);

		const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
		setTurn(newTurn);

		window.localStorage.setItem("board", JSON.stringify(newBoard));
		window.localStorage.setItem("turn", newTurn);

		const newWinner = checkWinner(newBoard);
		if (newWinner) {
			confetti();
			setWinner(newWinner);
		} else if (checkEndGame(newBoard)) {
			setWinner(false);
		}
	};

	const checkWinner = (board) => {
		for (const combination of WINNER_COMBINATIONS) {
			const [a, b, c] = combination;
			if (board[a] && board[a] === board[b] && board[a] === board[c]) {
				return board[a];
			}
		}
		return null;
	};

	return (
		<main className="board">
			<h1>Tic Tac Toe</h1>
			<div className="board-and-turns">
				<aside className="turn">
					<Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
				</aside>
				<section className="game">
					{board.map((cell, index) => {
						return (
							<Square key={index} index={index} updateBoard={updateBoard}>
								{cell}
							</Square>
						);
					})}
				</section>
				<aside className="turn">
					<Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
				</aside>
			</div>
			<section className="options">
				<WinnerModal winner={winner} />
				<ResetGame resetGame={resetGame} />
				<Config />
			</section>
		</main>
	);
}

export default App;
