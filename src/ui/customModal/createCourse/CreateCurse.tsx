/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Input from '@/src/ui/customInput/Input.tsx';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel.tsx';
import ButtonSave from '@/src/ui/customButton/ButtonSave.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	useCreateAdminCourseMutation,
	useCreateCourseFileImgMutation
} from '@/src/redux/api/admin/courses';
import scss from './CreateCurse.module.scss';
import gallery from '@/src/assets/photo-bg.png';
import { toast } from 'react-toastify';

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

interface CreateCoursesProps {
	handleOpenCourse: (value: boolean) => void;
	open: boolean;
	handleClose: () => void;
}

const CreateCourse: FC<CreateCoursesProps> = ({
	handleOpenCourse,
	open,
	handleClose
}) => {
	const [value, setValue] = useState('');
	const [data, setData] = useState('');
	const [text, setText] = useState('');
	const [hidePhoto, setHidePhoto] = useState(false);
	const [image, setImage] = useState<string>('');
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [createCourse] = useCreateAdminCourseMutation();
	const [createCourseFileImg] = useCreateCourseFileImgMutation();
	const [isFormValid, setIsFormValid] = useState(false);

	const [urlImg, setUrlImg] = useState('');

	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleFileSelect = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const files = event.target.files;
		if (files && files.length > 0) {
			const file = files[0];
			const formData = new FormData();
			formData.append('file', file);
			try {
				const response: any = await createCourseFileImg(formData);
				const fileName = response?.data?.fileName;
				if (fileName) {
					setHidePhoto(true);
					setUrlImg(fileName);
					const fileURL = URL.createObjectURL(file);
					setImage(fileURL);
				} else {
					console.error('Unexpected response format:', response);
				}
			} catch (error) {
				console.error('Error uploading file:', error);
			}
		}
	};

	const notifySuccess = () => toast.success('Группа успешно создана!');
	const notifyError = () => toast.error('Произошла ошибка при создании группы');
	const notifyIncomplete = () => toast.error('Заполните все поля');

	const handleCreateCourse = async () => {
		if (!value || !urlImg || !data || !text) {
			notifyIncomplete();
			setIsFormValid(false);
			return;
		}

		const newCourse = {
			title: value,
			image: urlImg,
			description: text,
			dateOfEnd: data
		};

		try {
			await createCourse(newCourse);
			notifySuccess();
			setText('');
			setImage('');
			setValue('');
			handleOpenCourse(false);
			handleClose();
			setHidePhoto(false);
			setIsFormValid(false);
		} catch (error) {
			notifyError();
		}
	};

	useEffect(() => {
		setIsFormValid(!!value && !!urlImg && !!data && !!text);
	}, [value, urlImg, data, text]);

	return (
		<div>
			<ToastContainer />
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
								className={scss.fileInput}
								type="file"
								ref={fileInputRef}
								onChange={handleFileSelect}
							/>
							<div
								onClick={handleButtonClick}
								className={hidePhoto ? scss.background_none : scss.background}
								style={{ backgroundImage: `url(${image || gallery})` }}
							></div>
							<p className={hidePhoto ? scss.hide_text : scss.show}>
								Нажмите на иконку чтобы загрузить
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
								disabled={!isFormValid}
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
};

export default CreateCourse;
