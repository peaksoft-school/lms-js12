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
interface UpadteProps {
	id: number;
	image: string | undefined;
	title: string;
	description: string;
	dateOfEnd: string;
}

const EditCourse: FC<EditModalProps> = ({ open, handleClose, saveId }) => {
	const { data } = useGetAdminCourseQuery({ page: '1', size: '8' });
	const find = data?.courses.find((el: UpadteProps) => el.id === saveId);

	const [value, setValue] = useState<string>('');
	const [date, setData] = useState<string>('');
	const [text, setText] = useState<string>('');
	const [hidePhoto, setHidePhoto] = useState<boolean>(false);
	const [image, setImage] = useState<string>('');
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [updateGroup] = useUpdateAdminCourseMutation();

	useEffect(() => {
		setValue(find?.title || '');
		setData(find?.dateOfEnd || '');
		setText(find?.description || '');
		setImage(find?.image || '');
	}, [find]);

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

	const updateGroupFunc = async () => {
		const newCourses = {
			title: value,
			image: image,
			dateOfEnd: date,
			description: text
		};
		await updateGroup({ newCourses, saveId });
		console.log(saveId, 'working');

		handleClose();
	};

	return (
		<>
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
						<p> Редактировать</p>
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
								onChange={handleFileChange}
							/>
							<div
								onClick={handleButtonClick}
								className={hidePhoto ? scss.background_none : scss.background}
								style={{
									backgroundImage: `url(${image || gallery})`
								}}
							>
								<img style={{ borderRadius: '8px' }} src={gallery} alt="" />
							</div>
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
									onChange={(e) => setData(e.target.value)}
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
								onClick={updateGroupFunc}
								disabled={false}
								width="117px"
							>
								Добавить
							</ButtonSave>
						</div>
					</Typography>
				</Box>
			</Modal>
		</>
	);
};

export default EditCourse;
