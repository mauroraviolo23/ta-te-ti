export function DerbyFlag({ flag, selectDerby }) {
	const handleClick = () => {
		selectDerby(flag);
	};
	return (
		<button className="derby-flag" onClick={handleClick}>
			<img src={flag.img} alt="Country flag" className="derby-flag-img" />
		</button>
	);
}
