import { FC, useState } from 'react';
import {
	Modal,
	Box,
	Typography,
	FormControl,
	SelectChangeEvent,
	InputLabel,
	Select,
	MenuItem,
	useTheme,
	OutlinedInput,
	Theme
} from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Input from '@/src/ui/customInput/Input.tsx';
import scss from './StudentStyle.module.scss';
import {
	useGetGroupAllQuery,
	usePostStudentTableMutation
} from '@/src/redux/api/admin/student';
import ButtonSave from '../customButton/ButtonSave';
import ButtonCancel from '../customButton/ButtonCancel';
import { message } from 'antd';

function isValidEmail(email: string): boolean {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return re.test(email);
}

interface PostStudentProps {
	firstName: string;
	lastName: string;
	groupName: string;
	studyFormat: string;
	phoneNumber: string;
	email: string;
	isBlock: boolean;
}

interface StudentAddProps {
	open: boolean;
	handleClose: () => void;
}

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 570,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '12px'
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250
		}
	}
};

function getStyles(name: string, personName: string, theme: Theme) {
	return {
		fontWeight:
			personName.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium
	};
}

const ModalAddStudent: FC<StudentAddProps> = ({ open, handleClose }) => {
	const {
		handleSubmit,
		control,
		reset,
		formState: { dirtyFields, errors }
	} = useForm<PostStudentProps>();
	const [postStudentTable] = usePostStudentTableMutation();
	const [formatName, setFormatName] = useState<string>('');
	const { data } = useGetGroupAllQuery();

	const theme = useTheme();
	const [personName, setPersonName] = useState<string>('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (event: SelectChangeEvent<string>) => {
		setPersonName(event.target.value);
	};

	const isButtonDisabled =
		!dirtyFields.firstName ||
		!dirtyFields.lastName ||
		!dirtyFields.email ||
		!dirtyFields.phoneNumber;

	const onSubmit: SubmitHandler<PostStudentProps> = async (formData) => {
		const { firstName, lastName, phoneNumber, email } = formData;

		if (!phoneNumber.includes('+')) {
			message.error('Номер телефона должен содержать символ "+"');
			return;
		}

		if (!isValidEmail(email)) {
			message.error('Некорректный формат Email');
			return;
		}

		setIsSubmitting(true);

		const newStudent = {
			firstName,
			lastName,
			groupName: personName,
			studyFormat: formatName,
			phoneNumber,
			email,
			isBlock: false
		};

		const newData = {
			link: 'http://localhost:5173/auth/newPassword'
		};

		try {
			const response = await postStudentTable({ newStudent, newData });
			console.log('Response:', response);
			message.success('Студент успешно добавлен');
			handleClose();
			reset();
			setFormatName('');
			setPersonName('');
		} catch (error) {
			message.error('Ошибка при добавлении студента');
			console.error('Error:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleFormatChange = (event: SelectChangeEvent<string>) => {
		setFormatName(event.target.value);
	};

	return (
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
					<p className={scss.com_text}>Добавить студента</p>
				</Typography>
				<Box className={scss.input_button_card}>
					<form
						style={{ width: '100%', maxWidth: '470px' }}
						onSubmit={handleSubmit(onSubmit)}
					>
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
										placeholder="Имя"
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
										type="text"
										width="100%"
										placeholder="Номер телефона"
									/>
								)}
							/>
							<Controller
								name="email"
								control={control}
								defaultValue=""
								rules={{
									required: 'Email обязателен для заполнения',
									pattern: {
										value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
										message: 'Введите корректный email'
									}
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
							{errors.email && message.error(errors.email.message)}
							<FormControl>
								<InputLabel style={{ background: '#fff' }} id="demo-name-label">
									Группа
								</InputLabel>
								<Select
									style={{ borderRadius: '12px' }}
									labelId="demo-name-label"
									id="demo-name"
									value={personName}
									onChange={handleChange}
									input={<OutlinedInput label="groupName" />}
									MenuProps={MenuProps}
								>
									{data?.map((name) => (
										<MenuItem
											key={name.id}
											value={name.groupName}
											style={getStyles(name.groupName, personName, theme)}
										>
											{name.groupName}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<FormControl fullWidth>
								<InputLabel
									id="study-format-label"
									style={{ background: '#fff' }}
								>
									Формат обучения
								</InputLabel>
								<Select
									style={{ borderRadius: '12px' }}
									labelId="study-format-label"
									id="study-format-select"
									value={formatName}
									onChange={handleFormatChange}
								>
									<MenuItem value="ONLINE">ONLINE</MenuItem>
									<MenuItem value="OFFLINE">OFFLINE</MenuItem>
								</Select>
							</FormControl>
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
								type="button"
								onClick={handleClose}
								disabled={isSubmitting}
								width="117px"
							>
								Отмена
							</ButtonCancel>
							<ButtonSave
								onClick={handleSubmit(onSubmit)}
								type="submit"
								disabled={isSubmitting || isButtonDisabled}
								width="117px"
							>
								Отправить
							</ButtonSave>
						</div>
					</form>
				</Box>
			</Box>
		</Modal>
	);
};

export default ModalAddStudent;
