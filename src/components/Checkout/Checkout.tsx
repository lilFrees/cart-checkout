import style from './Checkout.module.css';
import profilePic from '../../assets/profilepic.jpeg';
import mastercard from '../../assets/mastercard.png';
import visa from '../../assets/visa.png';
import rupay from '../../assets/rupay.png';
import { FaArrowRight } from 'react-icons/fa';
import { ICheckout } from '../../interfaces/ICheckout';
import { addOrder, getCartItems } from '../../database/OpenDb';
import { useState } from 'react';
import { IOrder } from '../../interfaces/IOrder';

const paymentTypes = [
	{ id: 1, image: mastercard, type: 'Mastercard' },
	{
		id: 2,
		image: visa,
		type: 'Visa',
	},
	{
		id: 3,
		image: rupay,
		type: 'Rupay',
	},
];

function Checkout({ total, subtotal, shipping }: ICheckout) {
	const [nameOnCard, setNameOnCard] = useState('');
	const [cardNumber, setCardNumber] = useState('');
	const [expirationDate, setExpirationDate] = useState('');
	const [cvv, setCvv] = useState('');

	const handleCheckout = async () => {
		const cartItems = await getCartItems();

		const order: IOrder = {
			cartItems,
			subtotal,
			shipping,
			total,
			nameOnCard,
			cardNumber,
			expirationDate,
			cvv,
		};

		await addOrder(order);
		alert('Order saved successfully!');
	};
	return (
		<div className={style.checkout}>
			<div className={style.heading}>
				<h3 className={style.title}>Card Details</h3>
				<div className={style.image}>
					<img src={profilePic} alt='Profile Picture' />
				</div>
			</div>
			<div className={style.cardTypes}>
				<p className={style.tagline}>Card Type</p>
				<div className={style.cards}>
					{paymentTypes.map((card) => (
						<div className={style.card} key={card.id}>
							<img src={card.image} alt={card.type} />
						</div>
					))}
					<div className={style.card}>See all</div>
				</div>
			</div>
			<form
				className={style.form}
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<label htmlFor='name' className={style.label}>
					Name on card
					<input
						type='text'
						name=''
						id='name'
						className={style.input}
						placeholder='Name'
						value={nameOnCard}
						onChange={(e) => setNameOnCard(e.target.value)}
					/>
				</label>
				<label htmlFor='card-number' className={style.label}>
					Card Number
					<input
						type='text'
						name=''
						id='card-number'
						className={style.input}
						placeholder='1111 2222 3333 4444'
						value={cardNumber}
						onChange={(e) => setCardNumber(e.target.value)}
					/>
				</label>
				<div className={style.details}>
					<label htmlFor='card-number' className={style.label}>
						Expiration Date
						<input
							type='text'
							name=''
							id='card-number'
							className={style.input}
							placeholder='mm/yy'
							value={expirationDate}
							onChange={(e) => setExpirationDate(e.target.value)}
						/>
					</label>
					<label htmlFor='card-number' className={style.label}>
						CVV
						<input
							type='text'
							name=''
							id='card-number'
							className={style.input}
							placeholder='123'
							value={cvv}
							onChange={(e) => setCvv(e.target.value)}
						/>
					</label>
				</div>
			</form>
			<div className={style.summary}>
				<div className={style.block}>
					<div className={style.value}>Subtotal</div>
					<div className={style.value}>$ {subtotal.toFixed(2)}</div>
				</div>
				<div className={style.block}>
					<div className={style.value}>Shipping</div>
					<div className={style.value}>$ {shipping.toFixed(2)}</div>
				</div>
				<div className={style.block}>
					<div className={style.value}>Total (Tax Incl.)</div>
					<div className={style.value}>$ {total.toFixed(2)}</div>
				</div>
			</div>
			<button type='button' className={style.submit} onClick={handleCheckout}>
				<div>${total.toFixed(2)}</div>
				<div>
					Checkout <FaArrowRight />
				</div>
			</button>
		</div>
	);
}

export default Checkout;
