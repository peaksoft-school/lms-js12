import scss from './CreateGroup.module.scss';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Input from '@/src/ui/customInput/Input.tsx';
import galerry from '@/src/assets/photo-bg.png';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel.tsx';
import ButtonSave from '@/src/ui/customButton/ButtonSave.tsx';
import { FC, useEffect, useRef, useState } from 'react';
import {
	useGetGroupQuery,
	useUpdateGroupMutation
} from '@/src/redux/api/admin/groups';

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

const EditGroup: FC<EditModalProps> = ({ open, handleClose, saveId }) => {
	const { data } = useGetGroupQuery();
	const find = data?.find((id) => id._id === saveId);
	console.log(find);

	const [value, setValue] = useState<string>('');
	const [date, setData] = useState<string>('');
	const [text, setText] = useState<string>('');
	const [hidePhoto, setHidePhoto] = useState<boolean>(false);
	const [image, setImage] = useState<string>('');
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [updateGroup] = useUpdateGroupMutation();

	useEffect(() => {
		setValue(find?.title || '');
		setData(find?.date || '');
		setText(find?.text || '');
		setImage(find?.img || '');
	}, [find]);

	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	console.log(saveId);

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
		const newGroup = {
			title: value,
			img: image,
			date: date,
			text: text
		};
		await updateGroup({ newGroup, saveId });
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
				<Box className={scss.main_modal} sx={style}>
					<Typography
						className={scss.curse}
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						<p> Создание группы</p>
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
								onChange={handleFileChange}
							/>
							<div
								onClick={handleButtonClick}
								className={hidePhoto ? scss.backgroundNone : scss.background}
								style={{ backgroundImage: `url(${image || galerry})` }}
							></div>
							<p className={hidePhoto ? scss.hide_text : scss.show}>
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

export default EditGroup;
