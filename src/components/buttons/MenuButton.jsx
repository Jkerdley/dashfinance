export const MenuButton = ({ icon, alt, disabled }) => {
	return disabled ? (
		<button className="flex w-11 h-11 justify-center items-center bg-gray-400 rounded-2xl">
			<img className="h-6" src={icon} alt={alt} />
		</button>
	) : (
		<button className="flex w-11 h-11 justify-center items-center transition ease-in-out delay-50 hover:-translate-y-0.5 hover:scale-105 bg-gradient-to-br from-sky-500 to-blue-900 hover:bg-gradient-to-b rounded-2xl">
			<img className="h-6" src={icon} alt={alt} />
		</button>
	);
};
