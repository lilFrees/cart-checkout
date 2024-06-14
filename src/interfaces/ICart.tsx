import { ICartItem } from './ICartItem';

export interface ICart {
	items: ICartItem[];
	onUpdate: (item: ICartItem) => void;
	onDelete: (id: number) => void;
}
