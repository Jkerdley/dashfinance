import React from 'react';

export const OperationSelectors = ({
	formState,
	accountsInCurrency,
	categoriesInCurrency,
	onAccountChange,
	onCategoryChange,
}) => {
	return (
		<div className="flex gap-6 justify-around items-center">
			<select
				className="text-md rounded-xl w-[40%] p-2 bg-sky-950/90"
				value={formState.selectedAccount?.id || ''}
				onChange={(e) => onAccountChange(e.target.value)}
			>
				{accountsInCurrency.map((account) => (
					<option
						className="bg-[#334864] text-[#daeaff] rounded-lg w-[40%] h-[30px] p-2 transition-all duration-300 ease-in-out hover:bg-[#4b5563] hover:text-white"
						key={account.id}
						value={account.id}
					>
						{account.name}
					</option>
				))}
			</select>

			<select
				className="text-md rounded-xl w-[40%] p-2 bg-sky-950/90"
				value={formState.selectedCategory?.id || ''}
				onChange={(e) => onCategoryChange(e.target.value)}
			>
				{categoriesInCurrency.map((category) => (
					<option
						className="bg-[#334864] text-[#daeaff] rounded-lg w-[40%] h-[30px] p-2 transition-all duration-300 ease-in-out hover:bg-[#4b5563] hover:text-white"
						key={category.id}
						value={category.id}
					>
						{category.name}
					</option>
				))}
			</select>
		</div>
	);
};
