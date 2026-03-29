import { Role } from '../constants/roles';

export interface User {
	id: string;
	name: string;
	login: string;
	role: Role;
	avatar?: string;
	createdAt?: string;
}

export interface Account {
	id: string;
	name: string;
	balance: number;
	icon: string;
	type: string;
	userId: string;
}

export interface Category {
	id: string;
	name: string;
	balance: number;
	icon: string;
	userId: string;
	budget?: number;
}

export interface CryptoHistoryItem {
	id: string;
	type: 'buy' | 'sell';
	amount: number;
	price: number;
	date: string;
}

export interface CryptoAsset {
	id: string;
	name: string;
	coinId: string;
	symbol: string;
	averagePrice: number;
	totalSumm: number;
	assetAmount: number;
	history: CryptoHistoryItem[];
	userId: string;
}

export interface HistoryOperation {
	id: string;
	categoryId: string;
	accountId: string;
	icon: string;
	type: 'add' | 'spend';
	amount: number;
	date: string;
	userId: string;
	tag?: string;
	category?: string;
	comment?: string;
	account?: string;
}
