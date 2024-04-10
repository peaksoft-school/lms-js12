import { FC, ReactNode } from 'react';
import scss from './CustomButton.module.scss';
import Button from '@mui/material/Button';
import PlusIcon from '@/src/assets/buttonPlus/Без заливки.svg';

interface ButtonWithPlusProps {
	children: ReactNode;
	disabled: boolean;
	onClick: () => void;
	type: 'button' | 'submit';
}

const ButtonWithPlus: FC<ButtonWithPlusProps> = ({
	children,
	disabled,
	onClick,
	type
}) => {
	return (
		<>
			<Button
				className={scss.PlusButton}
				disabled={disabled}
				variant="contained"
				onClick={onClick}
				type={type}
			>
				<img className={scss.PlusIcon} src={PlusIcon} alt="#" />
				{children}
			</Button>
		</>
	);
};

export default ButtonWithPlus;
