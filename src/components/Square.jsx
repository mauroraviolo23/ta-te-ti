export function Square({ icon, updateBoard, index }) {
	const handleClick = () => {
		updateBoard(index);
	};
	return (
		<div onClick={handleClick} className="square">
			<img src={icon} alt="" />
		</div>
	);
}
