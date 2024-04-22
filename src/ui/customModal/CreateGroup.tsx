// CreateGroup.tsx
import * as React from 'react';
import scss from './CreateGroup.module.scss';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Input from '@/src/ui/customInput/Input.tsx';
import galerry from '@/src/assets/photo-bg.png';
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

interface Props {
	isOpen: boolean;
	onClose: () => void;
	onAddCard: (newCard: CardData) => void;
}

interface CardData {
	_id: string;
	img: string;
	title: string;
	date: string;
	text: string;
}

const CreateGroup: React.FC<Props> = ({ isOpen, onClose, onAddCard }) => {
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

	const handleCancel = () => {
		setImage(''); // Сбрасываем изображение при отмене
		onClose(); // Закрываем модальное окно
	};

	const handleSave = () => {
		// Создаем новую карточку
		const newCard: CardData = {
			_id: Math.random().toString(36).substr(2, 9), // Просто генерируем случайный id
			img: image,
			title: value, // Используем значение из input в качестве заголовка
			date: new Date().toISOString(), // Устанавливаем текущую дату
			text: '' // Пока оставляем пустым
		};

		// Вызываем функцию, переданную из внешнего компонента, чтобы добавить новую карточку
		onAddCard(newCard);

		// Сбрасываем значения
		setValue('');
		setImage('');
		onClose(); // Закрываем модальное окно
	};

	return (
		<Modal
			open={isOpen}
			onClose={onClose}
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
					<p> Создание группы</p>
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
								type="button"
								onClick={handleCancel}
								disabled={false}
								width="103px"
							>
								Отмена
							</ButtonCancel>
						</div>
						<div className={scss.Cancel}>
							<ButtonSave
								type="button"
								onClick={handleSave}
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
	);
};

export default CreateGroup;
