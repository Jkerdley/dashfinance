import React from 'react';
import './styles/buttons-style.css';

export const WideOperationsButton = ({ disabled, onClick, icon, alt, children, color }) => {
	return disabled ? (
		<button disabled="true" className={`noclick wide-operation-button`}>
			{children}
			{/* <img className="h-6" src={icon} alt={alt} /> */}
		</button>
	) : (
		<button onClick={onClick} className={`wide-operation-button ${color}`}>
			{children}
			{/* <img className={`h-6`} src={icon} alt={alt} /> */}
		</button>
	);
};
