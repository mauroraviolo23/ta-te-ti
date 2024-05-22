export function WinnerModal({ winner, derby, resetGame }) {
	if (winner === null) return null;

	const winnerText = winner === false ? "Draw!" : " Wins!";
	let winnerTeam = "None";
	if (winner) {
		winnerTeam = winner.includes("home") ? derby.home : derby.away;
	}

	console.log(resetGame);

	return (
		<section className="winner">
			<div className="text">
				<header>{winner && <h1 className="winner-team">{winnerTeam}</h1>}</header>
				<h2>{winnerText}</h2>
				<button className="play-again" onClick={resetGame}>
					Play again
				</button>
			</div>
		</section>
	);
}
