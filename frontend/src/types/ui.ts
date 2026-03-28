export interface BaseModalProps {
	isOpen: boolean;
	onClose: () => void;
	width?: string;
	position?: 'left' | 'right' | 'center';
}

export interface ChartDataPoint {
	name: string;
	value?: number;
	balance?: number;
	id?: string;
}

export interface SelectorOption {
	label: string;
	value: string | number;
}
