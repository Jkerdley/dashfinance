import React from 'react';

export const WelcomeTopMenu = () => {
	return (
		<div
			name="menu-top-welcome"
			className="2xl:flex xl:flex md:hidden sm:hidden hidden flex-[5] w-full items-end justify-center"
		>
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
