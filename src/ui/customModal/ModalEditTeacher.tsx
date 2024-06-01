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
} from '@/src/redux/api/admin/teacher';
import Input from '../customInput/Input';
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
	height: 580,
	backgroundColor: '#fff',
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
	const find = data?.instructorResponses.find((el) => el.id === deleteById);
	const [personName, setPersonName] = useState<string[]>([]);

	const onSubmit = async (data: IFormInputs) => {
		const updateTeacher = {
			...data,
			courseIds: personName
		};
		await patchTeacher({ updateTeacher, deleteById });
		closeModalEdit(false);
	};

	const fullName = find?.fullName || '';
	const nameParts = fullName.trim().split(' ');

	const firstName = nameParts[0] || '';
	const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

	useEffect(() => {
		reset({
			firstName: firstName,
			lastName: lastName,
			email: find?.email,
			phoneNumber: find?.phoneNumber,
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
				<Box sx={style} className={scss.main_modal}>
					<Typography
						className={scss.text}
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						<div className={scss.comText}>Редактировать</div>
					</Typography>

					<Box className={scss.input_button_card}>
						<div className={scss.input}>
							<Controller
								name="firstName"
								control={control}
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
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="text"
										width="100%"
										placeholder="+996"
									/>
								)}
							/>
							<Controller
								name="email"
								control={control}
								render={({ field }) => (
									<Input
										size="medium"
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
										size="medium"
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
								defaultValue=""
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
							{/* <div>
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
							</div> */}
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
