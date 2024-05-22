/* eslint-disable react-hooks/exhaustive-deps */
import {
	IconBellRinging2,
	IconChevronDown,
	IconUserCircle
} from '@tabler/icons-react';
import scss from './SupHeader.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Menu, MenuItem, Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import NotificationHeader from '../customModal/notificationHeader/NotificationHeader';

const SupHeader = () => {
	const { pathname } = useLocation();
	const [open, setOpen] = useState(false);
	const [openNotification, setOpenNotification] = useState(false);
	const navigate = useNavigate();

	const handleOpenNotification = () => {
		setOpenNotification(true);
	};

	const handleCloseNotification = () => {
		setOpenNotification(false);
	};

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const [value, setValue] = useState(0);

	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

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

	// ! instructor video rendering
	useEffect(() => {
		if (pathname === `/instructor/course/${id}/materials/${lessonId}`) {
			navigate(`/instructor/course/${id}/materials/${lessonId}/video`);
		}
	}, [pathname]);

	// ! student video rendering
	useEffect(() => {
		if (pathname === `/courses/${id}/materials/${lessonId}`) {
			navigate(`/courses/${id}/materials/${lessonId}/video`);
		}
	}, [pathname]);

	const a11yProps = (index: number) => {
		return {
			id: `simple-tab-${index}`,
			'aria-controls': `simple-tabpanel-${index}`
		};
	};
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
	const openRating = () => {
		navigate(`/instructor/course/${id}/rating`);
	};
	const openInstructorStudent = () => {
		navigate(`/instructor/course/${id}/student`);
	};
	const openRatingStudent = () => {
		navigate(`/courses/${id}/rating`);
	};

	const lessonId = localStorage.getItem('lessonId');
	const task = localStorage.getItem('task');
	const taskId = localStorage.getItem('taskId');
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
				pathname !==
					`/instructor/course/${id}/materials/${lessonId}/presentation` &&
				pathname !== `/courses/${id}/materials` &&
				pathname !== `/courses/${id}/materials/${lessonId}/video` &&
				pathname !== `/courses/${id}/materials/${lessonId}/presentation` &&
				pathname !== `/instructor/course/${id}/materials/${lessonId}/lesson` &&
				pathname !==
					`/instructor/course/${id}/materials/${lessonId}/lesson/update` &&
				pathname !==
					`/instructor/course/${id}/materials/${lessonId}/lesson/addTask` &&
				pathname !==
					`/instructor/course/${id}/materials/${lessonId}/lesson/getTask` &&
				pathname !== '/instructor/course/' &&
				pathname !==
					`/instructor/course/${id}/materials/${lessonId}/lesson/${task}/getTask` &&
				pathname !==
					`/instructor/course/${id}/materials/${lessonId}/lesson/${task}/notSubmitted` &&
				pathname !==
					`/instructor/course/${id}/materials/${lessonId}/lesson/${task}/notAccepted` &&
				pathname !==
					`/instructor/course/${id}/materials/${lessonId}/lesson/${task}/accepted` &&
				pathname !==
					`/instructor/course/${id}/materials/${lessonId}/lesson/${task}/panding` &&
				pathname !==
					`/instructor/course/${id}/materials/${lessonId}/lesson/${task}/late` &&
				pathname !==
					`/instructor/course/${id}/materials/${lessonId}/lesson/${task}/answer/${taskId}` &&
				pathname !== `/instructor/course/${id}/rating` &&
				pathname !== `/courses/${id}/rating` &&
				pathname !==
					`/instructor/course/${id}/materials/${lessonId}/showTest` &&
				pathname !== `/instructor/course/${id}/materials/${lessonId}/test` &&
				pathname !== `/courses/${id}/materials/${lessonId}/showTest` &&
				pathname !== `/courses/${id}/materials/${lessonId}/test` &&
				!isAdminCourseWithId &&
				!isInstructorCourseWithId && (
					<div className={scss.header_elements}>
						{pathname.startsWith('/courses') && (
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									cursor: 'pointer'
								}}
							>
								<IconBellRinging2
									onClick={handleOpenNotification}
									style={{ width: '30px', height: '30px' }}
									stroke={2}
								/>
							</div>
						)}
						{pathname.startsWith('/instructor') && (
							<div
								style={{
									display: 'flex',
									cursor: 'pointer',
									alignItems: 'center'
								}}
							>
								<IconBellRinging2
									onClick={handleOpenNotification}
									style={{ width: '30px', height: '30px' }}
									stroke={2}
								/>
							</div>
						)}
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
								</div>
							)}
							{pathname.startsWith('/instructor') && (
								<>
									<div style={{ fontSize: '18px', fontWeight: '500' }}>
										Учитель
									</div>
								</>
							)}
							{pathname.startsWith('/courses') && (
								<div style={{ fontSize: '18px', fontWeight: '500' }}>
									Студент
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
						<Box>
							<Box
								sx={{
									borderColor: 'divider',
									paddingTop: '20px'
								}}
							>
								<Tabs
									value={value}
									onChange={handleChange}
									aria-label="basic tabs example"
								>
									<Tab
										onClick={openTeacher}
										label="Учителя"
										{...a11yProps(0)}
									/>
									<Tab
										onClick={openStudent}
										label="Студенты"
										{...a11yProps(1)}
									/>
								</Tabs>
							</Box>
						</Box>
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
						<Box>
							<Box
								sx={{
									borderColor: 'divider',
									paddingTop: '20px'
								}}
							>
								<Tabs
									value={value}
									onChange={handleChange}
									aria-label="basic tabs example"
								>
									<Tab
										onClick={openTeacher}
										label="Учителя"
										{...a11yProps(0)}
									/>
									<Tab
										onClick={openStudent}
										label="Студенты"
										{...a11yProps(1)}
									/>
								</Tabs>
							</Box>
						</Box>
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
						<Box>
							<Box
								sx={{
									borderColor: 'divider',
									paddingTop: '20px'
								}}
							>
								<Tabs
									value={value}
									onChange={handleChange}
									aria-label="basic tabs example"
								>
									<Tab
										onClick={openMaterial}
										label="Материалы"
										{...a11yProps(0)}
									/>
									<Tab
										onClick={openInstructorStudent}
										label="Студенты"
										{...a11yProps(1)}
									/>
									<Tab
										onClick={openRating}
										label="Рейтинг студентов"
										{...a11yProps(2)}
									/>
								</Tabs>
							</Box>
						</Box>
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
			{/* //! student header*/}
			{pathname.startsWith(`/courses/${id}`) && pathname !== '/courses' && (
				<div className={scss.subHeaderCourses2}>
					<Box>
						<Box
							sx={{
								borderColor: 'divider',
								paddingTop: '20px'
							}}
						>
							<Tabs
								value={value}
								onChange={handleChange}
								aria-label="basic tabs example"
							>
								<Tab label="Материалы" {...a11yProps(0)} />
								<Tab
									onClick={openRatingStudent}
									label="Рейтинг Студентов"
									{...a11yProps(1)}
								/>
							</Tabs>
						</Box>
					</Box>
					<div className={scss.header_elements}>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								cursor: 'pointer'
							}}
						>
							<IconBellRinging2
								onClick={handleOpenNotification}
								style={{ width: '30px', height: '30px' }}
								stroke={2}
							/>
						</div>
						<IconUserCircle className={scss.profile} stroke={2} />
						<div
							className={scss.profile_text}
							id="basic-button"
							aria-controls={open ? 'basic-menu' : undefined}
							aria-haspopup="true"
							aria-expanded={open ? 'true' : undefined}
							onClick={handleClick}
						>
							{pathname.startsWith('/courses') && (
								<div style={{ fontSize: '18px', fontWeight: '500' }}>
									<>
										<p>Студент</p>
									</>
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
			<NotificationHeader
				open={openNotification}
				handleClose={handleCloseNotification}
			/>
		</div>
	);
};
export default SupHeader;
