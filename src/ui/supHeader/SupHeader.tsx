import { IconChevronDown, IconUserCircle } from '@tabler/icons-react';
import scss from './SupHeader.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Menu, MenuItem, Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';

const SupHeader = () => {
	const { pathname } = useLocation();
	const [open, setOpen] = useState(false);

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const navigate = useNavigate();
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
	const openInstructorStudent = () => {
		navigate(`/instructor/course/${id}/student`);
	};

	const lessonId = localStorage.getItem('lessonId');
	return (
		<div className={scss.header}>
			{/* //! admin header */}
			{pathname !== `/admin/courses/${id}/student` &&
				pathname !== `/admin/courses/${id}/teacher` &&
				pathname !== `/instructor/course/${id}/materials` &&
				pathname !== `/instructor/course/${id}/student` &&
				pathname !== `/instructor/course/${id}/materials/${lessonId}` &&
				pathname !== '/instructor/course/' &&
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
									<Tab label="Рейтинг студентов" {...a11yProps(2)} />
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
		</div>
	);
};
export default SupHeader;