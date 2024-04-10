import { FC, ReactNode } from 'react';
import Button from '@mui/material/Button';
import scss from './CustomButton.module.scss';

interface ButtonDeleteProps {
	children: ReactNode;
	disabled: boolean;
	onClick: () => void;
	type: 'button' | 'submit';
}

const ButtonDelete: FC<ButtonDeleteProps> = ({
	children,
	disabled,
	onClick,
	type
}) => {
	return (
		<>
			<Button
				className={scss.DeleteButton}
				disabled={disabled}
				variant="contained"
				onClick={onClick}
				type={type}
			>
				{children}
			</Button>
		</>
	);
};

export default ButtonDelete;
