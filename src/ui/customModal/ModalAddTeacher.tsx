/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonSave from '@/src/ui/customButton/ButtonSave.tsx';
import scss from './Style.module.scss';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel.tsx';
import { usePostTeacherMutation } from '@/src/redux/api/admin/teacher';
import Input from '../customInput/Input';

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
	width: 541,
	backgroundColor: '#fff',
	bgColor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '12px'
};

const ModalAddTeacher: FC<TeacherAddProps> = ({ open, handleClose }) => {
	event?.preventDefault();
	const {
		control,
		handleSubmit,
		reset,
		formState: { dirtyFields }
	} = useForm<IFormInputs>();
	const [postTeacher] = usePostTeacherMutation();
	const isButtonDisabled = !(
		dirtyFields.firstName &&
		dirtyFields.lastName &&
		dirtyFields.email &&
		dirtyFields.phoneNumber &&
		dirtyFields.specialization
	);

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
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
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
						<p className={scss.comText}>Добавить учителя</p>
					</Typography>
					<Box className={scss.input_button_card}>
						<div className={scss.input}>
							<Controller
								name="firstName"
								control={control}
								defaultValue=""
								rules={{
									required: 'Имя обязателен для заполнения'
								}}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="text"
										width="100%"
										placeholder=" Имя"
									/>
								)}
							/>
							<Controller
								name="lastName"
								control={control}
								defaultValue=""
								rules={{
									required: 'Фамилия обязателен для заполнения'
								}}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="text"
										width="100%"
										placeholder="Фамилия"
									/>
								)}
							/>
							<Controller
								name="phoneNumber"
								control={control}
								defaultValue=""
								rules={{
									required: 'Номер обязателен для заполнения'
								}}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="string"
										width="100%"
										placeholder="+996"
									/>
								)}
							/>
							<Controller
								name="email"
								control={control}
								defaultValue=""
								rules={{
									required: 'Email обязателен для заполнения'
								}}
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
								name="specialization"
								control={control}
								defaultValue=""
								rules={{
									required: 'Специализация обязателен для заполнения'
								}}
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
								gap: '10px',
								paddingRight: '14px'
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
								disabled={isButtonDisabled}
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
