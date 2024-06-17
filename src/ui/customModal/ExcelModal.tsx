import { FC, useRef, useState } from 'react';
import {
	Modal,
	Box,
	Typography,
	FormControl,
	InputLabel,
	Select,
	MenuItem
} from '@mui/material';
import { useForm } from 'react-hook-form';
import ButtonSave from '@/src/ui/customButton/ButtonSave.tsx';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel.tsx';
import scss from './Style.module.scss';
import Input from '../customInput/Input';
import { useGetGroupQuery } from '@/src/redux/api/admin/groups';
import { usePostExcelStudentMutation } from '@/src/redux/api/admin/student';

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

interface SearchProps {
	handleClose: () => void;
	open: boolean;
}

const ExcelModal: FC<SearchProps> = ({ handleClose, open }) => {
	const { handleSubmit } = useForm();
	const [excelFile, setExcelFile] = useState<number | null>(null);
	const [selectedFile, setSelectedFile] = useState<string>('');
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [postExcelStudent] = usePostExcelStudentMutation();
	const { data } = useGetGroupQuery({
		page: '1',
		size: '100'
	});

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files[0]) {
			setSelectedFile(event.target.files[0].name);
		}
	};

	const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setExcelFile(event.target.value as number); // Assuming item.title is a number
	};

	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};
	console.log(excelFile);

	const onSubmit = async () => {
		await postExcelStudent({ excelFile, selectedFile });
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
								<InputLabel
									style={{ background: '#fff' }}
									id="demo-multiple-checkbox-label"
								>
									Группа
								</InputLabel>
								<Select
									style={{ borderRadius: '12px' }}
									labelId="study-format-label"
									id="study-format-select"
									value={excelFile}
									onChange={handleChange}
								>
									{data?.groupResponses.map((item) => (
										<MenuItem key={item.id} value={item.id}>
											<h3>{item.title}</h3>
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<div style={{ display: 'flex', gap: '10px' }}>
								<Input
									value={selectedFile}
									size="medium"
									width="100%"
									placeholder="Выберите Excel файл для импорта"
									type="text"
									onChange={handleFileChange}
								/>
								<input
									type="file"
									style={{ display: 'none' }}
									ref={fileInputRef}
									onChange={handleFileChange}
								/>
								<ButtonCancel
									type="button"
									width="150px"
									disabled={false}
									onClick={handleButtonClick}
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
