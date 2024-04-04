import { FC, ReactNode } from 'react';
import scss from './CustomButton.module.scss';
import Button from '@mui/material/Button';

interface CancelButtonPlusProps {
	children: ReactNode;
	disabled: boolean;
}

const ButtonCancel: FC<CancelButtonPlusProps> = ({ children, disabled }) => {
	return (
		<>
			<Button
				className={scss.CancelButton}
				disabled={disabled}
				variant="contained"
			>
				{children}
			</Button>
		</>
	);
};

export default ButtonCancel;
