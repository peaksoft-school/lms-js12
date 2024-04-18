import { useState } from 'react';
import {
	Button,
	Modal,
	Box,
	Typography,
	Select,
	MenuItem
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import ButtonSave from '@/src/ui/customButton/ButtonSave.tsx';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel.tsx';
import scss from './Style.module.scss';
import Input from '../customInput/Input';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 581,
	height: 600,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '12px'
};

const ModalAddStudent = () => {
	const { handleSubmit, control } = useForm();
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const onSubmit = () => {
		handleClose();
	};

	return (
		<form>
			<Button onClick={handleOpen}>Open modal Добавить студента</Button>
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
						<p className={scss.comText}>Добавление студента</p>
					</Typography>

					<Box className={scss.input_buttonCard}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className={scss.input}>
								<Controller
									name="name"
									control={control}
									defaultValue=""
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
									name="surname"
									control={control}
									defaultValue=""
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
									defaultValue=""
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
									defaultValue=""
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
									name="password"
									control={control}
									defaultValue=""
									render={({ field }) => (
										<Select
											{...field}
											fullWidth
											placeholder="Пароль"
											className={scss.select}
										>
											<MenuItem value="">Выберите пароль</MenuItem>
											<MenuItem value="password1">Пароль 1</MenuItem>
											<MenuItem value="password2">Пароль 2</MenuItem>
											<MenuItem value="password3">Пароль 3</MenuItem>
										</Select>
									)}
								/>
								<Controller
									name="specialization"
									control={control}
									defaultValue=""
									render={({ field }) => (
										<Select
											{...field}
											fullWidth
											placeholder="Специализация"
											className={scss.select}
										>
											<MenuItem value="">Выберите специализацию</MenuItem>
											<MenuItem value="specialization1">
												Специализация 1
											</MenuItem>
											<MenuItem value="specialization2">
												Специализация 2
											</MenuItem>
											<MenuItem value="specialization3">
												Специализация 3
											</MenuItem>
										</Select>
									)}
								/>
							</div>
							<div className={scss.buttony}>
								<ButtonCancel
									type="submit"
									disabled={false}
									onClick={handleClose}
									width="117px"
								>
									Отмена
								</ButtonCancel>
								<ButtonSave
									type="submit"
									width="117px"
									disabled={false}
									onClick={handleOpen}
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

export default ModalAddStudent;
