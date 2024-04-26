/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonSave from '@/src/ui/customButton/ButtonSave.tsx';
import scss from './Style.module.scss';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel.tsx';
import ButtonWithPlus from '../customButton/ButtonWithPlus';
import { usePostTeacherMutation } from '@/src/redux/api/admin/teacher';
import Input from '../customInput/Input';
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { IconClosed, IconOpen_Eye } from '@/src/assets/icons';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
	'js-12',
	'java-12',
	'js-13',
	'java-13',
	'js-14',
	'java-14',
	'js-15',
	'java-15',
	'Virginia Andrews',
	'Kelly Snyder'
];

const profestion = [
	'js instructor',
	'java  instructor',
	'java mentor',
	'js mentor'
];

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 581,
	height: 680,
	backgroundColor: '#ffffff',
	bgColor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '12px'
};

const ModalAddTeacher = () => {
	const { control, handleSubmit, reset } = useForm<IFormInputs>();
	const [open, setOpen] = useState<boolean>(false);
	const [postTeacher] = usePostTeacherMutation();
	const [personName, setPersonName] = React.useState<string[]>([]);
	const [specialization, setSpecialization] = useState<string[]>([]);
	const [showSecondPassword, setShowSecondPassword] = useState<boolean>(false);

	const handleOpen = (e: React.MouseEvent<HTMLFormElement>) => {
		setOpen(true);
		e.preventDefault();
	};

	const handleClickShowSecondPassword = () =>
		setShowSecondPassword((show) => !show);

	const handleMouseDownSecondPassword1 = (
		event: React.MouseEvent<HTMLButtonElement>
	) => event.preventDefault();

	const handleClose = () => {
		setOpen(false);
		setOpen(false);
	};
	const notify = () =>
		toast.error('Пожалуйста, заполните все обязательные поля');
	const notifySuccess = () => toast.success('Успешно добовлено');

	const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
		const { firstName, lastName, email, phoneNumber, login } = data;

		if (
			firstName !== '' &&
			lastName !== '' &&
			email !== '' &&
			phoneNumber !== '' &&
			login !== '' &&
			specialization.length > 0
		) {
			const postData = {
				firstName: firstName,
				lastName: lastName,
				email: email,
				phoneNumber: phoneNumber,
				login: login,
				specialization: specialization,
				group: personName
			};
			postTeacher(postData);
			handleClose();
			reset();
			setPersonName([]);
			setSpecialization([]);
			notifySuccess();
		} else {
			notify();
		}
	};

	const handleChange = (event: SelectChangeEvent<typeof personName>) => {
		const {
			target: { value }
		} = event;
		setPersonName(typeof value === 'string' ? value.split(',') : value);
	};
	const handleChangeAge = (event: SelectChangeEvent<typeof personName>) => {
		const {
			target: { value }
		} = event;
		setSpecialization(value as string[]);
	};

	return (
		<form onSubmit={handleOpen}>
			<ToastContainer />
			<div className={scss.button}>
				<ButtonWithPlus type="submit" disabled={false}>
					Добавить учителя
				</ButtonWithPlus>
			</div>
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
						<p className={scss.comText}>Добавление учителя</p>
					</Typography>

					<Box className={scss.input_buttonCard}>
						<div className={scss.input}>
							<Controller
								name="firstName"
								control={control}
								defaultValue=""
								render={({ field }) => (
									<Input
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
										className={scss.OutlinedInputEyes}
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
							<FormControl className={scss.seclect}>
								<InputLabel id="demo-multiple-checkbox-label">
									Specialization
								</InputLabel>
								<Select
									className={scss.seclect}
									labelId="demo-multiple-checkbox-label"
									id="demo-multiple-checkbox"
									multiple
									value={specialization}
									onChange={handleChangeAge}
									input={<OutlinedInput label="Tag" />}
									renderValue={(selected) => selected.join(', ')}
									MenuProps={MenuProps}
								>
									{profestion.map((name) => (
										<MenuItem key={name} value={name}>
											<Checkbox
												checked={
													specialization && specialization.indexOf(name) > -1
												}
											/>
											<ListItemText primary={name} />
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<div>
								<FormControl className={scss.seclect}>
									<InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
									<Select
										className={scss.seclect}
										labelId="demo-multiple-checkbox-label"
										id="demo-multiple-checkbox"
										multiple
										value={personName}
										onChange={handleChange}
										input={<OutlinedInput label="Tag" />}
										renderValue={(selected) => selected.join(', ')}
										MenuProps={MenuProps}
									>
										{names.map((name) => (
											<MenuItem key={name} value={name}>
												<Checkbox checked={personName.indexOf(name) > -1} />
												<ListItemText primary={name} />
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</div>
						</div>

						<div className={scss.buttonAdd2}>
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
