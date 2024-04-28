import notCreated from '@/src/assets/notCreated0.png';
import scss from './NotCreated.module.scss';
import { FC } from 'react';

interface NotCreatedProps {
	text: string;
	name: string;
	button: () => void;
}
const NotCreated: FC<NotCreatedProps> = ({ text, name, button }) => {
	return (
		<div className={scss.mainNot}>
			<h2>{name}</h2>
			<div className={scss.not_created}>
				<div>
					<img className={scss.img} src={notCreated} alt="" />
				</div>
				<div>
					{' '}
					<h3>{text}</h3>
				</div>
				<div>{button}</div>
			</div>
		</div>
	);
};

export default NotCreated;
