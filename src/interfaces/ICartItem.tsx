export interface ICartItem {
	id?: number;
	name: string;
	extra: 'Extra cheese and topping' | 'Extra garlic' | 'Something else';
	price: number;
	quantity: number;
	image: string;
}
