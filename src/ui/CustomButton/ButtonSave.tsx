import { FC, ReactNode } from 'react';
import scss from './CustomButton.module.scss';
import Button from '@mui/material/Button';

interface ButtonSaveProps {
	width: string;
	children: ReactNode;
	disabled: boolean;
	onClick: () => void;
}

const ButtonSave: FC<ButtonSaveProps> = ({
	width,
	children,
	disabled,
	onClick
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
=======
				type='submit'
>>>>>>> dev
			>
				{children}
			</Button>
		</>
	);
};

export default ButtonSave;
