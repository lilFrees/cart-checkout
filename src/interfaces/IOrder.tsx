import { ICartItem } from "./ICartItem";

export interface IOrder {
	id?: number;
	cartItems: ICartItem[];
	subtotal: number;
	shipping: number;
	total: number;
	nameOnCard: string;
	cardNumber: string;
	expirationDate: string;
	cvv: string;
}
