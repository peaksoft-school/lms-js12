// import { useState } from 'react';
// import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Input from '../../ui/CustomInput/Input';
// import ButtonSave from './../../ui/CustomButton/ButtonSave';
// import scss from './AdminModal.module.scss';
// import ButtonCancel from '@/src/ui/CustomButton/ButtonCancel';
// import { useForm } from 'react-hook-form';

// const style = {
// 	position: 'absolute',
// 	top: '50%',
// 	left: '50%',
// 	transform: 'translate(-50%, -50%)',
// 	width: 581,
// 	height: 550,
// 	bgcolor: 'background.paper',
// 	boxShadow: 24,
// 	p: 4,
// 	borderRadius: '12px'
// };

// const ModalAddTeacher = () => {
// 	const { register } = useForm();
// 	const [open, setOpen] = useState<boolean>(false);

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
// 			<Button onClick={handleOpen}>Open modal Добавить учителя</Button>
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
// 						<p className={scss.comText}>Добавление учителя</p>
// 					</Typography>

// 					<Box className={scss.input_buttonCard}>
// 						<div className={scss.input}>
// 							<Input
// 								type="text"
// 								{...register('firstName')}
// 								width="100%"
// 								placeholder="Имя"
// 							/>
// 							<Input
// 								type="text"
// 								{...register('lastName')}
// 								width="100%"
// 								placeholder="Фамилия"
// 							/>
// 							<Input
// 								type="text"
// 								{...register('Name')}
// 								width="100%"
// 								placeholder="+996___ __ __ __"
// 							/>
// 							<Input
// 								type="text"
// 								{...register('setName')}
// 								width="100%"
// 								placeholder="Email"
// 							/>
// 							<Input
// 								type="text"
// 								{...register('userName')}
// 								width="100%"
// 								placeholder="Пароль"
// 							/>
// 							<Input
// 								type="text"
// 								{...register('registerName')}
// 								width="100%"
// 								placeholder="Специализация"
// 							/>
// 						</div>
// 						<div className={scss.buttonAdd}>
// 							<ButtonCancel
// 								type="submit"
// 								disabled={false}
// 								onClick={handleSubmit}
// 							>
// 								Отмена
// 							</ButtonCancel>
// 							<ButtonSave
// 								width="117px"
// 								type="submit"
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

// export default ModalAddTeacher;

import { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Input from '../../ui/CustomInput/Input';
import ButtonSave from './../../ui/CustomButton/ButtonSave';
import scss from './AdminModal.module.scss';
import ButtonCancel from '@/src/ui/CustomButton/ButtonCancel';
import { Controller, useForm } from 'react-hook-form';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 581,
	height: 550,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '12px'
};

const ModalAddTeacher = () => {
	const { control, handleSubmit } = useForm();
	const [open, setOpen] = useState<boolean>(false);

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
			<Button onClick={handleOpen}>Open modal Добавить учителя</Button>
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
										placeholder="Имя"
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
										placeholder="Фамилия"
									/>
								)}
							/>
							<Controller
								name="Name"
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
								name="setName"
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
								name="userName"
								control={control}
								defaultValue=""
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
								name="registerName"
								control={control}
								defaultValue=""
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
						<div className={scss.buttonAdd}>
							<ButtonCancel
								type="submit"
								disabled={false}
								onClick={handleSubmit(onSubmit)}
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
