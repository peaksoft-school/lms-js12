import { FC, ReactNode } from 'react';
import scss from './Style.module.scss';
import Button from '@mui/material/Button';

interface CancelButtonPlusProps {
	type: 'button' | 'submit' | 'reset';

	width: string;
	children: ReactNode;
	disabled: boolean;
	onClick: () => void;
	type: 'button' | 'submit';
}

const ButtonCancel: FC<CancelButtonPlusProps> = ({
	type,
	width,
	children,
	disabled,
	onClick,
	type
}) => {
	return (
		<>
			<Button
				type={type}
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
