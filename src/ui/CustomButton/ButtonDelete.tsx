import { FC, ReactNode } from 'react';
import Button from '@mui/material/Button';
import scss from './CustomButton.module.scss';

interface ButtonDeleteProps {
	children: ReactNode;
	disabled: boolean;
	onClick: () => void;
}

const ButtonDelete: FC<ButtonDeleteProps> = ({
	children,
	disabled,
	onClick
}) => {
	return (
		<>
			<Button
				className={scss.DeleteButton}
				disabled={disabled}
				variant="contained"
				onClick={onClick}
			>
				{children}
			</Button>
		</>
	);
};

export default ButtonDelete;
