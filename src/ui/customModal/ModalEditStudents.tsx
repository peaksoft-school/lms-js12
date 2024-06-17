// import { FC, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import ButtonSave from '@/src/ui/customButton/ButtonSave';
// import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
// import {
// 	Checkbox,
// 	FormControl,
// 	InputLabel,
// 	ListItemText,
// 	MenuItem,
// 	OutlinedInput,
// 	Select,
// 	SelectChangeEvent
// } from '@mui/material';
// import { useEditAnnouncementMutation } from '@/src/redux/api/admin/announcement';
// import scss from './EditAnnouncement.module.scss';
// import { useGetGroupTableQuery } from '@/src/redux/api/instructor/student';
// import { useParams } from 'react-router-dom';

// interface PostAnnouncementProps {
// 	announcementContent: string;
// 	expirationDate: string;
// 	targetGroupIds: number[];
// 	publishedDate: string;
// }

// interface ModalProps {
// 	openModalEdit: boolean;
// 	closeModalEdit: (openModalEdit: boolean) => void;
// 	saveIdElement: number | null;
// }

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
// 	PaperProps: {
// 		style: {
// 			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
// 			width: 250
// 		}
// 	}
// };

// const style = {
// 	position: 'absolute',
// 	top: '50%',
// 	left: '50%',
// 	transform: 'translate(-50%, -50%)',
// 	minHeight: 230,
// 	backgroundColor: '#ffffff',
// 	bgColor: 'background.paper',
// 	boxShadow: 24,
// 	p: 4,
// 	borderRadius: '12px'
// };

// const ModalEditStudents: FC<ModalProps> = ({
// 	openModalEdit,
// 	closeModalEdit,
// 	saveIdElement
// }) => {
// 	const [editAnnouncement] = useEditAnnouncementMutation();
// 	const { group } = useParams();
// 	const { data: groupData } = useGetGroupTableQuery(group);
// 	const [selectedIds, setSelectedIds] = useState<number[]>([]); // Corrected type to number[]
// 	const { reset } = useForm<PostAnnouncementProps>();
// 	// const { data } = useGetAnnouncementTableQuery();
// 	const find = groupData?.announcements?.find(
// 		(item) => item.id === saveIdElement
// 	);
// 	const [personName, setPersonName] = useState<string[]>([]); // Corrected type to string[]

// 	// handleSubmit
// 	// useEffect(() => {
// 	// 	if (find) {
// 	// 		setPersonName(Array.isArray(find.groupNames) ? find.groupNames : []);
// 	// 	}
// 	// }, [find]);

// 	const handleSelect = (groupId: number) => {
// 		setSelectedIds((prev) =>
// 			prev.includes(groupId) ? prev : [...prev, groupId]
// 		);
// 	};

// 	const handleChange = (event: SelectChangeEvent<number[] | string[]>) => {
// 		const { value } = event.target;
// 		if (typeof value === 'string') {
// 			setPersonName(value.split(','));
// 		} else {
// 			setPersonName(value.map(String));
// 		}
// 	};

// 	const onSubmit = async (data: PostAnnouncementProps) => {
// 		const editAnnouncementData = {
// 			announcementContent: data.announcementContent,
// 			expirationDate: data.expirationDate,
// 			targetGroupIds: selectedIds,
// 			publishedDate: data.publishedDate
// 		};

// 		console.log(editAnnouncementData);

// 		await editAnnouncement({ editAnnouncementData, saveIdElement });
// 		closeModalEdit(false);
// 	};

// 	// useEffect(() => {
// 	// 	if (find) {
// 	// 		reset({
// 	// 			// announcementContent: find.content,
// 	// 			personName: find.groupNames,
// 	// 			expirationDate: find.endDate,
// 	// 			publishedDate: find.publishDate
// 	// 		} as Partial<PostAnnouncementProps>);
// 	// 	}
// 	// }, [find, reset]);
// 	const handleSubmit = async () => {
// 		try {
// 			await mutation.mutateAsync({
// 				newStudent,
// 				courseId: courseId,
// 				groupId: groupId
// 			});
// 			setNewStudent({});
// 			closeModalEdit();
// 		} catch (error) {
// 			console.error('Ошибка при сохранении студента', error);
// 		}
// 	};
// 	return (
// 		<form onSubmit={handleSubmit(onSubmit)}>
// 			<Modal
// 				open={openModalEdit}
// 				onClose={() => closeModalEdit(false)}
// 				aria-labelledby="modal-modal-title"
// 				aria-describedby="modal-modal-description"
// 			>
// 				<Box sx={style} className={scss.Announcement_form}>
// 					<Typography
// 						className={scss.text}
// 						id="modal-modal-title"
// 						variant="h6"
// 						component="h2"
// 					>
// 						<div className={scss.comText}>
// 							Добавить студентов группы в курс{find?.groupNames.join(', ')}
// 						</div>
// 					</Typography>

// 					<Box className={scss.input_form}>
// 						<div className={scss.input}>
// 							<FormControl sx={{ m: 1, width: 300 }} className={scss.input}>
// 								<InputLabel
// 									id="demo-multiple-checkbox-label"
// 									style={{
// 										paddingLeft: '20px',
// 										textAlign: 'center'
// 									}}
// 								>
// 									Группы
// 								</InputLabel>
// 								<Select
// 									labelId="demo-multiple-checkbox-label"
// 									id="demo-multiple-checkbox"
// 									multiple
// 									value={personName}
// 									onChange={handleChange}
// 									input={<OutlinedInput label="Группы" />}
// 									renderValue={(selected) => selected.join(', ')}
// 									MenuProps={MenuProps}
// 									style={{
// 										maxWidth: '540px',
// 										width: '100%',
// 										height: '55px',
// 										borderRadius: '12px',
// 										position: 'relative',
// 										top: '0'
// 									}}
// 								>
// 									{groupData &&
// 										groupData.group.map((name) => (
// 											<MenuItem
// 												key={name.id}
// 												value={name.title}
// 												onClick={() => handleSelect(name.id)}
// 											>
// 												<Checkbox checked={selectedIds.includes(name.id)} />
// 												<ListItemText primary={name.groupName} />
// 											</MenuItem>
// 										))}
// 								</Select>
// 							</FormControl>
// 							<div className={scss.btn_form}>
// 								<ButtonCancel
// 									type="button"
// 									disabled={false}
// 									onClick={() => closeModalEdit(false)}
// 									width="117px"
// 								>
// 									Отмена
// 								</ButtonCancel>
// 								<ButtonSave
// 									width="117px"
// 									type="submit"
// 									disabled={false}
// 									onClick={handleSubmit(onSubmit)}
// 								>
// 									Отправить
// 								</ButtonSave>
// 							</div>
// 						</div>
// 					</Box>
// 				</Box>
// 			</Modal>
// 		</form>
// 	);
// };

// export default ModalEditStudents;

import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonSave from '@/src/ui/customButton/ButtonSave';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
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
import { useEditAnnouncementMutation } from '@/src/redux/api/admin/announcement';
import scss from './EditAnnouncement.module.scss';
import { useGetGroupTableQuery } from '@/src/redux/api/instructor/student';
import { useParams } from 'react-router-dom';

interface PostAnnouncementProps {
	announcementContent: string;
	expirationDate: string;
	targetGroupIds: number[];
	publishedDate: string;
}

interface ModalProps {
	openModalEdit: boolean;
	closeModalEdit: (openModalEdit: boolean) => void;
	saveIdElement: number | null;
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
	minHeight: 230,
	backgroundColor: '#ffffff',
	bgColor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '12px'
};

const ModalEditStudents: FC<ModalProps> = ({
	openModalEdit,
	closeModalEdit,
	saveIdElement
}) => {
	const [editAnnouncement] = useEditAnnouncementMutation();
	const { group } = useParams();
	const { data: groupData } = useGetGroupTableQuery(group);
	const [selectedIds, setSelectedIds] = useState<number[]>([]);
	const { reset } = useForm<PostAnnouncementProps>();

	const find = groupData?.announcements?.find(
		(item) => item.id === saveIdElement
	);

	const [newStudent, setNewStudent] = useState({
		// Здесь инициализируйте начальные значения студента
		firstName: '',
		lastName: ''
		// Другие поля
	});

	const handleSelect = (groupId: number) => {
		setSelectedIds((prev) =>
			prev.includes(groupId) ? prev : [...prev, groupId]
		);
	};

	const handleChange = (event: SelectChangeEvent<number[] | string[]>) => {
		const { value } = event.target;
		if (typeof value === 'string') {
			setPersonName(value.split(','));
		} else {
			setPersonName(value.map(String));
		}
	};

	const onSubmit = async (data: PostAnnouncementProps) => {
		const editAnnouncementData = {
			announcementContent: data.announcementContent,
			expirationDate: data.expirationDate,
			targetGroupIds: selectedIds,
			publishedDate: data.publishedDate
		};

		console.log(editAnnouncementData);

		try {
			await editAnnouncement({ editAnnouncementData, saveIdElement });
			closeModalEdit(false);
		} catch (error) {
			console.error('Ошибка при редактировании объявления', error);
		}
	};

	const handleSubmit = async () => {
		try {
			await postStudentTable({
				newStudent,
				courseId: find?.courseId, // Подставьте соответствующее поле из find или другого места
				groupId: selectedIds // Возможно, здесь вам нужно выбрать конкретный groupId
			});
			setNewStudent({}); // Очистка данных после отправки
			closeModalEdit(false);
		} catch (error) {
			console.error('Ошибка при сохранении студента', error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
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
							Добавить студента в группу курса {find?.groupNames.join(', ')}
						</div>
					</Typography>

					<Box className={scss.input_form}>
						<div className={scss.input}>
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
									value={selectedIds}
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
										groupData.group.map((name) => (
											<MenuItem
												key={name.id}
												value={name.id}
												onClick={() => handleSelect(name.id)}
											>
												<Checkbox checked={selectedIds.includes(name.id)} />
												<ListItemText primary={name.groupName} />
											</MenuItem>
										))}
								</Select>
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
								<ButtonSave width="117px" type="submit" disabled={false}>
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

export default ModalEditStudents;
