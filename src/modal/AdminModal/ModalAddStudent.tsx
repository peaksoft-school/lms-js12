// import { useState } from 'react';
// import {
// 	Button,
// 	Modal,
// 	Box,
// 	Typography,
// 	Select,
// 	MenuItem
// } from '@mui/material';
// import Input from '../../ui/CustomInput/Input';
// import ButtonSave from '../../ui/CustomButton/ButtonSave';
// import ButtonCancel from '@/src/ui/CustomButton/ButtonCancel';
// import scss from './AdminModal.module.scss';

// const style = {
// 	position: 'absolute',
// 	top: '50%',
// 	left: '50%',
// 	transform: 'translate(-50%, -50%)',
// 	width: 581,
// 	height: 555,
// 	bgcolor: 'background.paper',
// 	boxShadow: 24,
// 	p: 4,
// 	borderRadius: '12px'
// };

// const ModalAddStudent = () => {
// 	const [open, setOpen] = useState<boolean>(false);
// 	const [name, setName] = useState<string>('');
// 	const [surname, setSurname] = useState<string>('');
// 	const [phoneNumber, setPhoneNumber] = useState<string>('');
// 	const [email, setEmail] = useState<string>('');
// 	const [password, setPassword] = useState<string>('');
// 	const [specialization, setSpecialization] = useState<string>('');

// 	const handleOpen = () => {
// 		setOpen(true);
// 	};

// 	const handleClose = () => {
// 		setOpen(false);
// 	};

// 	const handleSubmit = () => {
// 		handleClose();
// 	};

// 	return (
// 		<div>
// 			<Button onClick={handleOpen}>Open modal Добавить stuudenta</Button>
// 			<Modal
// 				open={open}
// 				onClose={handleClose}
// 				aria-labelledby="modal-modal-title"
// 				aria-describedby="modal-modal-description"
// 			>
// 				<Box sx={style} className={scss.MainModal}>
// 					<Typography
// 						className={scss.text}
// 						id="modal-modal-title"
// 						variant="h6"
// 						component="h2"
// 					>
// 						<p className={scss.comText}>Добавление студента</p>
// 					</Typography>

// 					<Box className={scss.input_buttonCard}>
// 						<div className={scss.input}>
// 							<Input
// 								type="text"
// 								value={name}
// 								width="100%"
// 								placeholder="Имя"
// 								onChange={(e) => setName(e.target.value)}
// 							/>
// 							<Input
// 								type="text"
// 								value={surname}
// 								width="100%"
// 								placeholder="Фамилия"
// 								onChange={(e) => setSurname(e.target.value)}
// 							/>
// 							<Input
// 								type="text"
// 								value={phoneNumber}
// 								width="100%"
// 								placeholder="+996___ __ __ __"
// 								onChange={(e) => setPhoneNumber(e.target.value)}
// 							/>
// 							<Input
// 								type="text"
// 								value={email}
// 								width="100%"
// 								placeholder="Email"
// 								onChange={(e) => setEmail(e.target.value)}
// 							/>
// 							<div className={scss.selectDiv}>
// 								<Select
// 									value={password}
// 									onChange={(e) => setPassword(e.target.value)}
// 									fullWidth
// 									placeholder="Пароль"
// 									className={scss.select}
// 								>
// 									<MenuItem value="">Выберите пароль</MenuItem>
// 									<MenuItem value="password1">Пароль 1</MenuItem>
// 									<MenuItem value="password2">Пароль 2</MenuItem>
// 									<MenuItem value="password3">Пароль 3</MenuItem>
// 								</Select>
// 								<Select
// 									value={specialization}
// 									onChange={(e) => setSpecialization(e.target.value)}
// 									fullWidth
// 									placeholder="Специализация"
// 									className={scss.select}
// 								>
// 									<MenuItem value="">Выберите специализацию</MenuItem>
// 									<MenuItem value="specialization1">Специализация 1</MenuItem>
// 									<MenuItem value="specialization2">Специализация 2</MenuItem>
// 									<MenuItem value="specialization3">Специализация 3</MenuItem>
// 								</Select>
// 							</div>
// 						</div>
// 						<div className={scss.buttonAdd}>
// 							<ButtonCancel
// 								type="submit"
// 								disabled={false}
// 								onClick={handleClose}
// 							>
// 								Отмена
// 							</ButtonCancel>
// 							<ButtonSave
// 								type="submit"
// 								width="117px"
// 								disabled={false}
// 								onClick={handleSubmit}
// 							>
// 								Отправить
// 							</ButtonSave>
// 						</div>
// 					</Box>
// 				</Box>
// 			</Modal>
// 		</div>
// 	);
// };

// export default ModalAddStudent;




















import { useState } from 'react';
import {
	Button,
	Modal,
	Box,
	Typography,
	Select,
	MenuItem
} from '@mui/material';
import Input from '../../ui/CustomInput/Input';
import ButtonSave from '../../ui/CustomButton/ButtonSave';
import ButtonCancel from '@/src/ui/CustomButton/ButtonCancel';
import scss from './AdminModal.module.scss';
import { useForm, Controller } from 'react-hook-form';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 581,
	height: 555,
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
		// console.log(data); // Обработка данных формы
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
									type="button"
									disabled={false}
									onClick={handleClose}
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
