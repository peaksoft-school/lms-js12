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
import ButtonSave from '@/src/ui/customButton/ButtonSave.tsx';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel.tsx';
import scss from './StudentStyle.module.scss';
import { usePostStudentTableMutation } from '@/src/redux/api/admin/student';
import { useGetGroupQuery } from '@/src/redux/api/admin/groups';

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
	event?.preventDefault();
	const {
		handleSubmit,
		control,
		reset,
		formState: { errors }
	} = useForm<PostStudentProps>();
	const [postStudentTable] = usePostStudentTableMutation();
	const [formatName, setFormatName] = useState<string>('');
	const { data } = useGetGroupQuery({
		page: '1',
		size: '100'
	});

	const theme = useTheme();
	const [personName, setPersonName] = useState<string>('');

	const handleChange = (event: SelectChangeEvent<string>) => {
		setPersonName(event.target.value);
	};

	const onSubmit: SubmitHandler<PostStudentProps> = async (data) => {
		const { firstName, lastName, groupName, phoneNumber, email } = data;
		if (
			firstName !== '' &&
			lastName !== '' &&
			groupName !== '' &&
			formatName !== '' &&
			phoneNumber !== '' &&
			email !== ''
		) {
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
				handleClose();
				reset();
				setFormatName('');
			} catch (error) {
				console.error('Error:', error);
			}
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
										error={!!errors.firstName}
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
										error={!!errors.lastName}
									/>
								)}
							/>
							<Controller
								name="phoneNumber"
								control={control}
								defaultValue="+996"
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
										error={!!errors.phoneNumber}
										onChange={(e) => {
											const value = e.target.value;
											if (!value.startsWith('+996')) {
												field.onChange('+996' + value);
											} else {
												field.onChange(value);
											}
										}}
									/>
								)}
							/>
							<Controller
								rules={{
									required: 'Email обязателен для заполнения'
								}}
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
										error={!!errors.email}
									/>
								)}
							/>

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
									{data?.groupResponses.map((name) => (
										<MenuItem
											key={name.id}
											value={name.title}
											style={getStyles(name.title, personName, theme)}
										>
											{name.title}
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
								disabled={false}
								onClick={handleClose}
								width="117px"
							>
								Отмена
							</ButtonCancel>
							<ButtonSave
								onClick={handleSubmit(onSubmit)}
								type="submit"
								width="117px"
								disabled={false}
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
