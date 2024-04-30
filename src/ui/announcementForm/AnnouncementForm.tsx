import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import ButtonSave from '@/src/ui/customButton/ButtonSave.tsx';
import scss from './AnnouncementForm.module.scss';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel.tsx';
import ButtonWithPlus from '../customButton/ButtonWithPlus';
import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Typography } from '@mui/material';
import { usePostAnnouncementTableMutation } from '@/src/redux/api/admin/announcement';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import InputAnnouncement from '../customInput/InputAnnouncement';

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
	'JS-12-senior',
	'JS-13',
	'JS-14',
	'JS-ehglish',
	'JAVA-10',
	'JAVA-11',
	'JAVA-12',
	'JAVA-13',
	'JAVA-14'
];
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 581,
	minHeight: 330,
	backgroundColor: '#ffffff',
	bgColor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '10px'
};

const AnnouncementForm = () => {
	const { control, handleSubmit, reset } = useForm<PostAnnouncementProps>();
	const [open, setOpen] = useState<boolean>(false);
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
		console.log(onSubmit);
		if (announcement.length > 0 && personName.length > 0) {
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
				<Box sx={style} className={scss.Announcement_form}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						<p className={scss.title}>Добавить объявление</p>
					</Typography>

					<Box className={scss.input_form}>
						<Controller
							name="announcement"
							control={control}
							defaultValue=""
							render={({ field }) => (
								<InputAnnouncement
									{...field}
									type="text"
									width="100%"
									label="Введите текст объявления"
									placeholder="Введите текст объявления"
								/>
							)}
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
									width: '520px',
									height: '45px',
									borderRadius: '10px',
									position: 'relative',
									top: '0',
									right: '20px'
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
					</Box>
				</Box>
			</Modal>
		</form>
	);
};
export default AnnouncementForm;
