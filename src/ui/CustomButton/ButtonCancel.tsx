import { FC, ReactNode } from 'react';
import scss from './CustomButton.module.scss';
import Button from '@mui/material/Button';

interface CancelButtonPlusProps {
	width: string;
	children: ReactNode;
	disabled: boolean;
	onClick: () => void;
	type: 'button' | 'submit';
}

const ButtonCancel: FC<CancelButtonPlusProps> = ({
	width,
	children,
	disabled,
	onClick,
	type
}) => {
	return (
		<>
			<Button
				className={scss.CancelButton}
				style={{ width }}
				onClick={onClick}
				disabled={disabled}
				variant="contained"
				type={type}
			>
				{children}
			</Button>
		</>
	);
};

export default ButtonCancel;
