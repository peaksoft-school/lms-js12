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
<<<<<<< HEAD
	children,
	disabled,
	onClick,
	width,
	type
=======
	width,
	children,
	disabled,
	onClick
>>>>>>> e1ce7680b2f76076c1e4f593f811f04e4ea9a0ef
}) => {
	return (
		<>
			<Button
				style={{ width }}
				className={scss.SaveButton}
				disabled={disabled}
				variant="contained"
				onClick={onClick}
<<<<<<< HEAD
				type={type}
=======
>>>>>>> e1ce7680b2f76076c1e4f593f811f04e4ea9a0ef
			>
				{children}
			</Button>
		</>
	);
};

export default ButtonSave;
