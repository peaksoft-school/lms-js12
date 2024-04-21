import { TextField } from '@mui/material';
import scss from './Input.module.scss';
import { ChangeEvent, forwardRef } from 'react';
interface InputProps {
	placeholder: string;
	width: string;
	value: string;
	type: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	error?: boolean;
}
type Ref = HTMLInputElement;
const Input = forwardRef<Ref, InputProps>(
	({ placeholder, width, value, onChange, type, error }, ref) => {
		return (
			<>
				<TextField
					className={scss.inputBackground}
					id="customWidth"
					style={{ width }}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					type={type}
					error={error}
					ref={ref}
					InputProps={{
						style: {
							borderRadius: '20px'
						}
					}}
				/>
			</>
		);
	}
);
export default Input;
