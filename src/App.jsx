import { useState } from "react";
import confetti from "canvas-confetti";

import { Square } from "./components/Square.jsx";
import { WinnerModal } from "./components/WinnerModal.jsx";
import { ResetGame } from "./components/ResetGame.jsx";
import { DERBIES, TURNS, WINNER_COMBINATIONS } from "./constants.js";
import { Player } from "./components/Player.jsx";
import { DerbyFlag } from "./components/DerbyFlag.jsx";

function App() {
	const [board, setBoard] = useState(Array(9).fill(null));
	const [turn, setTurn] = useState(() => {
		return TURNS.FIRST_PLAYER;
	});

	// null === no winner, false === draw
	const [winner, setWinner] = useState(null);
	const [score, setScore] = useState([0, 0]);

	const [derby, setDerby] = useState(DERBIES.SPAIN);

	const selectDerby = (selectedFlag) => {
		setDerby(selectedFlag);
	};

	const resetGame = () => {
		console.log("click");
		setBoard(Array(9).fill(null));
		setTurn(TURNS.FIRST_PLAYER);
		setWinner(null);
	};

	const checkEndGame = (board) => {
		return board.every((square) => square !== null);
	};

	const updateBoard = (index) => {
		if (board[index] || winner) return;

		const newBoard = [...board];
		newBoard[index] = turn;
		setBoard(newBoard);

		const newTurn =
			turn === TURNS.FIRST_PLAYER ? TURNS.SECOND_PLAYER : TURNS.FIRST_PLAYER;
		setTurn(newTurn);

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
				board[a].includes("home") ? score[0]++ : score[1]++;
				return board[a];
			}
		}
		return null;
	};

	return (
		<main className="board">
			<h1>Tic Tac Toe</h1>
			<h2>Derbies Version</h2>
			<div className="derby-selection">
				<DerbyFlag flag={DERBIES.SPAIN} selectDerby={selectDerby}></DerbyFlag>
				<DerbyFlag flag={DERBIES.URUGUAY} selectDerby={selectDerby}></DerbyFlag>
				<DerbyFlag flag={DERBIES.ARGENTINA} selectDerby={selectDerby}></DerbyFlag>
			</div>
			<div className="board-and-turns">
				<aside>
					<Player
						isSelected={turn === TURNS.FIRST_PLAYER}
						icon={TURNS.FIRST_PLAYER}
						name={derby.home}
						score={score[0]}
					>
						{TURNS.FIRST_PLAYER}
					</Player>
				</aside>
				<section className="game">
					{board.map((cell, index) => {
						return (
							<Square
								icon={cell}
								key={index}
								index={index}
								updateBoard={updateBoard}
							/>
						);
					})}
				</section>
				<aside>
					<Player
						isSelected={turn === TURNS.SECOND_PLAYER}
						icon={TURNS.SECOND_PLAYER}
						name={derby.away}
						score={score[1]}
					>
						{TURNS.SECOND_PLAYER}
					</Player>
				</aside>
			</div>
			<section className="options">
				<WinnerModal winner={winner} derby={derby} resetGame={resetGame} />
				<ResetGame resetGame={resetGame} />
			</section>
		</main>
	);
}

export default App;
