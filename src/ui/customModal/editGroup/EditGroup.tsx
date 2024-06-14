import scss from './EditGroup.module.scss';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Input from '@/src/ui/customInput/Input.tsx';
import galerry from '@/src/assets/photo-bg.png';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel.tsx';
import ButtonSave from '@/src/ui/customButton/ButtonSave.tsx';
import { FC, useEffect, useRef, useState } from 'react';
import {
	useCreateGroupFileMutation,
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
	const { data } = useGetGroupQuery({ page: '1', size: '8' });
	const findData = data?.groupResponses.find((el) => el.id === saveId);

	const [value, setValue] = useState<string>('');
	const [date, setData] = useState<string>('');
	const [text, setText] = useState<string>('');
	const [hidePhoto, setHidePhoto] = useState<boolean>(false);
	const [image, setImage] = useState<string>('');
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [updateGroup] = useUpdateGroupMutation();
	const [saveSelect, setSelectedFile] = useState<string | null>(null);
	const [createGroupFile] = useCreateGroupFileMutation();

	useEffect(() => {
		setValue(findData?.title || '');
		setData(findData?.dateOfEnd || '');
		setText(findData?.description || '');
		setImage(findData?.image || '');
	}, [findData]);

	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	console.log(saveId);

	const handleFileSelect = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const files = event.target.files;
		if (files && files[0]) {
			const file = files[0];
			console.log(file);
			const formData = new FormData();
			formData.append('file', file);
			setHidePhoto(true);

			try {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const response: any = await createGroupFile(formData);
				const test = JSON.parse(response.data);
				const fileName = test.fileName;
				setSelectedFile(fileName);
			} catch (error) {
				console.error('Error uploading file:', error);
			}
		}
	};

	const updateGroupFunc = async () => {
		const newGroup = {
			title: value,
			image: saveSelect,
			dateOfEnd: date,
			description: text
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
						<p> Редактировать</p>
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
								style={{ backgroundImage: `url(${image || galerry})` }}
							></div>
							<p>Нажмите на иконку чтобы загрузить или перетащите фото</p>
						</div>
						<div className={scss.inputs}>
							<div className={scss.first_input}>
								<Input
									size="medium"
									width="100%"
									placeholder="Название группы"
									value={value}
									onChange={(e) => setValue(e.target.value)}
									type="text"
								/>
							</div>
							<div className={scss.second_input}>
								<Input
									size="medium"
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
