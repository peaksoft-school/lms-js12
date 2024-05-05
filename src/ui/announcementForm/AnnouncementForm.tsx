import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import ButtonSave from '@/src/ui/customButton/ButtonSave.tsx';
import scss from './AnnouncementForm.module.scss';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel.tsx';
import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Typography } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { usePostAnnouncementTableMutation } from '@/src/redux/api/admin/announcement';
import InputAnnouncement from '../customInput/InputAnnouncement';

interface PostAnnouncementProps {
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
	minHeight: 330,
	backgroundColor: '#ffffff',
	bgColor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '10px'
};

interface AnnouncementProps {
	open: boolean;
	handleClose: () => void;
}

const AnnouncementForm: FC<AnnouncementProps> = ({ open, handleClose }) => {
	const { control, handleSubmit, reset } = useForm<PostAnnouncementProps>();
	const [postAnnouncementTable] = usePostAnnouncementTableMutation();
	const [personName, setPersonName] = React.useState<string[]>([]);

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
				group: personName,
				show: false
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
		<form>
			<ToastContainer />
			<div className={scss.button}></div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style} className={scss.Announcement_form}>
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2"
						className={scss.text}
					>
						<p className={scss.comText}>Добавить объявление</p>
					</Typography>

					<Box className={scss.input_form}>
						<div className={scss.input}>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center'
								}}
							>
								<div className={scss.inputText}>
									<Controller
										name="announcement"
										control={control}
										defaultValue=""
										render={({ field }) => (
											<InputAnnouncement
												{...field}
												type="text"
												label="Введите текст объявления"
											/>
										)}
									/>
								</div>

								<FormControl sx={{ m: 1, width: 300 }} className={scss.input}>
									<InputLabel id="demo-multiple-checkbox-label">
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
											maxWidth: '540px',
											width: '100%',
											height: '55px',
											borderRadius: '12px',
											position: 'relative',
											top: '0'
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
							</div>

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
					</Box>
				</Box>
			</Modal>
		</form>
	);
};
export default AnnouncementForm;
