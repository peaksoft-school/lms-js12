import scss from './CreateCurse.module.scss';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Input from '@/src/ui/customInput/Input.tsx';
import gallery from '@/src/assets/photo-bg.png';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel.tsx';
import ButtonSave from '@/src/ui/customButton/ButtonSave.tsx';
import { useRef, useState } from 'react';
import { useCreateCourseMutation } from '@/src/redux/api/admin/courses';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ButtonWithPlus from '@/src/ui/customButton/ButtonWithPlus';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	sx: {
		bgcolor: 'background.paper',
		padding: '0px'
	}
};

export default function CreateCourse() {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [value, setValue] = useState('');
	const [data, setData] = useState('');
	const [text, setText] = useState('');
	const [hidePhoto, setHidePhoto] = useState(false);
	const [image, setImage] = useState<string>('');
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [createCourse] = useCreateCourseMutation();

	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			setHidePhoto(true);
			reader.onload = (e) => {
				if (e.target) {
					setImage(e.target.result as string);
				}
			};
			reader.readAsDataURL(file);
		}
	};

	const notifySuccess = () => toast.success('Курс успешно создан !');
	const notifyError = () => toast.error('Произошла ошибка при создании курса');

	const handleCreateCourse = () => {
		const newCourse = {
			title: value,
			img: image,
			date: data,
			text: text
		};
		createCourse(newCourse).unwrap();
		try {
			createCourse(newCourse).unwrap();
			notifySuccess();
			setOpen(false);
			setData('');
			setText('');
			setImage('');
			setValue('');
		} catch (error) {
			notifyError();
		}
	};

	return (
		<div>
			<ToastContainer />
			<div className={scss.add_course_button}>
				<ButtonWithPlus onClick={handleOpen} disabled={false} type={'button'}>
					Добавить Курс
				</ButtonWithPlus>
			</div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box className={scss.main_modal} sx={style}>
					<Typography
						className={scss.curse}
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						<p> Создание курса</p>
					</Typography>
					<Typography
						className={scss.text_part}
						id="modal-modal-description"
						sx={{ mt: 2 }}
					>
						<div className={scss.img_part}>
							<input
								className={scss.file_input}
								type="file"
								ref={fileInputRef}
								onChange={handleFileChange}
							/>
							<div
								onClick={handleButtonClick}
								className={hidePhoto ? scss.background_none : scss.background}
								style={{ backgroundImage: `url(${image || gallery})` }}
							></div>
							<p className={hidePhoto ? scss.hide_text : scss.show}>
								Нажмите на иконку чтобы загрузить или перетащите фото
							</p>
						</div>
						<div className={scss.inputs}>
							<div className={scss.first_input}>
								<Input
									size="medium"
									width="100%"
									placeholder="Название курса"
									value={value}
									onChange={(e) => setValue(e.target.value)}
									type="text"
								/>
							</div>
							<div className={scss.second_input}>
								<Input
									size="medium"
									width="100%"
									placeholder="Дата курса"
									value={data}
									onChange={(e) => setData(e.target.value)}
									type="date"
								/>
							</div>
						</div>
						<textarea
							value={text}
							onChange={(e) => setText(e.target.value)}
							placeholder="Описание курса"
						></textarea>
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
								type="submit"
								onClick={handleClose}
								disabled={false}
								width="103px"
							>
								Отмена
							</ButtonCancel>

							<ButtonSave
								type="submit"
								onClick={handleCreateCourse}
								disabled={false}
								width="117px"
							>
								Добавить
							</ButtonSave>
						</div>
					</Typography>
				</Box>
			</Modal>
		</div>
	);
}
