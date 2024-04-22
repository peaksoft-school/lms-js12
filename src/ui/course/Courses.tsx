/* eslint-disable @typescript-eslint/no-unused-vars */
import scss from './Courses.modal.scss';
import { FC, useState } from 'react';
import { useGetCourseQuery } from '@/src/redux/api/admin/courses';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import deleteImg from '@/src/assets/svgs/delete-red.svg';
import editImg from '@/src/assets/svgs/edit.svg';
import { IconDots } from '@tabler/icons-react';
import CreateCourse from '../customModal/CreateCurse';
import EditCourse from '../customModal/editModalCourse/EditCourse';
import DeleteCourses from '../customModal/deleteModalCourse/DeleteCourse';

const Courses: FC = () => {
	const [openEditModal, setOpenEditModal] = useState(false);
	const handleCloseEditModal = () => setOpenEditModal(false);
	const { data } = useGetCourseQuery();
	const [saveId, setSaveId] = useState<null | number>(null);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [deleteModal, setDeleteModal] = useState(false);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<div>
				<CreateCourse />

			</div>
			<div className={scss.Cards}>
				{data?.map((item) => (
					<div key={item._id} className={scss.zeroBlockContainer}>
						<div className={scss.BlockContainerImage}>
							<img className={scss.BlockImage} src={item.img} alt="images" />
						</div>
						<div className={scss.BlockCont}>
							<div className={scss.secondBlockContainer}>
								<p className={scss.BlockTitle}>{item.title}</p>
								<p className={scss.BlockDate}>{item.date}</p>
							</div>
							<div className={scss.text_card}>
								<span className={scss.BlockText}>
									{item.text && item.text.length > 60
										? `${item.text.substring(0, 60)}...`
										: item.text}
								</span>
							</div>
						</div>
						<div className={scss.BlockButtonDiv}>
							<div onClick={handleClick}>
								<button
									className={scss.BlockButtonDotts}
									onClick={() => {
										setSaveId(item._id);
									}}
								>
									<IconDots stroke={2} />
								</button>
							</div>
							{
								<Menu
									id="positioned-menu"
									anchorEl={anchorEl}
									open={open}
									onClose={handleClose}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'left'
									}}
									transformOrigin={{
										vertical: 'top',
										horizontal: 'left'
									}}
								>
									<MenuItem
										onClick={() => {
											setOpenEditModal(true);
											handleClose();
										}}
									>
										<img src={editImg} />
										Редактировать
									</MenuItem>
									<MenuItem
										onClick={() => {
											setDeleteModal(true);
											handleClose();
										}}
									>
										<img src={deleteImg} />
										Удалить
									</MenuItem>
								</Menu>
							}
						</div>
					</div>
				))}
				<EditCourse
					open={openEditModal}
					handleClose={handleCloseEditModal}
					saveId={saveId}
				/>
			</div>
			<DeleteCourses
				openModalDelete={deleteModal}
				closeModalDelete={() => setDeleteModal(false)}
				deleteById={saveId}
			/>
		</>
	);
};

export default Courses;
