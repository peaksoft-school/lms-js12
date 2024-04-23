import scss from './CreateGroup.module.scss';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Input from '@/src/ui/customInput/Input.tsx';
import gallery from '@/src/assets/photo-bg.png';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel.tsx';
import ButtonSave from '@/src/ui/customButton/ButtonSave.tsx';
import { useRef, useState } from 'react';
import { useCreateGroupMutation } from '@/src/redux/api/admin/groups';
import ButtonWithPlus from '../customButton/ButtonWithPlus';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

export default function CreateGroup() {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [value, setValue] = useState('');
	const [data, setData] = useState('');
	const [text, setText] = useState('');
	const [hidePhoto, setHidePhoto] = useState(false);
	const [image, setImage] = useState<string>('');
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [createGroup] = useCreateGroupMutation();

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

	const notifySuccess = () => toast.success('Группа успешно создана !');
	const notifyError = () => toast.error('Произошла ошибка при создании группы');

	const handleCreateGroup = () => {
		const newGroup = {
			title: value,
			img: image,
			date: data,
			text: text
		};
		createGroup(newGroup)
			.unwrap()
			.then(() => {
				notifySuccess();
				setOpen(false);
				setData('');
				setText('');
				setImage('');
				setValue('');
			})
			.catch(() => {
				notifyError();
			});
	};

	return (
		<div className={scss.forButton}>
			<ToastContainer />

			<ButtonWithPlus onClick={handleOpen} disabled={false} type={'button'}>
				Добавить Группу
			</ButtonWithPlus>

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
						<p> Создать группу</p>
					</Typography>
					<Typography
						className={scss.textPart}
						id="modal-modal-description"
						sx={{ mt: 2 }}
					>
						<div className={scss.imgPart}>
							<input
								className={scss.fileInput}
								type="file"
								ref={fileInputRef}
								onChange={handleFileChange}
							/>
							<div
								onClick={handleButtonClick}
								className={hidePhoto ? scss.backgroundNone : scss.background}
								style={{ backgroundImage: `url(${image || gallery})` }}
							></div>
							<p className={hidePhoto ? scss.hideText : scss.show}>
								Нажмите на иконку чтобы загрузить или перетащите фото
							</p>
						</div>
						<div className={scss.inputs}>
							<div className={scss.first_input}>
								<Input
									width="100%"
									placeholder="Название группы"
									value={value}
									onChange={(e) => setValue(e.target.value)}
									type="text"
								/>
							</div>
							<div className={scss.second_input}>
								<Input
									placeholder="Название группы"
									value={data}
									onChange={(e) => setData(e.target.value)}
									width="100%"
									type="date"
								/>
							</div>
						</div>
						<textarea
							value={text}
							onChange={(e) => setText(e.target.value)}
							placeholder="Описание группы"
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
								onClick={handleCreateGroup}
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
