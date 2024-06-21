/* eslint-disable @typescript-eslint/no-explicit-any */
import scss from './EditCourse.module.scss';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Input from '@/src/ui/customInput/Input.tsx';
import gallery from '@/src/assets/photo-bg.png';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel.tsx';
import ButtonSave from '@/src/ui/customButton/ButtonSave.tsx';
import { FC, useEffect, useRef, useState } from 'react';

import {
	useCreateCourseFileImgMutation,
	useGetAdminCourseQuery,
	useUpdateAdminCourseMutation
} from '@/src/redux/api/admin/courses';

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

interface EditModalProps {
	open: boolean;
	handleClose: () => void;
	saveId: number | null;
}

const EditCourse: FC<EditModalProps> = ({ open, handleClose, saveId }) => {
	const { data } = useGetAdminCourseQuery({ page: '1', size: '8' });
	const find = data?.courses.find((el) => el.id === saveId);

	const [value, setValue] = useState<string>('');
	const [initialValue, setInitialValue] = useState<string>('');
	const [initialDate, setInitialDate] = useState<string>('');
	const [initialText, setInitialText] = useState<string>('');
	const [date, setDate] = useState<string>('');
	const [hidePhoto, setHidePhoto] = useState<boolean>(false);
	const [saveSelect, setSelectedFile] = useState<string | null>(null);
	const [text, setText] = useState<string>('');
	const [image, setImage] = useState<string>('');
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [createCourseFileImg] = useCreateCourseFileImgMutation();
	const [updateCourse] = useUpdateAdminCourseMutation();
	const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

	useEffect(() => {
		if (find) {
			setValue(find.title || '');
			setInitialValue(find.title || '');
			setDate(find.dateOfEnd || '');
			setInitialDate(find.dateOfEnd || '');
			setText(find.description || '');
			setImage(find.image || '');
			setInitialText(find.description || '');
			setSelectedFile(find.image || '');
		}
	}, [find]);

	useEffect(() => {
		const isDisabled =
			!value ||
			!date ||
			!text ||
			(value === initialValue && date === initialDate && text === initialText);
		setIsButtonDisabled(isDisabled);
	}, [value, date, text, initialValue, initialDate, initialText]);

	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleFileSelect = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const files = event.target.files;
		if (files && files[0]) {
			const file = files[0];
			const formData = new FormData();
			formData.append('file', file);
			setHidePhoto(true);
			setSelectedFile('');
			try {
				const response: any = await createCourseFileImg(formData);
				const test = response.data;
				const fileName = test.fileName;
				setSelectedFile(fileName);
			} catch (error) {
				console.error('Error uploading file:', error);
			}
		}
	};

	const updateCourseFunc = async () => {
		const newCourses = {
			title: value,
			image: saveSelect,
			dateOfEnd: date,
			description: text
		};
		await updateCourse({ newCourses, saveId });
		handleClose();
		setSelectedFile('');
	};

	const handleDateChange = (newDate: string) => {
		const currentDate = new Date();
		const selectedDate = new Date(newDate);

		if (selectedDate < currentDate) {
			console.log('Выбрана прошлая дата');
		} else {
			setDate(newDate);
		}
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box className={scss.mainModal} sx={style}>
				<Typography
					className={scss.Curse}
					id="modal-modal-title"
					variant="h6"
					component="h2"
				>
					<p>Редактировать</p>
				</Typography>
				<Typography
					className={scss.textPart}
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
						{image === '' ? (
							<div
								onClick={handleButtonClick}
								className={hidePhoto ? scss.background_none : scss.background}
								style={{
									backgroundImage: `url(${gallery})`
								}}
							>
								<img style={{ borderRadius: '8px' }} src={gallery} alt="" />
							</div>
						) : (
							<div className={scss.img} onClick={handleButtonClick}>
								<img
									style={{
										borderRadius: '8px',
										width: '100%',
										maxWidth: '300px',
										minWidth: '300px',
										height: '160px'
									}}
									src={`https://lms-b12.s3.eu-central-1.amazonaws.com/${saveSelect} `}
								/>
							</div>
						)}
						<p className={hidePhoto ? scss.hide_text : scss.show}>
							Нажмите на иконку чтобы загрузить
						</p>
					</div>
					<div className={scss.inputs}>
						<div className={scss.first_input}>
							<Input
								size="medium"
								width="100%"
								placeholder="Название курсы"
								value={value}
								onChange={(e) => setValue(e.target.value)}
								type="text"
							/>
						</div>
						<div className={scss.second_input}>
							<Input
								size="medium"
								placeholder="Название курсы"
								value={date}
								onChange={(e) => handleDateChange(e.target.value)}
								width="100%"
								type="date"
							/>
						</div>
					</div>
					<textarea
						value={text}
						onChange={(e) => setText(e.target.value)}
						placeholder="Описание курсы"
					></textarea>
					<div className={scss.buttons}>
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
							onClick={updateCourseFunc}
							disabled={isButtonDisabled}
							width="117px"
						>
							Добавить
						</ButtonSave>
					</div>
				</Typography>
			</Box>
		</Modal>
	);
};

export default EditCourse;
