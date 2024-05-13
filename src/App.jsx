import { useState } from "react";

const TURNS = {
	X: "x",
	O: "o",
};

const Square = ({ children, isSelected, updateBoard, index }) => {
	const className = `square ${isSelected ? "is-selected" : ""}`;

	const handleClick = () => {
		updateBoard(index);
	};
	return (
		<div onClick={handleClick} className={className}>
			{children}
		</div>
	);
};

const winnerCombinations = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

function App() {
	const [board, setBoard] = useState(Array(9).fill(null));
	const [turn, setTurn] = useState(TURNS.X);
	// null === no winner, false === draw
	const [winner, setWinner] = useState(null);

	const updateBoard = (index) => {
		if (board[index] || winner) return;

		const newBoard = [...board];
		newBoard[index] = turn;
		setBoard(newBoard);

		const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
		setTurn(newTurn);

		const newWinner = checkWinner(newBoard);
		newWinner ? setWinner(newWinner) : newWinner;
	};

	const checkWinner = (board) => {
		for (const combination of winnerCombinations) {
			const [a, b, c] = combination;
			if (board[a] && board[a] === board[b] && board[a] && board[c]) {
				return board[a];
			}
		}
		return null;
	};
	return (
		<main className="board">
			<h1>Tic Tac Toe</h1>
			<section className="game">
				{board.map((cell, index) => {
					return (
						<Square key={index} index={index} updateBoard={updateBoard}>
							{cell}
						</Square>
					);
				})}
			</section>
			<section className="turn">
				<Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
				<Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
			</section>
			{winner !== null && (
				<section className="winner">
					<div className="text">
						<h2>{winner === false ? "Empate" : "Ganó: "}</h2>
						<header className="win">{winner && <Square>{winner}</Square>}</header>
						<footer>
							<button>Reiniciar el juego</button>
						</footer>
					</div>
				</section>
			)}
		</main>
	);
}

export default App;
