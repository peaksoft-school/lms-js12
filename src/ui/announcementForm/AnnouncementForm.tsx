import { FC, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import ButtonSave from '@/src/ui/customButton/ButtonSave';
import scss from './AnnouncementForm.module.scss';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
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
import { useGetGroupQuery } from '@/src/redux/api/admin/groups';
import Input from '../customInput/Input';

interface PostAnnouncementProps {
	announcementContent: string;
	targetGroupIds: number[];
	publishedDate: string;
	expirationDate: string;
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

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	minHeight: 330,
	backgroundColor: '#ffffff',
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
	const [personName, setPersonName] = useState<string[]>([]);
	const [selectedIds, setSelectedIds] = useState<string[]>([]);
	const { data: groupData } = useGetGroupQuery({ page: '1', size: '8' });

	const handleSelect = (groupId: string, title: string) => {
		setSelectedIds((prev) =>
			prev.includes(groupId) ? prev : [...prev, groupId]
		);
		setPersonName((prev) => (prev.includes(title) ? prev : [...prev, title]));
	};

	const handleChange = (event: SelectChangeEvent<string[]>) => {
		const { value } = event.target;
		setPersonName(typeof value === 'string' ? value.split(',') : value);
	};

	const notify = () =>
		toast.error('Пожалуйста, заполните все обязательные поля');
	const notifySuccess = () => toast.success('Успешно добавлено');

	const onSubmit: SubmitHandler<PostAnnouncementProps> = async (data) => {
		if (data.announcementContent.length > 0 && personName.length > 0) {
			const newAnnouncement = {
				announcementContent: data.announcementContent,
				expirationDate: data.expirationDate,
				publishedDate: data.publishedDate,
				targetGroupIds: selectedIds
			};
			console.log(newAnnouncement);

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
		<form onSubmit={handleSubmit(onSubmit)}>
			<ToastContainer />
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
										name="announcementContent"
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
											maxWidth: '540px',
											width: '100%',
											height: '55px',
											borderRadius: '12px',
											position: 'relative',
											top: '0'
										}}
									>
										{groupData &&
											groupData.groupResponses.map((name) => (
												<MenuItem
													key={name.id}
													value={name.title}
													onClick={() => handleSelect(name.id, name.title)}
												>
													<Checkbox
														checked={personName.indexOf(name.title) > -1}
													/>
													<ListItemText primary={name.title} />
												</MenuItem>
											))}
									</Select>
								</FormControl>

								<div className={scss.inputText}>
									<Controller
										name="publishedDate"
										control={control}
										defaultValue=""
										render={({ field }) => <Input {...field} type="date" />}
									/>
								</div>
								<div className={scss.inputText}>
									<Controller
										name="expirationDate"
										control={control}
										defaultValue=""
										render={({ field }) => <Input {...field} type="date" />}
									/>
								</div>
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
								<ButtonCancel type="button" onClick={handleClose} width="117px">
									Отмена
								</ButtonCancel>
								<ButtonSave
									width="100px"
									type="submit"
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
