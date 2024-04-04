import { FC, ReactNode } from 'react';
import scss from './CustomButton.module.scss';
import Button from '@mui/material/Button';

interface ButtonSaveProps {
	children: ReactNode;
	disabled: boolean;
}

const ButtonSave: FC<ButtonSaveProps> = ({ children, disabled }) => {
	return (
		<>
			<Button
				className={scss.SaveButton}
				disabled={disabled}
				variant="contained"
			>
				{children}
			</Button>
		</>
	);
};

export default ButtonSave;
