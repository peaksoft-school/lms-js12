import { FC, ReactNode } from 'react';
import scss from './CustomButton.module.scss';
import Button from '@mui/material/Button';

interface ButtonSaveProps {
	width: string;
	children: ReactNode;
	disabled: boolean;
	onClick: () => void;
	type: 'button' | 'submit';
}

const ButtonSave: FC<ButtonSaveProps> = ({
	children,
	disabled,
	onClick,
	width,
	type
}) => {
	return (
		<>
			<Button
				style={{ width }}
				className={scss.SaveButton}
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

export default ButtonSave;
