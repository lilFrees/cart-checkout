/* eslint-disable react-hooks/exhaustive-deps */
import style from './Item.module.css';
import { CartItemProps } from '../../interfaces/CartItemProps';
import { FaRegTrashAlt } from 'react-icons/fa';
import { LuChevronDownCircle, LuChevronUpCircle } from 'react-icons/lu';
import { useEffect, useState } from 'react';

function Item({ item, onUpdate, onDelete }: CartItemProps) {
	const [quantity, setQuantity] = useState(item.quantity);

	function increaseHandler() {
		setQuantity(quantity + 1);
	}

	function decreaseHandler() {
		if (quantity > 1) setQuantity(quantity - 1);
	}

	useEffect(() => {
		onUpdate({
			...item,
			quantity: quantity,
		});
	}, [quantity]);

	return (
		<div className={style.item}>
			<div className={style.image}>
				<img src={item.image} alt='Cart Item' />
			</div>
			<div className={style.heading}>
				<div className={style.title}>{item.name}</div>
				<div className={style.extra}>{item.extra}</div>
			</div>
			<div className={style.number}>
				{quantity}

				<div className={style.action}>
					<button className={style.btn} onClick={increaseHandler}>
						<LuChevronUpCircle />
					</button>
					<button className={style.btn} onClick={decreaseHandler}>
						<LuChevronDownCircle />
					</button>
				</div>
			</div>
			<div className={style.price}>${item.price}</div>
			<button
				className={style.delete}
				onClick={() => {
					onDelete(item.id!);
				}}
			>
				<FaRegTrashAlt />
			</button>
		</div>
	);
}

export default Item;
