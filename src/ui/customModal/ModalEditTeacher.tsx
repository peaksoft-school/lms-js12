/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, useForm } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonSave from '@/src/ui/customButton/ButtonSave.tsx';
import scss from './Style.module.scss';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel.tsx';
import {
	useGetTeacherQuery,
	usePatchTeacherMutation
} from '@/src/redux/api/teacher';
import Input from '../customInput/Input';
import {
	Checkbox,
	FormControl,
	InputLabel,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Select,
	SelectChangeEvent
} from '@mui/material';
import { useEffect, useState } from 'react';

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

const groups = [
	'js-12',
	'js-13',
	'java-12',
	'java-13',
	'Omar Alexander',
	'Carlos Abbott',
	'Miriam Wagner',
	'Bradley Wilkerson',
	'Virginia Andrews',
	'Kelly Snyder'
];
const profestion = [
	'js instructor',
	'java  instructor',
	'java mentor',
	'js mentor'
];
interface IFormInputs {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	login: string;
	specialization: string[];
	group: string;
}

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 581,
	height: 650,
	backgroundColor: '#ffffff',
	bgColor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '12px'
};
interface modalProps {
	openModalEdit: boolean;
	closeModalEdit: (openModalEdit: boolean) => void;
	deleteById: number | null;
}
const ModalEditTeacher: React.FC<modalProps> = ({
	openModalEdit,
	closeModalEdit,
	deleteById
}) => {
	const { control, handleSubmit, reset } = useForm<IFormInputs>();
	const [patchTeacher] = usePatchTeacherMutation();
	const { data } = useGetTeacherQuery();
	const find = data?.find((id) => id._id === deleteById);
	const [specialization, setSpecialization] = useState<string[]>([]);
	const [personName, setPersonName] = useState<string[]>([]);

	useEffect(() => {
		if (find) {
			setSpecialization(
				Array.isArray(find.specialization) ? find.specialization : []
			);
			setPersonName(Array.isArray(find.group) ? find.group : []);
		}
	}, [find]);

	const onSubmit = async (data: IFormInputs) => {
		const updateTeacher = {
			...data,
			specialization,
			group: personName
		};
		await patchTeacher({ updateTeacher, deleteById });
		closeModalEdit(false);
	};

	const handleChange = (event: SelectChangeEvent<typeof personName>) => {
		const {
			target: { value }
		} = event;
		setPersonName(value as string[]);
	};
	const handleChangeAge = (event: SelectChangeEvent<typeof specialization>) => {
		const {
			target: { value }
		} = event;
		setSpecialization(value as string[]);
	};

	useEffect(() => {
		reset({
			email: find?.email,
			firstName: find?.firstName,
			lastName: find?.lastName,
			group: find?.group,
			phoneNumber: find?.phoneNumber,
			login: find?.login,
			specialization: find?.specialization
		});
	}, [find]);

	return (
		<form onSubmit={close} className={scss.form}>
			<Modal
				open={openModalEdit}
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
						<div className={scss.comText}>
							Редактировать учителя по имени {find?.firstName}
							{find?.lastName}
						</div>
					</Typography>

					<Box className={scss.input_buttonCard}>
						<div className={scss.input}>
							<Controller
								name="firstName"
								control={control}
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
								render={({ field }) => (
									<Input
										{...field}
										type="text"
										width="100%"
										placeholder="Phone Number"
									/>
								)}
							/>
							<Controller
								name="email"
								control={control}
								render={({ field }) => (
									<Input
										{...field}
										type="text"
										width="100%"
										placeholder="Email"
									/>
								)}
							/>
							<Controller
								name="login"
								control={control}
								render={({ field }) => (
									<Input
										{...field}
										type="text"
										width="100%"
										placeholder="Password"
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
									<InputLabel id="demo-multiple-checkbox-label">
										Group
									</InputLabel>
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
										{groups.map((name) => (
											<MenuItem key={name} value={name}>
												<Checkbox
													checked={personName && personName.indexOf(name) > -1}
												/>
												<ListItemText primary={name} />
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</div>
							<div className={scss.EditButtons}>
								<ButtonCancel
									type="submit"
									disabled={false}
									onClick={() => closeModalEdit(false)}
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
						</div>
					</Box>
				</Box>
			</Modal>
		</form>
	);
};

export default ModalEditTeacher;
