import {
	IconAlignJustified,
	IconChevronDown,
	IconUserCircle
} from '@tabler/icons-react';
import scss from './SubHeaderMobile.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Menu, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';

const SupHeaderMobile = () => {
	const { pathname } = useLocation();
	const [open, setOpen] = useState(false);

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const navigate = useNavigate();
	const [anchorElOpen, setAnchorElOpen] = useState<null | HTMLElement>(null);
	const [value, setValue] = useState<number>(0);
	console.log(value);

	useEffect(() => {
		if (
			pathname === `/admin/courses/${id}/teacher` &&
			pathname === `/admin/courses/${id}/teacher`
		) {
			setValue(0);
		}
	}, [pathname]);
	useEffect(() => {
		if (
			pathname === `/instructor/course/${id}/materials` &&
			pathname === `/instructor/course/${id}/materials`
		) {
			setValue(0);
		}
	}, [pathname]);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleLogout = () => {
		navigate('/registration');
	};
	const isAdminCourseWithId = /^\/admin\/courses\/\w+$/.test(
		window.location.pathname
	);
	const id = localStorage.getItem('id');
	const isInstructorCourseWithId = /^\/instructor\/course\/\w+$/.test(pathname);
	const openStudent = () => {
		navigate(`/admin/courses/${id}/student`);
	};
	const openTeacher = () => {
		navigate(`/admin/courses/${id}/teacher`);
	};
	const openMaterial = () => {
		navigate(`/instructor/course/${id}/materials`);
	};
	const openInstructorStudent = () => {
		navigate(`/instructor/course/${id}/student`);
	};

	const lessonId = localStorage.getItem('lessonId');
	const openel = Boolean(anchorElOpen);
	const handleClickOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorElOpen(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorElOpen(null);
	};
	return (
		<div className={scss.header}>
			{/* //! admin header */}
			{pathname !== `/admin/courses/${id}/student` &&
				pathname !== `/admin/courses/${id}/teacher` &&
				pathname !== `/instructor/course/${id}/materials` &&
				pathname !== `/instructor/course/${id}/student` &&
				pathname !== `/instructor/course/${id}/materials/${lessonId}` &&
				pathname !== '/instructor/course/' &&
				pathname !== `/instructor/course/${id}/materials/${lessonId}/video` &&
				pathname !== `/instructor/course/${id}/materials/${lessonId}/test` &&
				pathname !==
					`/instructor/course/${id}/materials/${lessonId}/showTest` &&
				!isAdminCourseWithId &&
				!isInstructorCourseWithId && (
					<div className={scss.header_elements}>
						<IconUserCircle className={scss.profile} stroke={2} />
						<div
							id="basic-button"
							aria-controls={open ? 'basic-menu' : undefined}
							aria-haspopup="true"
							aria-expanded={open ? 'true' : undefined}
							onClick={handleClick}
						>
							{pathname.startsWith('/admin') && (
								<div style={{ fontSize: '18px', fontWeight: '500' }}>
									{pathname.startsWith('/admin') && (
										<>
											<p> Aдминистратор</p>
										</>
									)}
									{pathname.startsWith('/instructor') && (
										<>
											<p>Учитель</p>
										</>
									)}
									{pathname === '/' && (
										<>
											<p>Студент</p>
										</>
									)}
								</div>
							)}
							{pathname.startsWith('/instructor') && (
								<div style={{ fontSize: '18px', fontWeight: '500' }}>
									Учитель
								</div>
							)}
						</div>
						<IconChevronDown style={{ cursor: 'pointer' }} stroke={2} />
						<Menu
							id="basic-menu"
							anchorEl={anchorEl}
							open={open}
							onClose={() => setOpen(false)}
							MenuListProps={{
								'aria-labelledby': 'basic-button'
							}}
						>
							<MenuItem onClick={handleLogout}>Выйти</MenuItem>
						</Menu>
					</div>
				)}
			{/* //! admin header для /admin/courses */}
			{pathname === `/admin/courses/${id}/student` &&
				pathname !== 'admin/courses' && (
					<div className={scss.subHeaderCourses2}>
						<Button
							id="basic-button"
							aria-controls={openel ? 'basic-menu' : undefined}
							aria-haspopup="true"
							aria-expanded={openel ? 'true' : undefined}
							onClick={handleClickOpen}
						>
							<IconAlignJustified stroke={2} />
						</Button>
						<Menu
							id="basic-menu"
							anchorEl={anchorElOpen}
							open={openel}
							onClose={handleClose}
							MenuListProps={{
								'aria-labelledby': 'basic-button'
							}}
						>
							<MenuItem
								onClick={() => {
									openTeacher();
									handleClose();
								}}
							>
								Учителя
							</MenuItem>
							<MenuItem
								onClick={() => {
									openStudent();
									handleClose();
								}}
							>
								Студенты
							</MenuItem>
						</Menu>

						<div className={scss.header_elements}>
							<IconUserCircle className={scss.profile} stroke={2} />
							<div
								className={scss.profile_text}
								id="basic-button"
								aria-controls={open ? 'basic-menu' : undefined}
								aria-haspopup="true"
								aria-expanded={open ? 'true' : undefined}
								onClick={handleClick}
							>
								{pathname.startsWith('/admin') && (
									<div style={{ fontSize: '18px', fontWeight: '500' }}>
										{pathname.startsWith('/admin') && (
											<>
												<p> Aдминистратор</p>
											</>
										)}
										{pathname.startsWith('/instructor') && (
											<>
												<p>Учитель</p>
											</>
										)}
										{pathname === '/' && (
											<>
												<p>Студент</p>
											</>
										)}
									</div>
								)}
								{pathname.startsWith('/instructor') && (
									<div
										style={{ fontSize: '18px', fontWeight: '500' }}
										className={scss.person}
									>
										Учитель
									</div>
								)}
							</div>
							<IconChevronDown style={{ cursor: 'pointer' }} stroke={2} />
							<Menu
								id="basic-menu"
								anchorEl={anchorEl}
								open={open}
								onClose={() => setOpen(false)}
								MenuListProps={{
									'aria-labelledby': 'basic-button'
								}}
							>
								<MenuItem onClick={handleLogout}>Выйти</MenuItem>
							</Menu>
						</div>
					</div>
				)}
			{pathname === `/admin/courses/${id}/teacher` &&
				pathname !== 'admin/courses' && (
					<div className={scss.subHeaderCourses2}>
						<Button
							id="basic-button"
							aria-controls={openel ? 'basic-menu' : undefined}
							aria-haspopup="true"
							aria-expanded={openel ? 'true' : undefined}
							onClick={handleClickOpen}
						>
							<IconAlignJustified stroke={2} />
						</Button>
						<Menu
							id="basic-menu"
							anchorEl={anchorElOpen}
							open={openel}
							onClose={handleClose}
							MenuListProps={{
								'aria-labelledby': 'basic-button'
							}}
						>
							<MenuItem
								onClick={() => {
									openTeacher();
									handleClose();
								}}
							>
								Учителя
							</MenuItem>
							<MenuItem
								onClick={() => {
									openStudent();
									handleClose();
								}}
							>
								Студенты
							</MenuItem>
						</Menu>

						<div className={scss.header_elements}>
							<IconUserCircle className={scss.profile} stroke={2} />
							<div
								className={scss.profile_text}
								id="basic-button"
								aria-controls={open ? 'basic-menu' : undefined}
								aria-haspopup="true"
								aria-expanded={open ? 'true' : undefined}
								onClick={handleClick}
							>
								{pathname.startsWith('/admin') && (
									<div style={{ fontSize: '18px', fontWeight: '500' }}>
										{pathname.startsWith('/admin') && (
											<>
												<p> Aдминистратор</p>
											</>
										)}
										{pathname.startsWith('/instructor') && (
											<>
												<p>Учитель</p>
											</>
										)}
										{pathname === '/' && (
											<>
												<p>Студент</p>
											</>
										)}
									</div>
								)}
								{pathname.startsWith('/instructor') && (
									<div style={{ fontSize: '18px', fontWeight: '500' }}>
										Учитель
									</div>
								)}
							</div>
							<IconChevronDown style={{ cursor: 'pointer' }} stroke={2} />
							<Menu
								id="basic-menu"
								anchorEl={anchorEl}
								open={open}
								onClose={() => setOpen(false)}
								MenuListProps={{
									'aria-labelledby': 'basic-button'
								}}
							>
								<MenuItem onClick={handleLogout}>Выйти</MenuItem>
							</Menu>
						</div>
					</div>
				)}
			{/* //! ins */}
			{pathname.startsWith('/instructor/course/') &&
				pathname !== 'instructor/course' && (
					<div className={scss.subHeaderCourses}>
						<Button
							id="basic-button"
							aria-controls={openel ? 'basic-menu' : undefined}
							aria-haspopup="true"
							aria-expanded={openel ? 'true' : undefined}
							onClick={handleClickOpen}
						>
							<IconAlignJustified stroke={2} />
						</Button>
						<Menu
							id="basic-menu"
							anchorEl={anchorElOpen}
							open={openel}
							onClose={handleClose}
							MenuListProps={{
								'aria-labelledby': 'basic-button'
							}}
						>
							<MenuItem
								onClick={() => {
									openMaterial();
									handleClose();
								}}
							>
								Материалы
							</MenuItem>
							<MenuItem
								onClick={() => {
									openInstructorStudent();
									handleClose();
								}}
							>
								Студенты
							</MenuItem>
							<MenuItem
								onClick={() => {
									handleClose();
								}}
							>
								Рейтинг студентов
							</MenuItem>
						</Menu>

						<div className={scss.header_elements}>
							<IconUserCircle className={scss.profile} stroke={2} />
							<div
								id="basic-button"
								aria-controls={open ? 'basic-menu' : undefined}
								aria-haspopup="true"
								aria-expanded={open ? 'true' : undefined}
								onClick={handleClick}
							>
								{pathname.startsWith('/admin') && (
									<div className={scss.instructor_elements}>
										{pathname.startsWith('/admin') && (
											<>
												<p> Aдминистратор</p>
											</>
										)}
										{pathname.startsWith('/instructor') && (
											<>
												<p>Учитель</p>
											</>
										)}
										{pathname === '/' && (
											<>
												<p>Студент</p>
											</>
										)}
									</div>
								)}
								{pathname.startsWith('/instructor') && (
									<div className={scss.instructor_profile}>Учитель</div>
								)}
							</div>
							<IconChevronDown style={{ cursor: 'pointer' }} stroke={2} />
							<Menu
								id="basic-menu"
								anchorEl={anchorEl}
								open={open}
								onClose={() => setOpen(false)}
								MenuListProps={{
									'aria-labelledby': 'basic-button'
								}}
							>
								<MenuItem onClick={handleLogout}>Выйти</MenuItem>
							</Menu>
						</div>
					</div>
				)}
		</div>
	);
};
export default SupHeaderMobile;
