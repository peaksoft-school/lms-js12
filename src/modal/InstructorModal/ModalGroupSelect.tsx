

import React, { useState } from 'react';
import {
	Button,
	Modal,
	Box,
	Typography,
	Select,
	MenuItem
} from '@mui/material';
import ButtonSave from '@/src/ui/CustomButton/ButtonSave';
import ButtonCancel from '@/src/ui/CustomButton/ButtonCancel';
import scss from './Styled.module.scss';
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

const ModalGroupSelect: React.FC = () => {
	const [open, setOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState('');
	const { control, handleSubmit } = useForm();

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSelectChange = (value: string) => {
		setSelectedOption(value);
	};

	const onSubmit = () => {
		console.log('Выбранная опция:', selectedOption);
		handleClose();
	};

	return (
		<form>
			<Button onClick={handleOpen}>Открыть модальное select</Button>
			<Modal open={open} onClose={handleClose}>
				<Box sx={style} className={scss.MainModal}>
					<Typography className={scss.text} variant="h6" gutterBottom>
						<p className={scss.comText}> Добавить студентов группы в курс </p>
					</Typography>

					<Box className={scss.input_buttonCard}>
						<div className={scss.selectDiv}>
							<Controller
								name="selectedOption"
								control={control}
								defaultValue=""
								render={({ field }) => (
									<Select
										{...field}
										value={selectedOption}
										onChange={(e) => {
											field.onChange(e);
											handleSelectChange(e.target.value as string);
										}}
										fullWidth
										className={scss.select}
									>
										<MenuItem value="">Выберите опцию</MenuItem>
										<MenuItem value="option1">Js 12</MenuItem>
										<MenuItem value="option2">Java 12</MenuItem>
										<MenuItem value="option3">Js 13</MenuItem>
									</Select>
								)}
							/>
						</div>
						<div className={scss.buttonAdd}>
							<ButtonCancel
								type="submit"
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
								Добавить
							</ButtonSave>
						</div>
					</Box>
				</Box>
			</Modal>
		</form>
	);
};

export default ModalGroupSelect;
