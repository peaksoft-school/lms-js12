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
import * as React from 'react';
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
interface IFormInputs {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	login: string;
	specialization: string;
	group: string;
}

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 581,
	height: 700,
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
	const { control, handleSubmit } = useForm<IFormInputs>();
	const [patchTeacher] = usePatchTeacherMutation();
	const { data } = useGetTeacherQuery();
	const find = data?.find((id) => id._id === deleteById);
	const [personName, setPersonName] = React.useState<string[]>(find?.group);

	const onSubmit = async (data: IFormInputs) => {
		const updateTeacher = { 
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			phoneNumber: data.phoneNumber,
			login: data.login,
			specialization: data.specialization,
			group: personName
		};
		await patchTeacher({ updateTeacher, deleteById });
		closeModalEdit(false);
	};

	const handleChange = (event: SelectChangeEvent<typeof personName>) => {
		const {
			target: { value }
		} = event;
		setPersonName(typeof value === 'string' ? value.split(',') : value);
	};

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
						<p className={scss.comText}>Добавление учителя</p>
					</Typography>

					<Box className={scss.input_buttonCard}>
						<div className={scss.input}>
							<Controller
								name="firstName"
								control={control}
								defaultValue={find?.firstName}
								render={({ field }) => (
									<Input
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
								defaultValue={find?.lastName}
								render={({ field }) => (
									<Input
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
								defaultValue={find?.phoneNumber}
								render={({ field }) => (
									<Input
										{...field}
										type="text"
										width="100%"
										placeholder="+996___ __ __ __"
									/>
								)}
							/>
							<Controller
								name="email"
								control={control}
								defaultValue={find?.email}
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
								defaultValue={find?.login}
								render={({ field }) => (
									<Input
										{...field}
										type="text"
										width="100%"
										placeholder="Пароль"
									/>
								)}
							/>
							<Controller
								name="specialization"
								control={control}
								defaultValue={find?.specialization}
								render={({ field }) => (
									<Input
										{...field}
										type="text"
										width="100%"
										placeholder="Специализация"
									/>
								)}
							/>
						</div>
						<div style={{ width: '470px' }}>
							<FormControl sx={{ m: 1, width: 470 }}>
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
						<div className={scss.buttonAdd}>
							<ButtonCancel
								type="submit"
								disabled={false}
								onClick={closeModalEdit(false)}
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

export default ModalEditTeacher;
