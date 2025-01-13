import React from 'react';

const OutlineButton = ({ disabled, onClick, icon, children }) => {
	return disabled ? (
		<button disabled={true} onClick={onClick} className={`noclick-button`}>
			{children}
			<img className="h-5 mt-1 backdrop-opacity-10" src={icon} />
		</button>
	) : (
		<button onClick={onClick} className={`outline-button`}>
			{children}
			<img className={`h-5 mt-1`} src={icon} />
		</button>
	);
};

export default OutlineButton;
