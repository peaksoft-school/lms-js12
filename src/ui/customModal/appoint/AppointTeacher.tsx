/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, FC, useEffect } from 'react';
import {
	Button,
	Modal,
	Box,
	Typography,
	MenuItem,
	Checkbox,
	ListItemText,
	FormControl,
	InputLabel,
	Select,
	OutlinedInput
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { IconX } from '@tabler/icons-react';

import scss from './Appoint.module.scss';
import { useAppointAllTeacherQuery } from '@/src/redux/api/admin/teacher';
import { useAppointAdminCourseMutation } from '@/src/redux/api/admin/courses';

const style = {
	position: 'absolute',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	top: '50%',
	left: '50%',
	gap: '10px',
	transform: 'translate(-50%, -50%)',
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '12px'
};

interface AppointProps {
	open: boolean;
	handleClose: () => void;
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

const AppointTeacher: FC<AppointProps> = ({ open, handleClose }) => {
	const [selectedTeachers, setSelectedTeachers] = useState<string[]>([]);
	const [selectedIds, setSelectedIds] = useState<string[]>([]);
	const { data, error, isLoading } = useAppointAllTeacherQuery();
	const [appointAdminCourse] = useAppointAdminCourseMutation();
	const { courseId } = useParams<{ courseId: string }>();

	useEffect(() => {
		if (error) {
			console.error('Error fetching teachers:', error);
		}
	}, [error]);

	const handleChange = (event: any) => {
		const { value } = event.target;
		setSelectedTeachers(typeof value === 'string' ? value.split(', ') : value);
	};

	const handleRemove = (index: number) => {
		setSelectedTeachers((prev) => prev.filter((_, i) => i !== index));
		setSelectedIds((prev) => prev.filter((_, i) => i !== index));
	};

	const handleSelect = (teacherId: number | null, instructorName: string) => {
		setSelectedTeachers((prev) =>
			prev.includes(instructorName) ? prev : [...prev, instructorName]
		);
		setSelectedIds((prev) =>
			prev.includes(String(teacherId)) ? prev : [...prev, String(teacherId)]
		);
	};

	const appointFunc = async () => {
		try {
			await appointAdminCourse({
				courseId,
				selectId: selectedIds
			});
			handleClose();
		} catch (e) {
			console.error('Failed to appoint teachers:', e);
		}
	};

	if (isLoading) return <div>Loading...</div>;

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style} className={scss.MainModal}>
				<div>
					<Typography
						className={scss.text}
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						<p className={scss.comText}>Назначить учителя/лей</p>
					</Typography>

					<FormControl
						sx={{
							m: 1,
							width: '100%',
							maxWidth: '560px',
							marginLeft: '20px'
						}}
					>
						<InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
						<Select
							labelId="demo-multiple-checkbox-label"
							id="demo-multiple-checkbox"
							multiple
							value={selectedTeachers}
							onChange={handleChange}
							input={<OutlinedInput label="Tag" />}
							renderValue={(selected) => selected.join(', ')}
							MenuProps={MenuProps}
						>
							{data?.map((teacher) => (
								<MenuItem
									key={teacher.Id}
									value={teacher.instructorName}
									onClick={() =>
										handleSelect(teacher.Id, teacher.instructorName)
									}
								>
									<Checkbox
										checked={
											selectedTeachers.indexOf(teacher.instructorName) > -1
										}
									/>
									<ListItemText primary={teacher.instructorName} />
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<Box mt={2}>
						<div className={scss.teachers}>
							{selectedTeachers.map((value, index) => (
								<div key={index} className={scss.teacher}>
									<h4 className={scss.selected}>{value}</h4>
									<button onClick={() => handleRemove(index)}>
										<IconX stroke={2} />
									</button>
								</div>
							))}
						</div>
					</Box>
				</div>

				<div className={scss.buttons}>
					<Button
						style={{ borderRadius: '8px' }}
						variant="outlined"
						onClick={handleClose}
					>
						Отменить
					</Button>
					<Button
						style={{ borderRadius: '8px' }}
						variant="contained"
						onClick={appointFunc}
					>
						Сохранить
					</Button>
				</div>
			</Box>
		</Modal>
	);
};

export default AppointTeacher;
