// import { useState } from 'react';
// import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Input from '../../ui/CustomInput/Input';
// import ButtonSave from '../../ui/CustomButton/ButtonSave';
// import scss from './Styled.module.scss';
// import ButtonCancel from '@/src/ui/CustomButton/ButtonCancel';
// import { Controller, useForm } from 'react-hook-form';

// const style = {
// 	position: 'absolute',
// 	top: '50%',
// 	left: '50%',
// 	transform: 'translate(-50%, -50%)',
// 	width: 541,
// 	height: 285,
// 	bgcolor: 'background.paper',
// 	boxShadow: 24,
// 	p: 4,
// 	borderRadius: '10px'
// };

// const ModalAddLink = () => {

// 	const [open, setOpen] = useState<boolean>(false);
// 	const handleOpen = () => {
// 		setOpen(true);
// 	};

// 	const handleClose = () => {
// 		setOpen(false);
// 	};

// 	const handleSubmitSecond = () => {
// 		handleClose();
// 	};

// 	const {
// 		control,
// 		formState:{errors},
// 		handleSubmit,
// 		reset,

// 	}=useForm()

// 	const onSubmit =(data)=>{
//   console.log(data);
// 	reset();

// 	}
// 	return (
// 		<form onSubmit={handleSubmit(onSubmit)}>
// 			<Button onClick={handleOpen}>Open modal Добавить link</Button>
// 			<Modal
// 				open={open}
// 				onClose={handleClose}
// 				aria-labelledby="modal-modal-title"
// 				aria-describedby="modal-modal-description"
// 			>
// 				<Box sx={style} className={scss.ModalMain}>
// 					<Typography
// 						className={scss.Addtext}
// 						id="modal-modal-title"
// 						variant="h6"
// 						component="h2"
// 					>
// 						<p className={scss.comtext}>Добавить ссылку</p>
// 					</Typography>

// 					<Box className={scss.input_buttonCard}>
// 						<div className={scss.input}>
// 							<Controller
// 							name='text'
// 							control={control}
// 							defaultValue=''
// 							rules={{required:"text error"}}
// 							render={({field}) =>(

// 								<Input
// 								{...field}
// 									type="text"
// 									width="100%"
// 									placeholder="Отображаемый текст"

// 								/>
// 							)}

// 							/>
// 							{errors?.text && <p>{errors.text.message}</p>}
// 							{/* <Input
// 							 type="text"
// 								{...register('lastName')}
// 								width="100%"
// 								placeholder="Вставьте ссылку"							/> */}

// 						</div>

// 						<div className={scss.buttonAdd}>
// 							<ButtonCancel onClick={handleClose} disabled={false}>
// 								Отмена
// 							</ButtonCancel>
// 							<ButtonSave width='117px' type='submit' >
// 								Добавить
// 							</ButtonSave>
// 						</div>
// 					</Box>
// 				</Box>
// 			</Modal>
// 		</form>
// 	);
// };

// export default ModalAddLink;
////////////////////////2222222
// import { useState } from 'react';
// import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Input from '@mui/material/Input';
// import ButtonSave from '../../ui/CustomButton/ButtonSave';
// import scss from './Styled.module.scss';
// import ButtonCancel from '@/src/ui/CustomButton/ButtonCancel';
// import { Controller, useForm } from 'react-hook-form';

// const style = {
// 	position: 'absolute',
// 	top: '50%',
// 	left: '50%',
// 	transform: 'translate(-50%, -50%)',
// 	width: 541,
// 	height: 285,
// 	bgcolor: 'background.paper',
// 	boxShadow: 24,
// 	p: 4,
// 	borderRadius: '10px'
// };

// const ModalAddLink = () => {
// 	const [open, setOpen] = useState<boolean>(false);
// 	const handleOpen = () => {
// 		setOpen(true);
// 	};

// 	const handleClose = () => {
// 		setOpen(false);
// 	};

// 	const {
// 		control,
// 		handleSubmit,
// 		formState: { errors },
// 		reset
// 	} = useForm();

// 	const onSubmit = () => {
// 		// console.log();
// 		reset();
// 	};

// 	return (
// 		<form onSubmit={handleSubmit(onSubmit)}>
// 			<Button onClick={handleOpen}>Open modal Добавить link</Button>
// 			<Modal
// 				open={open}
// 				onClose={handleClose}
// 				aria-labelledby="modal-modal-title"
// 				aria-describedby="modal-modal-description"
// 			>
// 				<Box sx={style} className={scss.ModalMain}>
// 					<Typography
// 						className={scss.Addtext}
// 						id="modal-modal-title"
// 						variant="h6"
// 						component="h2"
// 					>
// 						<p className={scss.comtext}>Добавить ссылку</p>
// 					</Typography>

// 					<Box className={scss.input_buttonCard}>
// 						<div className={scss.input}>
// 							<Controller
// 								name="text"
// 								control={control}
// 								defaultValue=""
// 								rules={{ required: 'text error' }}
// 								render={({ field }) => (
// 									<Input
// 										{...field}
// 										type="text"
// 										sx={{ width: '100%' }}
// 										placeholder="Отображаемый текст"
// 									/>
// 								)}
// 							/>
// 							{errors?.text && <p>{errors.text.message}</p>},
// 						</div>

// 						<div className={scss.buttonAdd}>
// 							<ButtonCancel
// 								type="submit"
// 								onClick={handleClose}
// 								disabled={false}
// 							>
// 								Отмена
// 							</ButtonCancel>
// 							<ButtonSave
// 								type="submit"
// 								width="117px"
// 								onClick={handleOpen}
// 								disabled={false}
// 							>
// 								Добавить
// 							</ButtonSave>
// 						</div>
// 					</Box>
// 				</Box>
// 			</Modal>
// 		</form>
// 	);
// };

// export default ModalAddLink;
/////////////////////333333333333333333333

import { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonSave from '../../ui/CustomButton/ButtonSave';
import scss from './Styled.module.scss';
import ButtonCancel from '@/src/ui/CustomButton/ButtonCancel';
import { Controller, useForm } from 'react-hook-form';
import Input from '@/src/ui/CustomInput/Input';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 541,
	height: 285,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '10px'
};

const ModalAddLink = () => {
	const [open, setOpen] = useState<boolean>(false);
	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const {
		control,
		handleSubmit,
		// formState: { errors },
		reset
	} = useForm();

	const onSubmit = () => {
		// console.log();
		reset();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Button onClick={handleOpen}>Open modal Добавить link</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style} className={scss.ModalMain}>
					<Typography
						className={scss.Addtext}
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						<p className={scss.comtext}>Добавить ссылку</p>
					</Typography>

					<Box className={scss.input_buttonCard}>
						<div className={scss.input}>
							<Controller
								name="text"
								control={control}
								defaultValue=""
								rules={{ required: 'text error' }}
								render={({ field }) => (
									<Input
										{...field}
										type="text"
										width="100%"
										// sx={{ width: '100%' }}
										placeholder="Отображаемый текст"
									/>
								)}
							/>
							{/* {errors?.text && <p>{errors.text.message}</p>}/ */}
						</div>

						<div className={scss.input}>
							<Controller
								name="url"
								control={control}
								defaultValue=""
								rules={{ required: 'url error' }}
								render={({ field }) => (
									<Input
										{...field}
										type="text"
										width="100%"
										// sx={{ width: '100%' }}
										placeholder="Вставьте ссылку"
									/>
								)}
							/>
							{/* {errors?.url && <p>{errors.url.message}</p>} */}
						</div>

						<div className={scss.buttonAdd}>
							<ButtonCancel
								type="submit"
								onClick={handleClose}
								disabled={false}
							>
								Отмена
							</ButtonCancel>
							<ButtonSave
								type="submit"
								width="117px"
								disabled={false}
								onClick={handleOpen}
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

export default ModalAddLink;
