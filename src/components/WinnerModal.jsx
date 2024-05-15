import { ResetGame } from "./ResetGame.jsx";
import { Square } from "./Square.jsx";

export function WinnerModal({ winner }) {
	if (winner === null) return null;

	const winnerText = winner === false ? "Empate" : "Ganó: ";
	return (
		<section className="winner">
			<div className="text">
				<h2>{winnerText}</h2>
				<header className="win">{winner && <Square>{winner}</Square>}</header>
				<footer>
					<ResetGame />
				</footer>
			</div>
		</section>
	);
}
