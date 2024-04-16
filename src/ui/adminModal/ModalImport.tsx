import { useState, ChangeEvent } from 'react';
import {
	Button,
	Modal,
	Box,
	Typography,
	Select,
	MenuItem
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import Input from '@/src/ui/customInput/Input';
import ButtonSave from '@/src/ui/customButton/ButtonSave';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import scss from './Style.module.scss';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 542,
	height: 305,
	bgColor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '10px'
};

const ModalImport = () => {
	const { control, handleSubmit } = useForm();
	const [open, setOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState('');

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const onSubmit = () => {
		// console.log(data); // Здесь можно обработать данные формы
		handleClose();
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSelectedOption(e.target.value);
	};

	return (
		<div>
			<Button onClick={handleOpen}>Open modal Импорт</Button>
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
						<p className={scss.comText}>Импорт Excel в БД</p>
					</Typography>

					<Box className={scss.input_buttonCard}>
						<div className={scss.selectDiv}>
							<Controller
								name="fileType"
								control={control}
								defaultValue=""
								render={({ field }) => (
									<Select {...field} fullWidth className={scss.select}>
										<MenuItem value="">Выберите тип файла</MenuItem>
										<MenuItem value="js10">js10</MenuItem>
										<MenuItem value="js11">js11</MenuItem>
										<MenuItem value="js12">js12</MenuItem>
									</Select>
								)}
							/>
						</div>
						<div className={scss.containInput}>
							<Input
								type="text"
								width="80%"
								placeholder="Выберите Excel файл для импорта"
								value={selectedOption}
								onChange={handleInputChange}
							/>
							<ButtonCancel
								type="button"
								disabled={false}
								onClick={handleClose}
								width="117px"
							>
								Обзор...
							</ButtonCancel>
						</div>
						<div className={scss.buttonAdd}>
							<ButtonCancel
								type="button"
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
								onClick={handleSubmit(onSubmit)}
							>
								Добавить
							</ButtonSave>
						</div>
					</Box>
				</Box>
			</Modal>
		</div>
	);
};

export default ModalImport;
