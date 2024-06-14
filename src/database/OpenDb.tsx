import { openDB } from 'idb';
import { ICartItem } from '../interfaces/ICartItem';
import item1 from '../assets/item1.jpeg';
import item2 from '../assets/item2.jpeg';
import item3 from '../assets/item3.jpeg';

export const defaultItems: ICartItem[] = [
	{
		id: 1,
		name: 'Italy Pizza',
		extra: 'Extra cheese and topping',
		price: 50,
		quantity: 1,
		image: item1,
	},
	{
		id: 2,
		name: 'Combo Plate',
		extra: 'Extra cheese and topping',
		price: 35,
		quantity: 1,
		image: item2,
	},
	{
		id: 3,
		name: 'Spanish Rice',
		extra: 'Something else',
		price: 60,
		quantity: 1,
		image: item3,
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
	console.log(item);
	const db = await dbPromise;
	await db.put('cart', item);
};

export const deleteCartItem = async (id: number): Promise<void> => {
	const db = await dbPromise;
	await db.delete('cart', id);
};
