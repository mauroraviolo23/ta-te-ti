import ResetSVG from "../../public/img/reload-svgrepo-com.svg";

export function ResetGame({ resetGame }) {
	return (
		<div className="square config" onClick={resetGame}>
			<img src={ResetSVG} alt="" />
		</div>
	);
}
