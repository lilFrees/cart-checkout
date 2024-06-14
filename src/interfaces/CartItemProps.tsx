import { ICartItem } from './ICartItem';

export interface CartItemProps {
	item: ICartItem;
	onUpdate: (item: ICartItem) => void;
	onDelete: (id: number) => void;
}
