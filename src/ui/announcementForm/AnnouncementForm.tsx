import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import ButtonSave from '@/src/ui/customButton/ButtonSave.tsx';
import scss from './AnnouncementForm.module.scss';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel.tsx';
import ButtonWithPlus from '../customButton/ButtonWithPlus';
import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField } from '@mui/material';
import { usePostAnnouncementTableMutation } from '@/src/redux/api/admin/announcement';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

interface PostAnnouncementProps {
	// id: number;
	announcement: string;
	group: string[];
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250
		}
	}
};

const names = [
	'JS-10',
	'JS-11',
	'JS-12',
	'JS-13',
	'JS-14',
	'JAVA-10',
	'JAVA-11',
	'JAVA-12',
	'JAVA-13',
	'JAVA-14'
];

const AnnouncementForm = () => {
	const { handleSubmit, reset } = useForm<PostAnnouncementProps>();
	const [open, setOpen] = useState<boolean>(false);
	const [announcement, setAnnouncement] = useState<string>('');
	const [postAnnouncementTable] = usePostAnnouncementTableMutation();
	const [personName, setPersonName] = React.useState<string[]>([]);

	const handleOpen = (e: React.MouseEvent<HTMLFormElement>) => {
		setOpen(true);
		e.preventDefault();
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = (event: SelectChangeEvent<typeof personName>) => {
		const {
			target: { value }
		} = event;
		setPersonName(typeof value === 'string' ? value.split(',') : value);
	};

	const notify = () =>
		toast.error('Пожалуйста, заполните все обязательные поля');
	const notifySuccess = () => toast.success('Успешно добовлено');

	const onSubmit: SubmitHandler<PostAnnouncementProps> = async (data) => {
		const { announcement } = data;

		if (announcement !== '' && personName.length > 0) {
			const newAnnouncement = {
				announcement: announcement,
				group: personName
			};
			await postAnnouncementTable(newAnnouncement);
			handleClose();
			reset();
			setPersonName([]);
			notifySuccess();
		} else {
			notify();
		}
	};

	return (
		<form onSubmit={handleOpen}>
			<ToastContainer />
			<div className={scss.button}>
				<ButtonWithPlus type="submit" disabled={false}>
					Добавить объявления
				</ButtonWithPlus>
			</div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<div className={scss.AnnouncementForm}>
					<h1 className={scss.title}>Добавить объявление</h1>
					<div className={scss.announce_form}>
						<TextField
							id="outlined-textarea"
							label="Введите текст объявления"
							placeholder="Введите текст объявления"
							multiline
							style={{
								marginLeft: '22px',
								marginBottom: '20px',
								width: '491px',
								height: '40px',
								borderRadius: '20px'
							}}
							value={announcement}
							onChange={(e) => {
								setAnnouncement(e.target.value);
							}}
						/>

						<FormControl sx={{ m: 1, width: 300 }}>
							<InputLabel
								id="demo-multiple-checkbox-label"
								style={{
									paddingLeft: '20px',
									textAlign: 'center'
								}}
							>
								Группы
							</InputLabel>
							<Select
								labelId="demo-multiple-checkbox-label"
								id="demo-multiple-checkbox"
								multiple
								value={personName}
								onChange={handleChange}
								input={<OutlinedInput label="Группы" />}
								renderValue={(selected) => selected.join(', ')}
								MenuProps={MenuProps}
								style={{
									marginLeft: '15px',
									width: '491px',
									height: '42px',
									borderRadius: '8px'
								}}
							>
								{names.map((name) => (
									<MenuItem key={name} value={name}>
										<Checkbox checked={personName.indexOf(name) > -1} />
										<ListItemText primary={name} />
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<div className={scss.btn_form}>
							<ButtonCancel
								type="submit"
								disabled={false}
								onClick={handleClose}
								width="117px"
							>
								Отмена
							</ButtonCancel>
							<ButtonSave
								width="100px"
								type="submit"
								disabled={false}
								onClick={handleSubmit(onSubmit)}
							>
								Отправить
							</ButtonSave>
						</div>
					</div>
				</div>
			</Modal>
		</form>
	);
};
export default AnnouncementForm;
