import { FC, ReactNode } from 'react';
import scss from './CustomButton.module.scss';
import Button from '@mui/material/Button';
import PlusIcon from '@/src/assets/buttonPlus/Без заливки.svg';

interface CircleButtonProps {
	children: ReactNode;
	disabled: boolean;
	onClick: () => void;
}

const ButtonCircle: FC<CircleButtonProps> = ({
	children,
	disabled,
	onClick
}) => {
	return (
		<>
			<Button
				className={scss.CircleButton}
				disabled={disabled}
				variant="contained"
				onClick={onClick}
			>
				{children}
				<img className={scss.PlusIcon} src={PlusIcon} alt="#" />
			</Button>
		</>
	);
};

export default ButtonCircle;
