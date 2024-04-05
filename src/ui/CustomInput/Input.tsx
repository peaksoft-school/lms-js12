import { TextField } from '@mui/material';
import scss from './Input.module.scss';
import { FC, ChangeEvent } from 'react';

interface InputProps {
	placeholder: string;
	width: string;
	value: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({ placeholder, width, value, onChange }) => {
	return (
		<>
			<TextField
				className={scss.inputBackground}
				id="customWidth"
				style={{ width }}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
		</>
	);
};

export default Input;
