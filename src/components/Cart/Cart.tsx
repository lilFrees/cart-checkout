import style from './Cart.module.css';

import Item from './Item';
import { ICart } from '../../interfaces/ICart';

function Cart({ items, onDelete, onUpdate }: ICart) {
	return (
		<div className={style.cart}>
			<div className={style.heading}>
				<h3 className={style.title}>Shopping cart</h3>
				<p className={style.tagline}>
					You have {items.length} items in your cart
				</p>
			</div>
			<div className={style.itemsList}>
				{items.map((item) => (
					<Item
						item={item}
						onUpdate={onUpdate}
						onDelete={onDelete}
						key={item.id!}
					/>
				))}
			</div>
		</div>
	);
}

export default Cart;
