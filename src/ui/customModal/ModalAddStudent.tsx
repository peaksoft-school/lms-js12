// import { FC, useState } from 'react';
// import {
// 	Modal,
// 	Box,
// 	Typography,
// } from '@mui/material';
// import { useForm, Controller, SubmitHandler } from 'react-hook-form';
// import Input from '@/src/ui/customInput/Input.tsx';
// import ButtonSave from '@/src/ui/customButton/ButtonSave.tsx';
// import ButtonCancel from '@/src/ui/customButton/ButtonCancel.tsx';
// import scss from './StudentStyle.module.scss';
// import { usePostStudentTableMutation } from '@/src/redux/api/admin/student';
// import OutlinedInput from '@mui/material/OutlinedInput';
// // import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import ListItemText from '@mui/material/ListItemText';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import Checkbox from '@mui/material/Checkbox';
// // import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { InputLabel } from '@mantine/core';

// interface PostStudentProps {
// 	firstName: string;
// 	lastName: string;
// 	groupName: string;
// 	studyFormat: string;
// 	phoneNumber: string;
// 	email: string;
// 	// password: string;
// 	isBlock: boolean;
// }

// interface StudentAddProps {
// 	open: boolean;
// 	handleClose: () => void;
// }

// const style = {
// 	position: 'absolute',
// 	top: '50%',
// 	left: '50%',
// 	transform: 'translate(-50%, -50%)',
// 	width: 570,
// 	bgcolor: 'background.paper',
// 	boxShadow: 24,
// 	p: 4,
// 	borderRadius: '12px'
// };

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
// 	PaperProps: {
// 		style: {
// 			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
// 			width: 250
// 		}
// 	}
// };

// const names = [
// 	'Java 14',
// 	'JS 14',
// 	'Java 13',
// 	'JS 13',
// 	'Java 12',
// 	'JS 12',
// 	'Flutter',
// 	'English lesson'
// ];

// const formats = ['Online', 'OFFLINE'];

// const ModalAddStudent: FC<StudentAddProps> = ({ open, handleClose }) => {
// 	const { handleSubmit, control, reset } = useForm<PostStudentProps>();

// 	// const [showSecondPassword, setShowSecondPassword] = useState<boolean>(false);
// 	const [postStudentTable] = usePostStudentTableMutation();
// 	const [groupName, setPersonName] = useState<string[]>([]);
// 	const [formatName, setFormatName] = useState<string[]>([]);

// 	// const handleClickShowSecondPassword = () =>
// 	// 	setShowSecondPassword((show) => !show);
// 	// const handleMouseDownSecondPassword1 = (
// 	// 	event: React.MouseEvent<HTMLButtonElement>
// 	// ) => event.preventDefault();

// 	const handleChange = (event: SelectChangeEvent<typeof groupName>) => {
// 		const {
// 			target: { value }
// 		} = event;
// 		setPersonName(typeof value === 'string' ? value.split(',') : value);
// 	};

// 	const handleFormatChange = (event: SelectChangeEvent<typeof formatName>) => {
// 		const {
// 			target: { value }
// 		} = event;
// 		setFormatName(typeof value === 'string' ? value.split(',') : value);
// 	};
// 	// const notify = () =>
// 	// 	toast.error('Пожалуйста, заполните все обязательные поля');
// 	// const notifySuccess = () => toast.success('Успешно добовлено');
// 	const onSubmit: SubmitHandler<PostStudentProps> = async (data) => {
// 		const { firstName, lastName, phoneNumber,  email } = data;
// 		if (
// 			firstName !== '' &&
// 			lastName !== '' &&
// 			groupName.length > 0 &&
// 			formatName.length > 0 &&
// 			phoneNumber !== '' &&
// 			email !== ''
// 			// password !== ''
// 		) {
// 			const newStudent = {
// 				firstName: firstName,
// 				lastName: lastName,
// 				groupName: groupName,
// 				studyFormat: formatName,
// 				phoneNumber: phoneNumber,
// 				email: email,
// 				// password: password,
// 				isBlock: true
// 			};
// 			await postStudentTable(newStudent);
// 			handleClose();
// 			reset();
// 			setPersonName([]);
// 			setFormatName([]);
// 			// notifySuccess();
// 		} else {
// 			// notify();
// 		}
// 	};

// 	return (
// 		<form onSubmit={handleSubmit(onSubmit)}>
// 			{/* <ToastContainer /> */}
// 			<Modal
// 				open={open}
// 				onClose={handleClose}
// 				aria-labelledby="modal-modal-title"
// 				aria-describedby="modal-modal-description"
// 			>
// 				<Box sx={style} className={scss.main_modal}>
// 					<Typography
// 						className={scss.text}
// 						id="modal-modal-title"
// 						variant="h6"
// 						component="h2"
// 					>
// 						<p className={scss.com_text}>Добавить студента</p>
// 					</Typography>

// 					<Box className={scss.input_button_card}>
// 						<form
// 							style={{ width: '100%', maxWidth: '470px' }}
// 							onSubmit={handleSubmit(onSubmit)}
// 						>
// 							<div className={scss.input}>
// 								<Controller
// 									name="firstName"
// 									control={control}
// 									defaultValue=""
// 									render={({ field }) => (
// 										<Input
// 											size="medium"
// 											{...field}
// 											type="text"
// 											width="100%"
// 											placeholder="First Name"
// 										/>
// 									)}
// 								/>
// 								<Controller
// 									name="lastName"
// 									control={control}
// 									defaultValue=""
// 									render={({ field }) => (
// 										<Input
// 											size="medium"
// 											{...field}
// 											type="text"
// 											width="100%"
// 											placeholder="Last Name"
// 										/>
// 									)}
// 								/>
// 								<Controller
// 									name="phoneNumber"
// 									control={control}
// 									defaultValue=""
// 									render={({ field }) => (
// 										<Input
// 											size="medium"
// 											{...field}
// 											type="number"
// 											width="100%"
// 											placeholder="Phone Number"
// 										/>
// 									)}
// 								/>{' '}
// 								<Controller
// 									name="email"
// 									control={control}
// 									defaultValue=""
// 									render={({ field }) => (
// 										<Input
// 											size="medium"
// 											{...field}
// 											type="email"
// 											width="100%"
// 											placeholder="Email"
// 										/>
// 									)}
// 								/>
// 								{/* <Controller
// 									name="password"
// 									control={control}
// 									defaultValue=""
// 									render={({ field }) => (
// 										<OutlinedInput
// 											style={{ width: '100%', maxWidth: '470px' }}
// 											{...field}
// 											className={scss.OutlinedInputEyes}
// 											placeholder="Password"
// 											type={showSecondPassword ? 'text' : 'password'}
// 											endAdornment={
// 												<InputAdornment position="end">
// 													<IconButton
// 														aria-label="toggle password visibility"
// 														onClick={handleClickShowSecondPassword}
// 														onMouseDown={handleMouseDownSecondPassword1}
// 														edge="end"
// 													>
// 														{showSecondPassword ? (
// 															<IconOpen_Eye />
// 														) : (
// 															<IconClosed />
// 														)}
// 													</IconButton>
// 												</InputAdornment>
// 											}
// 										/>
// 									)}
// 								/> */}
// 								<FormControl sx={{ width: 300 }}>
// 									<InputLabel id="demo-multiple-checkbox-label">
// 										Группа
// 									</InputLabel>
// 									<Select
// 										style={{ borderRadius: '12px' }}
// 										labelId="demo-multiple-checkbox-label"
// 										id="demo-multiple-checkbox"
// 										multiple
// 										value={groupName}
// 										onChange={handleChange}
// 										input={<OutlinedInput label="group" />}
// 										renderValue={(selected) => selected.join(', ')}
// 										MenuProps={MenuProps}
// 									>
// 										{names.map((name) => (
// 											<MenuItem key={name} value={name}>
// 												<Checkbox checked={groupName.indexOf(name) > -1} />
// 												<ListItemText primary={name} />
// 											</MenuItem>
// 										))}
// 									</Select>
// 								</FormControl>
// 								<FormControl sx={{ width: 300 }}>
// 									<InputLabel id="demo-multiple-checkbox-label">
// 										Формат обучения
// 									</InputLabel>
// 									<Select
// 										style={{ borderRadius: '12px' }}
// 										labelId="demo-multiple-checkbox-label"
// 										id="demo-multiple-checkbox"
// 										multiple
// 										value={formatName}
// 										onChange={handleFormatChange}
// 										input={<OutlinedInput label="TrainingFormat" />}
// 										renderValue={(selected) => selected.join(', ')}
// 										MenuProps={MenuProps}
// 									>
// 										{formats.map((name) => (
// 											<MenuItem key={name} value={name}>
// 												<Checkbox checked={formatName.indexOf(name) > -1} />
// 												<ListItemText primary={name} />
// 											</MenuItem>
// 										))}
// 									</Select>
// 								</FormControl>
// 							</div>
// 							<div
// 								style={{
// 									width: '100%',
// 									display: 'flex',
// 									justifyContent: 'flex-end',
// 									alignItems: 'center',
// 									paddingBottom: '10px',
// 									paddingTop: '13px',
// 									gap: '10px'
// 								}}
// 							>
// 								<ButtonCancel
// 									type="submit"
// 									disabled={false}
// 									onClick={handleClose}
// 									width="117px"
// 								>
// 									Отмена
// 								</ButtonCancel>
// 								<ButtonSave
// 									type="submit"
// 									width="117px"
// 									disabled={false}
// 									onClick={handleSubmit(onSubmit)}
// 								>
// 									Отправить
// 								</ButtonSave>
// 							</div>
// 						</form>
// 					</Box>
// 				</Box>
// 			</Modal>
// 		</form>
// 	);
// };

// export default ModalAddStudent;

import { FC, useState } from 'react';
import { Modal, Box, Typography } from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Input from '@/src/ui/customInput/Input.tsx';
import ButtonSave from '@/src/ui/customButton/ButtonSave.tsx';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel.tsx';
import scss from './StudentStyle.module.scss';
import { usePostStudentTableMutation } from '@/src/redux/api/admin/student';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { InputLabel } from '@mantine/core';

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

const names = [
	'Java 14',
	'JS 14',
	'Java 13',
	'JS 13',
	'Java 12',
	'JS 12',
	'Flutter',
	'English lesson'
];

const formats = ['Online', 'OFFLINE'];

const ModalAddStudent: FC<StudentAddProps> = ({ open, handleClose }) => {
	const { handleSubmit, control, reset } = useForm<PostStudentProps>();
	const [postStudentTable] = usePostStudentTableMutation();
	const [groupName, setPersonName] = useState<string[]>([]);
	const [formatName, setFormatName] = useState<string[]>([]);

	const handleChange = (event: SelectChangeEvent<typeof groupName>) => {
		const {
			target: { value }
		} = event;
		setPersonName(typeof value === 'string' ? value.split(',') : value);
	};

	const handleFormatChange = (event: SelectChangeEvent<typeof formatName>) => {
		const {
			target: { value }
		} = event;
		setFormatName(typeof value === 'string' ? value.split(',') : value);
	};

	const onSubmit: SubmitHandler<PostStudentProps> = async (data) => {
		const { firstName, lastName, phoneNumber, email } = data;
		if (
			firstName !== '' &&
			lastName !== '' &&
			groupName.length > 0 &&
			formatName.length > 0 &&
			phoneNumber !== '' &&
			email !== ''
		) {
			const newStudent = {
				firstName: firstName,
				lastName: lastName,
				groupName: groupName,
				studyFormat: formatName,
				phoneNumber: phoneNumber,
				email: email,
				isBlock: true
			};
			try {
				console.log('Sending data:', newStudent);
				const response = await postStudentTable(newStudent);
				console.log('Response:', response);
				handleClose();
				reset();
				setPersonName([]);
				setFormatName([]);
			} catch (error) {
				console.error('Error:', error);
			}
		} else {
			console.log('Validation failed');
		}
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
										type="number"
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
							<FormControl sx={{ width: 300 }}>
								<InputLabel id="demo-multiple-checkbox-label">
									Группа
								</InputLabel>
								<Select
									style={{ borderRadius: '12px' }}
									labelId="demo-multiple-checkbox-label"
									id="demo-multiple-checkbox"
									multiple
									value={groupName}
									onChange={handleChange}
									input={<OutlinedInput label="group" />}
									renderValue={(selected) => selected.join(', ')}
									MenuProps={MenuProps}
								>
									{names.map((name) => (
										<MenuItem key={name} value={name}>
											<Checkbox checked={groupName.indexOf(name) > -1} />
											<ListItemText primary={name} />
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<FormControl sx={{ width: 300 }}>
								<InputLabel id="demo-multiple-checkbox-label">
									Формат обучения
								</InputLabel>
								<Select
									style={{ borderRadius: '12px' }}
									labelId="demo-multiple-checkbox-label"
									id="demo-multiple-checkbox"
									multiple
									value={formatName}
									onChange={handleFormatChange}
									input={<OutlinedInput label="TrainingFormat" />}
									renderValue={(selected) => selected.join(', ')}
									MenuProps={MenuProps}
								>
									{formats.map((name) => (
										<MenuItem key={name} value={name}>
											<Checkbox checked={formatName.indexOf(name) > -1} />
											<ListItemText primary={name} />
										</MenuItem>
									))}
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
