import { FC, useState } from 'react';
import {
	Modal,
	Box,
	Typography,
	FormControl,
	SelectChangeEvent,
	InputLabel,
	Select,
	MenuItem
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

const ModalAddStudent: FC<StudentAddProps> = ({ open, handleClose }) => {
	const { handleSubmit, control, reset } = useForm<PostStudentProps>();
	const [postStudentTable] = usePostStudentTableMutation();
	const [formatName, setFormatName] = useState<string>('');
	const [groupName, setGroupName] = useState<string>('');
	const { data } = useGetGroupQuery();

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
				groupName,
				studyFormat: formatName,
				phoneNumber,
				email,
				isBlock: false
			};
			try {
				const response = await postStudentTable(newStudent);
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

	const handleGroupChange = (event: SelectChangeEvent<string>) => {
		setGroupName(event.target.value);
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
							<FormControl fullWidth>
								<InputLabel id="study-format-label">Группа</InputLabel>
								<Select
									style={{ borderRadius: '12px' }}
									labelId="study-format-label"
									id="study-format-select"
									value={groupName}
									onChange={handleGroupChange}
								>
									{data?.groupResponses.map((item) => (
										<MenuItem value={item.title}>
											<h1>{item.title}</h1>
										</MenuItem>
									))}
								</Select>
							</FormControl>
							{/* //!  */}
							<FormControl fullWidth>
								<InputLabel id="study-format-label">Формат обучения</InputLabel>
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
