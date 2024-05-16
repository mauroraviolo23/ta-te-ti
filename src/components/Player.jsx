export function Player({ isSelected, icon, name, score }) {
	const className = `player${isSelected ? " is-selected" : ""}`;

	return (
		<div className="player-board">
			<h3 className="player-title">{name}</h3>
			<div className={className}>
				<img src={icon} alt="" />
			</div>
			<p className="player-score">Score:</p>
			<p className="player-score-number">{score}</p>
		</div>
	);
}
