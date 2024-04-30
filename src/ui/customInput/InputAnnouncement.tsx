import { TextField } from '@mui/material';
import scss from './Input.module.scss';
import { ChangeEvent, forwardRef } from 'react';

interface InputProps {
	placeholder: string;
	value: string;
	type: string;
	label: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	error?: boolean;
}

type Ref = HTMLInputElement;

const InputAnnouncement = forwardRef<Ref, InputProps>(
	({ placeholder, value, onChange, type, label, error }, ref) => {
		return (
			<>
				<TextField
					className={scss.inputBackground}
					id="outlined-textarea"
					placeholder={placeholder}
					label={label}
					value={value}
					onChange={onChange}
					type={type}
					error={error}
					ref={ref}
					multiline
					InputProps={{
						style: {
							borderRadius: '10px',
							marginBottom: '20px',
							minHeight: '40px'
						}
					}}
				/>
			</>
		);
	}
);

export default InputAnnouncement;
