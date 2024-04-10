

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Input from './../../ui/CustomInput/Input';
import ButtonSave from './../../ui/CustomButton/ButtonSave';
import scss from './Styled.module.scss';
import ButtonCancel from '@/src/ui/CustomButton/ButtonCancel';
import { Controller, useForm } from 'react-hook-form';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 541,
	height: 231,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '12px'
};

const ModalStudentMessages = () => {
	const [open, setOpen] = useState<boolean>(false);
	const { control, handleSubmit } = useForm();
	const [inputValue, setInputValue] = useState<string>('');

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	const onSubmit = () => {
		handleClose();
	};

	return (
		<form>
			<Button onClick={handleOpen}>Open modal Сообщение для студентов</Button>
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
						<p className={scss.comText}>Сообщение для студентов</p>
					</Typography>
					<Box className={scss.input_buttonCard}>
						<div className={scss.input}>
							<Controller
								name="message"
								control={control}
								defaultValue=""
								render={({ field }) => (
									<Input
										{...field}
										type="text"
										value={inputValue}
										width="100%"
										placeholder=""
										onChange={(e) => {
											field.onChange(e);
											handleInputChange(e);
										}}
									/>
								)}
							/>
						</div>

						<div className={scss.buttonAdd}>
							<ButtonCancel
								type="button"
								disabled={false}
								onClick={handleClose}
								width='117px'
							>
								Отмена
							</ButtonCancel>
							<ButtonSave
								type="submit"
								width="117px"
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

export default ModalStudentMessages;
