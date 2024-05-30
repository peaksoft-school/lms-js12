import { FC, useState } from 'react';
import {
	Modal,
	Box,
	Typography,
	FormControl,
	OutlinedInput,
	InputLabel,
	Select,
	SelectChangeEvent,
	MenuItem,
	Checkbox,
	ListItemText
} from '@mui/material';
import { useForm } from 'react-hook-form';
import ButtonSave from '@/src/ui/customButton/ButtonSave.tsx';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel.tsx';
import scss from './Style.module.scss';
import Input from '../customInput/Input';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 542,
	bgColor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '10px'
};

const names = ['js-12', 'java-12', 'js-13', 'java-13', 'js-14', 'java-14'];

interface SearchProps {
	handleClose: () => void;
	open: boolean;
}

const ExcelModal: FC<SearchProps> = ({ handleClose, open }) => {
	const { handleSubmit } = useForm();
	const [excelFile, setExcelFile] = useState<string[]>([]);

	const onSubmit = () => {
		handleClose();
	};

	const handleChange = (event: SelectChangeEvent<typeof excelFile>) => {
		const {
			target: { value }
		} = event;
		setExcelFile(typeof value === 'string' ? value.split(',') : value);
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
							<FormControl>
								
								<InputLabel id="demo-multiple-checkbox-label">
									Группа
								</InputLabel>
								<Select
								size='medium'
									style={{ borderRadius: '12px' }}
									labelId="demo-multiple-checkbox-label"
									id="demo-multiple-checkbox"
									multiple
									value={excelFile}
									onChange={handleChange}
									input={<OutlinedInput label="Группа" />}
									renderValue={(selected) => selected.join(', ')}
								>
									{names.map((name) => (
										<MenuItem key={name} value={name}>
											<Checkbox checked={excelFile.indexOf(name) > -1} />
											<ListItemText primary={name} />
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<div style={{display: 'flex', gap: '10px'}}>
								<Input
								
									value=""
									size="medium"
									width="100%"
									placeholder="Выберите Excel файл для импорта"
									type="text"
								/>
								<ButtonCancel
									type="button"
									width="150px"
									disabled={false}
									onClick={() => {}}
								>
									Обзор...
								</ButtonCancel>
							</div>
						</div>

						<div
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'flex-end',
								alignItems: 'center',
								paddingBottom: '10px',
								paddingTop: '13px',
								gap: '10px'
							}}
						>
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

export default ExcelModal;
