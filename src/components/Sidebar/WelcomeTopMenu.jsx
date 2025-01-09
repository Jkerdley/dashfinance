import React from 'react';

export const WelcomeTopMenu = () => {
	return (
		<div name="menu-top-welcome" className="flex flex-[0.16] w-full items-center justify-center">
			<div className="flex flex-col items-center justify-center text-center text-gray-100/90">
				<p className="text-center font-semibold text-base">WELCOME</p>
				<p>
					Last login <br />
					20.12.2024
				</p>
			</div>
		</div>
	);
};
