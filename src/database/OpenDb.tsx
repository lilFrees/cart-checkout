import { openDB } from 'idb';
import { ICartItem } from '../interfaces/ICartItem';
import { IOrder } from '../interfaces/IOrder';
import image1 from '../assets/item1.jpeg';
import image2 from '../assets/item2.jpeg';
import image3 from '../assets/item3.jpeg';

const defaultItems: ICartItem[] = [
	{
		id: 1,
		name: 'Italy Pizza',
		extra: 'Extra cheese and topping',
		price: 12,
		quantity: 1,
		image: image1,
	},
	{
		id: 2,
		name: 'Combo Plate',
		extra: 'Extra garlic',
		price: 5,
		quantity: 1,
		image: image2,
	},
	{
		id: 3,
		name: 'Spanish Rice',
		extra: 'Something else',
		price: 3,
		quantity: 1,
		image: image3,
	},
];

const dbPromise = openDB('shopping-cart', 1, {
	upgrade(db) {
		if (!db.objectStoreNames.contains('cart')) {
			const store = db.createObjectStore('cart', {
				keyPath: 'id',
				autoIncrement: true,
			});
			defaultItems.forEach((item) => {
				store.add(item);
			});
		}
		if (!db.objectStoreNames.contains('orders')) {
			db.createObjectStore('orders', { keyPath: 'id', autoIncrement: true });
		}
	},
});

export const addItemToCart = async (item: ICartItem): Promise<void> => {
	const db = await dbPromise;
	await db.add('cart', item);
};

export const getCartItems = async (): Promise<ICartItem[]> => {
	const db = await dbPromise;
	return await db.getAll('cart');
};

export const updateCartItem = async (item: ICartItem): Promise<void> => {
	const db = await dbPromise;
	await db.put('cart', item);
};

export const deleteCartItem = async (id: number): Promise<void> => {
	const db = await dbPromise;
	await db.delete('cart', id);
};

export const addOrder = async (order: IOrder): Promise<void> => {
	const db = await dbPromise;
	await db.add('orders', order);
};
