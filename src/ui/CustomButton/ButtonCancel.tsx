import { FC, ReactNode } from 'react';
import scss from './CustomButton.module.scss';
import Button from '@mui/material/Button';

interface CancelButtonPlusProps {
	children: ReactNode;
	disabled: boolean;
	onClick: () => void;
}

const ButtonCancel: FC<CancelButtonPlusProps> = ({
	children,
	disabled,
	onClick
}) => {
	return (
		<>
			<Button
				className={scss.CancelButton}
				onClick={onClick}
				disabled={disabled}
				variant="contained"
			>
				{children}
			</Button>
		</>
	);
};

export default ButtonCancel;
