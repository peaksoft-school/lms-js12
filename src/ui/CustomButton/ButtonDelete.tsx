import { FC, ReactNode } from 'react';
import Button from '@mui/material/Button';
import scss from './CustomButton.module.scss';

interface ButtonDeleteProps {
	children: ReactNode;
	disabled: boolean;
}

const ButtonDelete: FC<ButtonDeleteProps> = ({ children, disabled }) => {
	return (
		<>
			<Button
				className={scss.DeleteButton}
				disabled={disabled}
				variant="contained"
			>
				{children}
			</Button>
		</>
	);
};

export default ButtonDelete;
