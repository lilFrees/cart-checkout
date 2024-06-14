import style from './Link.module.css';
import { IoChevronBackOutline } from 'react-icons/io5';
function Link() {
	return (
		<div className={style.container}>
			<button className={style.link}>
				<IoChevronBackOutline />
				<span>Shopping Continue</span>
			</button>
		</div>
	);
}

export default Link;
