import { FC } from 'react';
import { Modal, Box, Typography, Select, MenuItem } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import ButtonSave from '@/src/ui/customButton/ButtonSave.tsx';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel.tsx';
import scss from '../Style.module.scss';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 542,
	height: 335,
	bgColor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '10px'
};

interface SearcheProps {
	handleClose: () => void;
	open: boolean;
}
const SearchModal: FC<SearcheProps> = ({ handleClose, open }) => {
	const { control, handleSubmit } = useForm();

	const onSubmit = () => {
		handleClose();
	};

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style} className={scss.main_modal}>
					<Typography
						className={scss.text}
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						<p className={scss.comText}>Импорт Excel в БД</p>
					</Typography>

					<Box className={scss.input_button_card}>
						<div className={scss.select_div}>
							<Controller
								name="fileType"
								control={control}
								defaultValue=""
								render={({ field }) => (
									<Select
										{...field}
										fullWidth
										className={scss.select}
										style={{ borderRadius: '20px' }}
									>
										<MenuItem value="">Выберите тип файла</MenuItem>
										<MenuItem value="js10">js10</MenuItem>
										<MenuItem value="js11">js11</MenuItem>
										<MenuItem value="js12">js12</MenuItem>
									</Select>
								)}
							/>
						</div>
						<div className={scss.select_div}>
							<Controller
								name="fileType"
								control={control}
								defaultValue=""
								render={({ field }) => (
									<Select
										{...field}
										fullWidth
										style={{ borderRadius: '20px' }}
										className={scss.select}
									>
										<MenuItem value="">Выберите тип файла</MenuItem>
										<MenuItem value="js10">js10</MenuItem>
										<MenuItem value="js11">js11</MenuItem>
										<MenuItem value="js12">js12</MenuItem>
									</Select>
								)}
							/>
						</div>

						<div className={scss.button_add}>
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

export default SearchModal;
