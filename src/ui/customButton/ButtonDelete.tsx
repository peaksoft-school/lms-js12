import { FC, ReactNode } from 'react';
import Button from '@mui/material/Button';
import scss from './Style.module.scss';

interface ButtonDeleteProps {
	type: 'button' | 'submit' | 'reset';

	children: ReactNode;
	disabled: boolean;
	onClick: () => void;
	type: 'button' | 'submit';
}

const ButtonDelete: FC<ButtonDeleteProps> = ({
	type,
	children,
	disabled,
	onClick,
	type
}) => {
	return (
		<>
			<Button
				type={type}
				className={scss.DeleteButton}
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

export default ButtonDelete;
