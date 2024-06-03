import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonSave from '@/src/ui/customButton/ButtonSave';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import InputAnnouncement from '../customInput/InputAnnouncement';
import {
	Checkbox,
	FormControl,
	InputLabel,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Select,
	SelectChangeEvent
} from '@mui/material';
import {
	useEditAnnouncementMutation,
	useGetAnnouncementTableQuery,
	usePutAnnouncementTableMutation
} from '@/src/redux/api/admin/announcement';
import scss from './EditAnnouncement.module.scss';
import { useGetGroupQuery } from '@/src/redux/api/admin/groups';

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

interface PostAnnouncementProps {
	announcementContent: string;
	expirationDate: string;
	targetGroupIds: number[];
	publishedDate: boolean;
}

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
	borderRadius: '12px'
};

interface modalProps {
	openModalEdit: boolean;
	closeModalEdit: (openModalEdit: boolean) => void;
	saveIdElement: number | null;
	dataId: string;
}

const ModalEditAnnouncement: FC<modalProps> = ({
	openModalEdit,
	closeModalEdit,
	saveIdElement,
	dataId
}) => {
	const { data: groupData } = useGetGroupQuery({ page: '1', size: '8' });
	const [editAnnouncement] = useEditAnnouncementMutation();
	const [dateInputValue, setDateInputValue] = useState('');
	const [dateInputValue2, setDateInputValue2] = useState('');
	const { control, handleSubmit, reset } = useForm<PostAnnouncementProps>();
	const [patchAnnouncementTable] = usePutAnnouncementTableMutation();
	const { data } = useGetAnnouncementTableQuery();
	const find = data?.announcements?.find((item) => item.id === saveIdElement);
	const [personName, setPersonName] = useState<number[]>([]);

	useEffect(() => {
		if (find) {
			setPersonName(Array.isArray(find.groupNames) ? find.groupNames : []);
		}
	}, [find]);

	const onSubmit = async (data: PostAnnouncementProps) => {
		console.log(data, 'data form');

		const editAnnounCement = {
			announcementContent: data.announcementContent,
			expirationDate: dateInputValue,
			targetGroupIds: [...personName],
			publishedDate: dateInputValue2
		};
		// await patchAnnouncementTable({ id: saveIdElement, editAnnouncement });
		await editAnnouncement({
			id: Number(dataId),
			...editAnnounCement
		});
		closeModalEdit(false);
	};

	const handleChange = (event: SelectChangeEvent<string[]>) => {
		const { value } = event.target;
		setPersonName(typeof value === 'string' ? value.split(',') : value);
	};

	useEffect(() => {
		if (find) {
			reset({
				announcement: find.content,
				group: find.groupNames
			});
		}
	}, [find, reset]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Modal
				open={openModalEdit}
				onClose={() => closeModalEdit(false)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style} className={scss.Announcement_form}>
					<Typography
						className={scss.text}
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						<div className={scss.comText}>
							Редактировать объявление по группам {find?.groupNames.join(', ')}
						</div>
					</Typography>

					<Box className={scss.input_form}>
						<div className={scss.input}>
							<div className={scss.inputText}>
								<Controller
									name="announcementContent"
									control={control}
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
											<MenuItem key={name.id} value={name.id}>
												<Checkbox
													checked={personName.indexOf(name.title) > -1}
												/>
												{/* <ListItemText primary={name} /> */}
												<ListItemText primary={name.title} />
											</MenuItem>
										))}
								</Select>
								<input
									type="date"
									value={dateInputValue}
									onChange={(e) => setDateInputValue(e.target.value)}
								/>
								<input
									type="date"
									value={dateInputValue2}
									onChange={(e) => setDateInputValue2(e.target.value)}
								/>
							</FormControl>
							<div className={scss.btn_form}>
								<ButtonCancel
									type="button"
									disabled={false}
									onClick={() => closeModalEdit(false)}
									width="117px"
								>
									Отмена
								</ButtonCancel>
								<ButtonSave
									width="117px"
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

export default ModalEditAnnouncement;
