import { FC, ReactNode } from 'react';
import scss from './CustomButton.module.scss';
import Button from '@mui/material/Button';
import PlusIcon from '@/src/assets/buttonPlus/Без заливки.svg';

interface ButtonWithPlusProps {
	children: ReactNode;
	disabled: boolean;
}

const ButtonWithPlus: FC<ButtonWithPlusProps> = ({ children, disabled }) => {
	return (
		<>
			<Button
				className={scss.PlusButton}
				disabled={disabled}
				variant="contained"
			>
				<img className={scss.PlusIcon} src={PlusIcon} alt="#" />
				{children}
			</Button>
		</>
	);
};

export default ButtonWithPlus;
