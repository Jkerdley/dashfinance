import React from 'react';

export const OperationSelectors = ({
	formState,
	accountsInCurrency,
	categoriesInCurrency,
	handleInputChange,
}) => {
	return (
		<div className="flex gap-6 justify-around items-center">
			<select
				className="text-md rounded-xl w-[40%] p-2 bg-sky-950/90"
				value={formState.selectedAccountValue}
				onChange={handleInputChange('selectedAccountValue')}
			>
				{accountsInCurrency.map((account) => (
					<option
						className="bg-[#334864] text-[#daeaff] rounded-lg w-[40%] h-[30px] p-2 transition-all duration-300 ease-in-out hover:bg-[#4b5563] hover:text-white"
						key={account.id}
						value={account.name}
					>
						{account.name}
					</option>
				))}
			</select>
			<select
				className="text-md rounded-xl w-[40%] p-2 bg-sky-950/90"
				value={formState.selectedCategoryValue}
				onChange={handleInputChange('selectedCategoryValue')}
			>
				{categoriesInCurrency.map((categorie) => (
					<option
						className="bg-[#334864] text-[#daeaff] rounded-lg w-[40%] h-[30px] p-2 transition-all duration-300 ease-in-out hover:bg-[#4b5563] hover:text-white"
						key={categorie.id}
						value={categorie.name}
					>
						{categorie.name}
					</option>
				))}
			</select>
		</div>
	);
};
