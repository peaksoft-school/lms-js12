import { FC, ReactNode } from 'react';
import scss from './CustomButton.module.scss';
import Button from '@mui/material/Button';

interface ButtonSaveProps {
	children: ReactNode;
	disabled: boolean;
	onClick: () => void;
}

const ButtonSave: FC<ButtonSaveProps> = ({ children, disabled, onClick }) => {
	return (
		<>
			<Button
				className={scss.SaveButton}
				disabled={disabled}
				variant="contained"
				onClick={onClick}
			>
				{children}
			</Button>
		</>
	);
};

export default ButtonSave;
