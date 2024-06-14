import { useState, useEffect } from 'react';
import style from './App.module.css';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import Link from './components/Link/Link';
import {
	getCartItems,
	updateCartItem,
	deleteCartItem,
} from './database/OpenDb';
import { ICartItem } from './interfaces/ICartItem';

function App() {
	const [cartItems, setCartItems] = useState<ICartItem[]>([]);

	const [subtotal, setSubtotal] = useState<number>(0);
	const shipping = 4;
	const taxRate = 0.1;
	useEffect(() => {
		const fetchCartItems = async () => {
			const items = await getCartItems();
			setCartItems(items);
			calculateSubtotal(items);
		};

		fetchCartItems();
	}, []);

	const calculateSubtotal = (items: ICartItem[]) => {
		const calculatedSubtotal = items.reduce(
			(acc, item) => acc + item.price * item.quantity,
			0
		);
		setSubtotal(calculatedSubtotal);
	};

	const handleUpdate = async (updatedItem: ICartItem) => {
		await updateCartItem(updatedItem);
		setCartItems((prevItems) =>
			prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
		);
		calculateSubtotal(cartItems);
	};

	const handleDelete = async (id: number) => {
		await deleteCartItem(id);
		const updatedItems = cartItems.filter((item) => item.id !== id);
		setCartItems(updatedItems);
		calculateSubtotal(updatedItems);
	};

	const total = subtotal + shipping + subtotal * taxRate;

	return (
		<div className={style.app}>
			<div className={style.cart}>
				<Link />
				<Cart
					items={cartItems}
					onDelete={handleDelete}
					onUpdate={handleUpdate}
				/>
			</div>
			<div className={style.checkout}>
				<Checkout subtotal={subtotal} shipping={shipping} total={total} />
			</div>
		</div>
	);
}

export default App;
