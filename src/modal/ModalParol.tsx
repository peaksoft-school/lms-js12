// import React, { useState } from 'react';
// import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Input from '../ui/CustomInput/Input';
// import ButtonSave from '../ui/CustomButton/ButtonSave';
// import scss from './ModalParol.module.scss';

// const style = {
// 	position: 'absolute',
// 	top: '50%',
// 	left: '50%',
// 	transform: 'translate(-50%, -50%)',
// 	width: 541,
// 	height: 290,
// 	bgcolor: 'background.paper',
// 	boxShadow: 24,
// 	p: 4,
// 	borderRadius: '12px'
// };

// const ModalParol = () => {
// 	const [open, setOpen] = useState<boolean>(false);
// 	const [inputvalue, setInputValue] = useState<string>('');

// 	const handleOpen = () => {
// 		setOpen(true);
// 	};

// 	const handleClose = () => {
// 		setOpen(false);
// 	};

// 	const handleInputChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
// 		setInputValue(event.target.value);
// 	};
// 	const handleSubmit = () => {
// 		handleClose();
// 	};

// 	return (
// 		<div>
// 			<Button onClick={handleOpen}>Open modal Забыли пароль?</Button>
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
// 						<p className={scss.comText}>Забыли пароль?</p>
// 					</Typography>

// 					<Box className={scss.input_buttonCard}>
// 						<p className={scss.textarea}>
// 							Вам будет отправлено ссылка для сброса пароля
// 						</p>

// 						<div className={scss.input}>
// 							{' '}
// 							<Input
// 								type="text"
// 								value={inputvalue}
// 								width="100%"
// 								placeholder="Введите ваш Email"
// 								onChange={handleInputChange1}
// 							/>
// 						</div>
// 						<div className={scss.buttonAdd}>
// 							<ButtonSave
// 								type="submit"
// 								width="100%"
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

// export default ModalParol;

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Input from '../ui/CustomInput/Input';
import ButtonSave from '../ui/CustomButton/ButtonSave';
import scss from './ModalParol.module.scss';
import { Controller, useForm } from 'react-hook-form';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 541,
	height: 290,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '12px'
};

const ModalParol = () => {
	const [open, setOpen] = useState<boolean>(false);
	const { control, handleSubmit } = useForm();
	const [inputvalue, setInputValue] = useState<string>('');

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleInputChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};
	const onSubmit = () => {
		handleClose();
	};

	return (
		<form>
			<Button onClick={handleOpen}>Open modal Забыли пароль?</Button>
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
						<p className={scss.comText}>Забыли пароль?</p>
					</Typography>

					<Box className={scss.input_buttonCard}>
						<p className={scss.textarea}>
							Вам будет отправлено ссылка для сброса пароля
						</p>

						<div className={scss.input}>
							<Controller
								name="email"
								control={control}
								defaultValue=""
								render={({ field }) => (
									<Input
										{...field}
										type="text"
										value={inputvalue}
										width="100%"
										placeholder="Введите ваш Email"
										onChange={(e) => {
											field.onChange(e);
											handleInputChange1(e);
										}}
									/>
								)}
							/>
						</div>
						<div className={scss.buttonAdd}>
							<ButtonSave
								type="submit"
								width="100%"
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

export default ModalParol;
