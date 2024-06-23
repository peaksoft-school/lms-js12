import { FC, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ButtonSave from '@/src/ui/customButton/ButtonSave.tsx';
import scss from './RatingModal.module.scss';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel.tsx';
import { usePostTeacherMutation } from '@/src/redux/api/admin/teacher';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../../customInput/Input';

interface IFormInputs {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	specialization: string;
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

const RatingModal: FC<TeacherAddProps> = ({ open, handleClose }) => {
	const {
		control,
		handleSubmit,
		reset,
		formState: { dirtyFields }
	} = useForm<IFormInputs>();
	const [postTeacher] = usePostTeacherMutation();
	const [isSubmitting, setIsSubmitting] = useState(false); // State to track form submission

	const isButtonDisabled =
		!dirtyFields.firstName ||
		!dirtyFields.lastName ||
		!dirtyFields.email ||
		!dirtyFields.phoneNumber ||
		!dirtyFields.specialization;

	const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
		setIsSubmitting(true); // Set submitting state to true

		try {
			await postTeacher({
				...data,
				linkForPassword: 'http://localhost:5173/auth/newPassword'
			});
			handleClose();
			reset();
		} catch (error) {
			console.error('Error:', error);
		} finally {
			setIsSubmitting(false); // Reset submitting state after request completes
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
						<p className={scss.comText}>Распределение рейтинга</p>
					</Typography>
					<Box className={scss.input_button_card}>
						<div className={scss.input}>
							<Controller
								name="firstName"
								control={control}
								defaultValue=""
								rules={{ required: 'Имя обязателен для заполнения' }}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="text"
										width="100%"
										placeholder="Задания %"
									/>
								)}
							/>
							<Controller
								name="lastName"
								control={control}
								defaultValue=""
								rules={{ required: 'Фамилия обязателен для заполнения' }}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="text"
										width="100%"
										placeholder="Тесты %"
									/>
								)}
							/>
							<Controller
								name="phoneNumber"
								control={control}
								defaultValue=""
								rules={{ required: 'Номер обязателен для заполнения' }}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="string"
										width="100%"
										placeholder="Экзамены %"
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
								type="button"
								disabled={false}
								onClick={handleClose}
								width="117px"
							>
								Отмена
							</ButtonCancel>
							<ButtonSave
								width="117px"
								type="submit"
								disabled={isButtonDisabled || isSubmitting} // Disable button while submitting
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

export default RatingModal;
