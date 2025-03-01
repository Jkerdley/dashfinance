import React from 'react';

export const Loader = ({ size = 'medium', color = '#3498db' }) => {
	const sizeClasses =
		{
			small: 'w-6 h-6 border-2',
			medium: 'w-12 h-12 border-3',
			large: 'w-16 h-16 border-4',
		}[size] || 'w-12 h-12 border-3';

	return (
		<div className="flex justify-center items-center">
			<div
				className={`rounded-full ${sizeClasses} border-solid animate-spin-custom`}
				style={{
					borderColor: `${color}20`,
					borderTopColor: color,
				}}
			></div>
		</div>
	);
};
