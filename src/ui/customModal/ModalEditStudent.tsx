/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react';
import {
	Modal,
	Box,
	Typography,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	SelectChangeEvent,
	OutlinedInput,
	Theme,
	useTheme
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import ButtonSave from '@/src/ui/customButton/ButtonSave.tsx';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel.tsx';
import scss from './StudentStyle.module.scss';
import {
	useGetStudentTableQuery,
	usePatchStudentTableMutation
} from '@/src/redux/api/admin/student';
import Input from '../customInput/Input';
import { useGetGroupQuery } from '@/src/redux/api/admin/groups';

interface Student {
	id: number;
	fullName: string;
	email: string;
	groupName: string;
	phoneNumber: string;
	studyFormat: string;
	isBlock: boolean;
}

interface PatchStudentProps {
	firstName: string;
	lastName: string;
	groupName: string;
	studyFormat: string;
	phoneNumber: string;
	email: string;
}

interface EditModalProps {
	handleClose: () => void;
	open: boolean;
	saveIdElement: number | null;
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

function getStyles(name: string, personName: string, theme: Theme) {
	return {
		fontWeight:
			personName === name
				? theme.typography.fontWeightMedium
				: theme.typography.fontWeightRegular
	};
}

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 581,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '12px'
};

const ModalEditStudent: FC<EditModalProps> = ({
	handleClose,
	open,
	saveIdElement
}) => {
	event?.preventDefault();
	const {
		handleSubmit,
		control,
		reset,
		formState: { errors }
	} = useForm<PatchStudentProps>();
	const [patchStudentTable] = usePatchStudentTableMutation();
	const { data: studentData } = useGetStudentTableQuery();
	const students = studentData ?? { students: [], page: 1, size: 0 };
	const [formatName, setFormatName] = useState<string>('');
	const theme = useTheme();
	const [personName, setPersonName] = useState<string>('');

	const handleChange = (event: SelectChangeEvent<string>) => {
		setPersonName(event.target.value);
	};

	const { data: groupData } = useGetGroupQuery({
		page: '1',
		size: '100'
	});

	const handleFormatChange = (event: SelectChangeEvent<string>) => {
		setFormatName(event.target.value);
	};

	const finder = students.students.find(
		(student: Student) => student.id === saveIdElement
	);

	const onSubmit = async (data: PatchStudentProps) => {
		const editStudent = {
			...data,
			groupName: personName
		};
		await patchStudentTable({
			editStudent,
			saveIdElement
		});
		handleClose();
	};

	const fullName = finder?.fullName || '';
	const nameParts = fullName.trim().split(' ');

	const firstName = nameParts[0] || '';
	const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

	useEffect(() => {
		reset({
			firstName: firstName,
			lastName: lastName,
			phoneNumber: finder?.phoneNumber,
			email: finder?.email,
			groupName: finder?.groupName,
			studyFormat: finder?.studyFormat
		});
	}, [finder, reset]);

	return (
		<form>
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
						<p className={scss.comText}>Редактировать </p>
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
									rules={{
										required: 'Имя обязателен для заполнения'
									}}
									render={({ field }) => (
										<Input
											size="medium"
											{...field}
											width="100%"
											type="text"
											placeholder="Имя"
											error={!!errors.firstName}
										/>
									)}
								/>
								<Controller
									name="lastName"
									control={control}
									rules={{
										required: 'Фамилия обязателен для заполнения'
									}}
									render={({ field }) => (
										<Input
											size="medium"
											width="100%"
											{...field}
											type="text"
											placeholder="Фамилия"
											error={!!errors.lastName}
										/>
									)}
								/>
								<Controller
									name="phoneNumber"
									control={control}
									rules={{
										required: 'Номер обязателен для заполнения'
									}}
									render={({ field }) => (
										<Input
											size="medium"
											{...field}
											type="text"
											width="100%"
											placeholder="+996"
											error={!!errors.phoneNumber}
										/>
									)}
								/>
								<Controller
									rules={{
										required: 'Email обязателен для заполнения'
									}}
									name="email"
									control={control}
									render={({ field }) => (
										<Input
											size="medium"
											{...field}
											width="100%"
											type="email"
											placeholder="Email"
											error={!!errors.email}
										/>
									)}
								/>
								<FormControl error={!!errors.groupName} fullWidth>
									<InputLabel id="demo-multiple-name-label">Группа</InputLabel>
									<Controller
										name="groupName"
										control={control}
										defaultValue=""
										rules={{ required: 'Группа обязательна для заполнения' }}
										render={({ field }) => (
											<Select
												{...field}
												style={{ borderRadius: '12px' }}
												labelId="demo-multiple-name-label"
												id="demo-multiple-name"
												input={<OutlinedInput label="groupName" />}
												MenuProps={MenuProps}
												onChange={handleChange}
											>
												{groupData?.groupResponses.map((name) => (
													<MenuItem
														key={name.id}
														value={name.title}
														style={getStyles(name.title, field.value, theme)}
													>
														{name.title}
													</MenuItem>
												))}
											</Select>
										)}
									/>
									{errors.groupName && (
										<p style={{ color: 'red' }}>{errors.groupName.message}</p>
									)}
								</FormControl>

								<FormControl error={!!errors.studyFormat} fullWidth>
									<InputLabel id="study-format-label">
										Формат обучения
									</InputLabel>
									<Controller
										name="studyFormat"
										control={control}
										defaultValue=""
										rules={{
											required: 'Формат обучения обязателен для заполнения'
										}}
										render={({ field }) => (
											<Select
												{...field}
												style={{ borderRadius: '12px' }}
												labelId="study-format-label"
												id="study-format-select"
												input={<OutlinedInput label="studyFormat" />}
												MenuProps={MenuProps}
												value={formatName}
												onChange={handleFormatChange}
											>
												<MenuItem value="ONLINE">ONLINE</MenuItem>
												<MenuItem value="OFFLINE">OFFLINE</MenuItem>
											</Select>
										)}
									/>
									{errors.studyFormat && (
										<p style={{ color: 'red' }}>{errors.studyFormat.message}</p>
									)}
								</FormControl>

								{/* <FormControl fullWidth>
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
								</FormControl> */}
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
									onClick={() => {}}
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
		</form>
	);
};

export default ModalEditStudent;
