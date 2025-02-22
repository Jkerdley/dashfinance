import React from 'react';
import { CardIcon, OptionsButton } from '../../../buttons';

export const TopTenCoinContainer = ({ accountName, accountBalance, icon }) => {
	return (
		<div className="flex justify-start items-center h-14 w-[100%] mt-4 p-2 text-sm bg-sky-300/20 rounded-2xl">
			<div className="flex flex-5 w-70 justify-start items-center">
				<CardIcon padding={'p-2'} buttonSize={10} icon={icon}></CardIcon>
				<div className="flex flex-col w-[100%] truncate px-2">
					<p className="text-base truncate">{accountName}</p>
					<p className="text-sm">Баланс: {accountBalance}</p>
				</div>
			</div>
			<OptionsButton to={''} flex={'flex-1'} />
		</div>
	);
};
