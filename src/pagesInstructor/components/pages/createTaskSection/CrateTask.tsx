import { Button, Menu, MenuItem } from '@mui/material';
import { IconDotsVertical, IconPlus } from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import scss from './CreateTask.module.scss';
import { useGetTaskInstructorQuery } from '@/src/redux/api/instructor/addTask';
import deleteImg from '@/src/assets/svgs/delete-red.svg';
import editImg from '@/src/assets/svgs/edit.svg';
import { useState } from 'react';
import DeleteTask from '@/src/ui/customModal/deleteModal/DeleteTask';

const CrateTask = () => {
	const [openDelete, setOpenDelete] = useState(false);
	const [saveId, setSaveId] = useState<number | null>(null);
	const navigate = useNavigate();
	const { courseId, lessonId, getTaskId } = useParams();
	const { data } = useGetTaskInstructorQuery(lessonId);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const openLessonAddTask = () => {
		navigate(
			`/instructor/course/${courseId}/materials/${lessonId}/lesson/addTask`
		);
	};

	const openLessonEditTask = () => {
		navigate(
			`/instructor/course/${courseId}/materials/${lessonId}/lesson/update`
		);
	};

	const GetTask = () => {
		navigate(
			`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/panding`
		);
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
				{data?.taskResponse.map((item) => (
					<div
						className={scss.card_container}
						onClick={() => {
							localStorage.setItem('hwTask', item.title);
							setSaveId(item.id);
						}}
					>
						<p onClick={GetTask} className={scss.card_link}>
							{item.title}
						</p>
						<div className={scss.button}>
							<button onClick={handleClick}>
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
										openLessonEditTask();
									}}
									// onClick={() => {
									// 	setOpenEditModal(true);ч
									// 	setAnchorEl(null);
									// }}
								>
									<img src={editImg} alt="#" />
									Редактировать
								</MenuItem>

								<MenuItem
									// onClick={() => {
									// 	setOpenDelete(true);
									// 	handleClose();
									// }}
									onClick={() => {
										setOpenDelete(true);
										setAnchorEl(null);
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
