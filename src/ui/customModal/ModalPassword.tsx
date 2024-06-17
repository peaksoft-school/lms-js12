import scss from './ModalPassword.module.scss';
import React, { FC, useState } from 'react';
import {
	Controller,
	FieldValues,
	SubmitHandler,
	useForm
} from 'react-hook-form';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Input from '@/src/ui/customInput/Input.tsx';
import ButtonSave from '@/src/ui/customButton/ButtonSave.tsx';
import { useForgotPasswordMutation } from '@/src/redux/api/auth';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 541,
	height: 290,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '12px'
};
interface ModalPasswordProps {
	open: boolean;
	handleClose: () => void;
}

const ModalPassword: FC<ModalPasswordProps> = ({ open, handleClose }) => {
	const [inputvalue, setInputValue] = useState<string>('');
	const { control, handleSubmit } = useForm();

	const [forgotPasswordMutation] = useForgotPasswordMutation();

	const handleInputChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};
	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		const { email } = data;
		const newData = {
			email: email,
			link: 'http://localhost:5173/auth/newPassword'
		};
		await forgotPasswordMutation(newData);
		handleClose();
	};

	return (
		<form>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style} className={scss.MainModal}>
					<Typography
						className={scss.text}
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						<p className={scss.comText}>Забыли пароль?</p>
					</Typography>

					<Box className={scss.input_buttonCard}>
						<p className={scss.textarea}>
							Вам будет отправлена ссылка для сброса пароля
						</p>

						<div className={scss.input}>
							<Controller
								name="email"
								control={control}
								defaultValue=""
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="text"
										value={inputvalue}
										width="100%"
										placeholder="Введите ваш Email"
										onChange={(e) => {
											field.onChange(e);
											handleInputChange1(e);
										}}
									/>
								)}
							/>
						</div>
						<div className={scss.buttonAdd}>
							<ButtonSave
								type="submit"
								width="100%"
								disabled={false}
								onClick={handleSubmit(onSubmit)}
							>
								Отправить
							</ButtonSave>
						</div>
					</Box>
				</Box>
			</Modal>
		</form>
	);
};

export default ModalPassword;
