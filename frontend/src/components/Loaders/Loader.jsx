import React from 'react';

export const Loader = () => {
	return (
		<section className="flex justify-center items-center h-full w-full">
			<div
				className={`rounded-full w-12 h-12 border-3 border-solid animate-spin-custom`}
				style={{
					borderColor: '#3498db20',
					borderTopColor: '#3498db',
				}}
			></div>
		</section>
	);
};
