/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, useForm } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonSave from '@/src/ui/customButton/ButtonSave.tsx';
import scss from './EditAnnouncement.module.scss';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel.tsx';
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
import { useEffect, useState } from 'react';
import {
	useGetAnnouncementTableQuery,
	usePatchAnnouncementTableMutation
} from '@/src/redux/api/admin/announcement';

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
	announcement: string;
	group: string;
	show: boolean;
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
}
const ModalEditAnnouncement: React.FC<modalProps> = ({
	openModalEdit,
	closeModalEdit,
	saveIdElement
}) => {
	const { control, handleSubmit, reset } = useForm<PostAnnouncementProps>();
	const [patchAnnouncementTable] = usePatchAnnouncementTableMutation();
	const { data } = useGetAnnouncementTableQuery();
	const find = data?.find((id) => id.id === saveIdElement);
	const [personName, setPersonName] = useState<string[]>([]);

	useEffect(() => {
		if (find) {
			setPersonName(Array.isArray(find.group) ? find.group : []);
		}
	}, [find]);

	const onSubmit = async (data: PostAnnouncementProps) => {
		const editAnnouncement = {
			...data,
			group: personName
		};
		await patchAnnouncementTable({ editAnnouncement, saveIdElement });
		closeModalEdit(false);
	};

	const handleChange = (event: SelectChangeEvent<typeof personName>) => {
		const {
			target: { value }
		} = event;
		setPersonName(value as string[]);
	};

	useEffect(() => {
		reset({
			announcement: find?.announcement,
			group: find?.group
		});
	}, [find]);

	return (
		<form onSubmit={close}>
			<Modal
				open={openModalEdit}
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
							Редактировать объявление по группам{find?.group}
						</div>
					</Typography>

					<Box className={scss.input_form}>
						<div className={scss.input}>
							<div className={scss.inputText}>
								<Controller
									name="announcement"
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
									className={scss.select}
									style={{
										marginLeft: '15px',
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
