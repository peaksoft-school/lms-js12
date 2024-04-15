import * as React from 'react';
import scss from './CreateCurse.module.scss';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Input from '@/src/ui/customInput/Input.tsx';
import galerry from '@/src/assets/photo.png';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel.tsx';
import ButtonSave from '@/src/ui/customButton/ButtonSave.tsx';

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
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [value, setValue] = React.useState('');
	const [hidePhoto, setHidePhoto] = React.useState(false);
	const [image, setImage] = React.useState<string>('');
	const fileInputRef = React.useRef<HTMLInputElement>(null);

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
	const CurentFunc = () => {
		setOpen(false);
	};
	return (
		<>
			<Button onClick={handleOpen}>Open modal</Button>
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
						<p>Создать курс</p>
					</Typography>
					<Typography
						className={scss.textPart}
						id="modal-modal-description"
						sx={{ mt: 2 }}
					>
						<div
							className={scss.imgPart}
							style={{
								backgroundImage: `url(${image})`,
								backgroundSize: '310px'
							}}
						>
							<input
								className={scss.fileInput}
								type="file"
								ref={fileInputRef}
								onChange={handleFileChange}
							/>
							<div
								onClick={handleButtonClick}
								className={hidePhoto ? scss.backgroundNone : scss.background}
								style={{ backgroundImage: `url(${galerry})` }}
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
									value={value}
									onChange={(e) => setValue(e.target.value)}
									width="100%"
									type="date"
								/>
							</div>
						</div>
						<textarea placeholder="Описание группы"></textarea>
						<div className={scss.buttons}>
							<div className={scss.Cancel}>
								<ButtonCancel
									type="submit"
									onClick={CurentFunc}
									disabled={false}
									width="103px"
								>
									Отмена
								</ButtonCancel>
							</div>
							<div className={scss.Cancel}>
								<ButtonSave
									type="submit"
									onClick={CurentFunc}
									disabled={false}
									width="117px"
								>
									Добавить
								</ButtonSave>
							</div>
						</div>
					</Typography>
				</Box>
			</Modal>
		</>
	);
}
