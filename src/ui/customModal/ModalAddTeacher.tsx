/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonSave from '@/src/ui/customButton/ButtonSave.tsx';
import scss from './Style.module.scss';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel.tsx';
import { usePostTeacherMutation } from '@/src/redux/api/admin/teacher';
import Input from '../customInput/Input';
import OutlinedInput from '@mui/material/OutlinedInput';
import { IconClosed, IconOpen_Eye } from '@/src/assets/icons';

// import { ToastContainer, toast } from 'react-toastify';
import { InputAdornment, IconButton } from '@mui/material';

interface IFormInputs {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	login: string;
	specialization: string;
	group: string[];
}

interface TeacherAddProps {
	open: boolean;
	handleClose: () => void;
}

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 581,
	backgroundColor: '#ffffff',
	bgColor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '12px'
};

const ModalAddTeacher: FC<TeacherAddProps> = ({ open, handleClose }) => {
	const { control, handleSubmit, reset } = useForm<IFormInputs>();
	const [postTeacher] = usePostTeacherMutation();
	// const [personName, setPersonName] = useState<string[]>([]);
	const [showSecondPassword, setShowSecondPassword] = useState<boolean>(false);

	const handleClickShowSecondPassword = () =>
		setShowSecondPassword((show) => !show);
	const handleMouseDownSecondPassword1 = (
		event: React.MouseEvent<HTMLButtonElement>
	) => event.preventDefault();

	// const notify = () =>
	// 	toast.error('Пожалуйста, заполните все обязательные поля');
	// const notifySuccess = () => toast.success('Успешно добовлено');

	const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
		const { firstName, lastName, email, phoneNumber, specialization } = data;

		if (
			firstName !== '' &&
			lastName !== '' &&
			email !== '' &&
			phoneNumber !== '' &&
			specialization !== ''
		) {
			const postData = {
				firstName: firstName,
				lastName: lastName,
				email: email,
				phoneNumber: phoneNumber,
				specialization: specialization
			};
			await postTeacher(postData);

			handleClose();
			reset();
		} else {
			// notify();
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{/* <ToastContainer /> */}
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style} className={scss.main_modal}>
					<Typography
						className={scss.text}
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						<p className={scss.comText}>Добавление учителя</p>
					</Typography>

					<Box className={scss.input_button_card}>
						<div className={scss.input}>
							<Controller
								name="firstName"
								control={control}
								defaultValue=""
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="text"
										width="100%"
										placeholder="First Name"
									/>
								)}
							/>
							<Controller
								name="lastName"
								control={control}
								defaultValue=""
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="text"
										width="100%"
										placeholder="Last Name"
									/>
								)}
							/>
							<Controller
								name="phoneNumber"
								control={control}
								defaultValue=""
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="string"
										width="100%"
										placeholder="Phone Number"
									/>
								)}
							/>
							<Controller
								name="email"
								control={control}
								defaultValue=""
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="email"
										width="100%"
										placeholder="Email"
									/>
								)}
							/>
							<Controller
								name="login"
								control={control}
								defaultValue=""
								render={({ field }) => (
									<OutlinedInput
										{...field}
										className={scss.outlined_input_eyes}
										placeholder="Password"
										type={showSecondPassword ? 'text' : 'password'}
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={handleClickShowSecondPassword}
													onMouseDown={handleMouseDownSecondPassword1}
													edge="end"
												>
													{showSecondPassword ? (
														<IconOpen_Eye />
													) : (
														<IconClosed />
													)}
												</IconButton>
											</InputAdornment>
										}
									/>
								)}
							/>

							<Controller
								name="specialization"
								control={control}
								defaultValue=""
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="string"
										width="100%"
										placeholder="Специализация"
									/>
								)}
							/>
						</div>

						<div
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'flex-end',
								alignItems: 'center',
								paddingBottom: '10px',
								paddingTop: '13px',
								gap: '10px'
							}}
						>
							<ButtonCancel
								type="submit"
								disabled={false}
								onClick={handleClose}
								width="117px"
							>
								Отмена
							</ButtonCancel>
							<ButtonSave
								width="117px"
								type="submit"
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

export default ModalAddTeacher;
