// import { useState } from 'react';
// import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Input from '../../ui/CustomInput/Input';
// import ButtonSave from '../../ui/CustomButton/ButtonSave';
// import scss from './Styled.module.scss';
// import ButtonCancel from '@/src/ui/CustomButton/ButtonCancel';
// import { useForm } from 'react-hook-form';

// const style = {
// 	position: 'absolute',
// 	top: '50%',
// 	left: '50%',
// 	transform: 'translate(-50%, -50%)',
// 	width: 541,
// 	height: 357,
// 	bgcolor: 'background.paper',
// 	boxShadow: 24,
// 	p: 4,
// 	borderRadius: '10px'
// };

// const ModalAddVideoLesson = () => {
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
// 			<Button onClick={handleOpen}>Open modal Добавить видеоурока</Button>
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
// 						<p className={scss.comText}>Добавить видеоурок</p>
// 					</Typography>
// 					<Box className={scss.input_buttonCard}>
// 						<div className={scss.input}>
// 							<Input
// 								type="text"
// 								{...register('firstName')}
// 								width="100%"
// 								placeholder="Введите название видеоурока"
// 							/>

// 							<Input
// 								type="text"
// 								{...register('lastName')}
// 								width="100%"
// 								placeholder="Введите описание видеоурока"
// 							/>

// 							<Input
// 								type="text"
// 								{...register('Name')}
// 								width="100%"
// 								placeholder="Вставьте ссылку на видеоурок"
// 							/>
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
// 								Добавить
// 							</ButtonSave>
// 						</div>
// 					</Box>
// 				</Box>
// 			</Modal>
// 		</div>
// 	);
// };

// export default ModalAddVideoLesson;

import { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Input from '../../ui/CustomInput/Input';
import ButtonSave from '../../ui/CustomButton/ButtonSave';
import scss from './Styled.module.scss';
import ButtonCancel from '@/src/ui/CustomButton/ButtonCancel';
import { Controller, useForm } from 'react-hook-form';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 541,
	height: 357,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '10px'
};

const ModalAddVideoLesson = () => {
	const { control, handleSubmit } = useForm();
	const [open, setOpen] = useState<boolean>(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const onSubmit = () => {
		// console.log(data);
		handleClose();
	};

	return (
		<form>
			<Button onClick={handleOpen}>Open modal Добавить видеоурока</Button>
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
						<p className={scss.comText}>Добавить видеоурок</p>
					</Typography>
					<Box className={scss.input_buttonCard}>
						<div className={scss.input}>
							<Controller
								name="firstName"
								control={control}
								defaultValue=""
								rules={{ required: 'Введите название видеоурока' }}
								render={({ field }) => (
									<Input
										{...field}
										type="text"
										width="100%"
										placeholder="Введите название видеоурока"
									/>
								)}
							/>

							<Controller
								name="lastName"
								control={control}
								defaultValue=""
								rules={{ required: 'Введите описание видеоурока' }}
								render={({ field }) => (
									<Input
										{...field}
										type="text"
										width="100%"
										placeholder="Введите описание видеоурока"
									/>
								)}
							/>

							<Controller
								name="Name"
								control={control}
								defaultValue=""
								rules={{ required: 'Вставьте ссылку на видеоурок' }}
								render={({ field }) => (
									<Input
										{...field}
										type="text"
										width="100%"
										placeholder="Вставьте ссылку на видеоурок"
									/>
								)}
							/>
						</div>

						<div className={scss.buttonAdd}>
							<ButtonCancel
								type="submit"
								disabled={false}
								onClick={handleClose}
							>
								Отмена
							</ButtonCancel>
							<ButtonSave
								type="submit"
								width="117px"
								disabled={false}
								onClick={handleSubmit(onSubmit)}
							>
								Добавить
							</ButtonSave>
						</div>
					</Box>
				</Box>
			</Modal>
		</form>
	);
};

export default ModalAddVideoLesson;
