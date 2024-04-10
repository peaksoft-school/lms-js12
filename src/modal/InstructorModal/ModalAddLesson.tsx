import { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Input from '../../ui/CustomInput/Input';
import ButtonSave from '../../ui/CustomButton/ButtonSave';
import scss from './Styled.module.scss';
import ButtonCancel from '@/src/ui/CustomButton/ButtonCancel';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 541,
	height: 241,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '12px'
};

const ModalAddLesson = () => {
	const [open, setOpen] = useState<boolean>(false);
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
	const handleSubmit = () => {
		handleClose();
	};

	return (
		<form>
			<Button onClick={handleOpen}>Open modal Добавить урок</Button>
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
						<p className={scss.comText}>Добавить урок</p>
					</Typography>

					<Typography className={scss.input_buttonCard}>
						<div className={scss.input}>
							<Input
								type="text"
								value={inputvalue}
								width="100%"
								placeholder="Название урока"
								onChange={handleInputChange1}
							/>
						</div>

						<div className={scss.buttonAdd}>
							<ButtonCancel
								type="submit"
								onClick={handleClose}
								disabled={false}
								width='117px'
							>
								Отмена
							</ButtonCancel>
							<ButtonSave
								type="submit"
								width="117px"
								onClick={handleSubmit}
								disabled={false}
							>
								Добавить
							</ButtonSave>
						</div>
					</Typography>
				</Box>
			</Modal>
		</form>
	);
};

export default ModalAddLesson;
