import { Button, Menu, MenuItem } from '@mui/material';
import { IconDotsVertical, IconPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import scss from './CreateTask.module.scss';
import { useGetTaskInstructorQuery } from '@/src/redux/api/instructor/addTask';
import deleteImg from '@/src/assets/svgs/delete-red.svg';
import editImg from '@/src/assets/svgs/edit.svg';
import { useState } from 'react';
import DeleteTask from '@/src/ui/customModal/deleteModal/DeleteTask';

const CrateTask = () => {
	const [openDelete, setOpenDelete] = useState(false);
	const [saveId, setSaveId] = useState(null);
	const navigate = useNavigate();
	const { data } = useGetTaskInstructorQuery();
	const id = localStorage.getItem('id');
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const lessonId = localStorage.getItem('lessonId');

	const openLessonAddTask = () => {
		navigate(`/instructor/course/${id}/materials/${lessonId}/lesson/addTask`);
	};
	const openLessonEditTask = () => {
		navigate(`/instructor/course/${id}/materials/${lessonId}/lesson/update`);
	};

	const GetTask = () => {
		navigate(`/instructor/course/${id}/materials/${lessonId}/lesson/getTask`);
	};
	return (
		<div className={scss.Task}>
			<div className={scss.course_button_modal}>
				<Button
					size="large"
					className={scss.button}
					onClick={openLessonAddTask}
					variant="contained"
				>
					<div className={scss.icon}>
						<IconPlus stroke={2} />
					</div>
					<span>Создать задание</span>
				</Button>
			</div>
			<div className={scss.card_lesson}>
				{data?.map((item) => (
					<div className={scss.card_container}>
						<p className={scss.card_link} href="#" onClick={GetTask}>
							{item.title}
						</p>
						<div onClick={handleClick} className={scss.button}>
							<button>
								<IconDotsVertical stroke={2} />
							</button>
						</div>
						{
							<Menu
								id="positioned-menu"
								anchorEl={anchorEl}
								open={open}
								onClose={handleClose}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'right'
								}}
								transformOrigin={{
									vertical: 'top',
									horizontal: 'left'
								}}
							>
								<MenuItem
									onClick={() => {
										localStorage.setItem('task', String(item._id));
										openLessonEditTask();
									}}
								>
									<img src={editImg} alt="#" />
									Редактировать
								</MenuItem>
								<MenuItem
									onClick={() => {
										setSaveId(item._id);
										setOpenDelete(true);
										handleClose();
									}}
								>
									<img src={deleteImg} alt="#" />
									Удалить
								</MenuItem>
							</Menu>
						}
					</div>
				))}
			</div>

			<DeleteTask
				openModalDelete={openDelete}
				closeModalDelete={() => setOpenDelete(false)}
				deleteById={saveId}
			/>
		</div>
	);
};

export default CrateTask;
