/* eslint-disable react-hooks/exhaustive-deps */
import { IconChevronDown } from '@tabler/icons-react';
import scss from './SupHeader.module.scss';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Box, Menu, MenuItem, Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import NotificationHeader from '../customModal/notificationHeader/NotificationHeader';
import vector from '@/src/assets/svgs/Vector.svg';
import profile from '@/src/assets/svgs/Profile.png';
import bell from '@/src/assets/svgs/Header icons.png';

const SupHeader = () => {
	const { pathname } = useLocation();
	const [openNotification, setOpenNotification] = useState(false);
	const navigate = useNavigate();
	const { courseId, lessonId } = useParams();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleOpenNotification = () => {
		setOpenNotification(true);
	};

	const handleCloseNotification = () => {
		setOpenNotification(false);
	};
	const [value, setValue] = useState(0);

	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	useEffect(() => {
		if (
			pathname === `/admin/courses/${courseId}/teacher` &&
			pathname === `/admin/courses/${courseId}/teacher`
		) {
			setValue(0);
		}
	}, [pathname]);
	useEffect(() => {
		if (
			pathname === `/instructor/course/${courseId}/materials` &&
			pathname === `/instructor/course/${courseId}/materials`
		) {
			setValue(0);
		}
	}, [pathname]);

	// ! instructor video rendering
	useEffect(() => {
		if (pathname === `/instructor/course/${courseId}/materials/${lessonId}`) {
			navigate(`/instructor/course/${courseId}/materials/${lessonId}/video`);
		}
	}, [pathname]);

	// ! student video rendering
	useEffect(() => {
		if (pathname === `/courses/${courseId}/materials/${lessonId}`) {
			navigate(`/courses/${courseId}/materials/${lessonId}/video`);
		}
	}, [pathname]);

	const a11yProps = (index: number) => {
		return {
			id: `simple-tab-${index}`,
			'aria-controls': `simple-tabpanel-${index}`
		};
	};

	const openStudent = () => {
		navigate(`/admin/courses/${courseId}/student`);
	};
	const openTeacher = () => {
		navigate(`/admin/courses/${courseId}/teacher`);
	};
	const openMaterial = () => {
		navigate(`/instructor/course/${courseId}/materials`);
	};
	const openRating = () => {
		navigate(`/instructor/course/${courseId}/rating`);
	};
	const openInstructorStudent = () => {
		navigate(`/instructor/course/${courseId}/student`);
	};
	const openRatingStudent = () => {
		navigate(`/courses/${courseId}/rating`);
	};

	const handleNavigate = () => {
		localStorage.removeItem('token');
		// localStorage.removeItem('isAuth');
		navigate(`/auth/login`);
		setAnchorEl(null);
	};

	return (
		<div className={scss.header}>
			{/* //! admin header для /admin/courses */}
			{pathname.startsWith(`/admin/courses/${courseId}`) && (
				<div className={scss.subHeaderCourses2}>
					<Box>
						<Box
							sx={{
								borderColor: 'divider',
								paddingTop: '10px'
							}}
						>
							<Tabs
								className={scss.tabs}
								value={value}
								onChange={handleChange}
								aria-label="basic tabs example"
							>
								<Tab onClick={openTeacher} label="Учителя" {...a11yProps(0)} />
								<Tab onClick={openStudent} label="Студенты" {...a11yProps(1)} />
							</Tabs>
						</Box>
					</Box>
					<div className={scss.header_elements} onClick={handleClick}>
						<img src={profile} alt="Profile" />
						<div>
							<p> Aдминистратор</p>
						</div>
						<div>
							<IconChevronDown style={{ cursor: 'pointer' }} stroke={2} />
						</div>
					</div>
					<Menu
						id="basic-menu"
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right'
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right'
						}}
						MenuListProps={{
							'aria-labelledby': 'basic-button'
						}}
						PaperProps={{
							style: {
								boxShadow: 'none',
								border: '1px solid #336fff',
								width: '200px',
								background: 'rgb(221, 233, 249)',
								borderRadius: '10px'
							}
						}}
					>
						<MenuItem
							onClick={handleNavigate}
							style={{
								display: 'flex',
								gap: '10px',
								color: '#1976d2',
								fontSize: '18px',
								fontWeight: '600',
								alignItems: 'center'
							}}
						>
							<img src={vector} alt="" />
							<p> Выйти</p>
						</MenuItem>
					</Menu>
				</div>
			)}
			{/* //! ins */}
			{pathname.startsWith(`/instructor/course/${courseId}`) && (
				<div className={scss.subHeaderCourses}>
					<Box>
						<Box
							sx={{
								borderColor: 'divider',
								paddingTop: '10px'
							}}
						>
							<Tabs
								value={value}
								onChange={handleChange}
								aria-label="basic tabs example"
								className={scss.tabs}
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
						<img
							onClick={handleOpenNotification}
							style={{ cursor: 'pointer' }}
							src={bell}
							alt="bell"
						/>
						<img
							style={{ cursor: 'pointer' }}
							onClick={handleClick}
							src={profile}
							alt="Profile"
						/>
						<div onClick={handleClick}>
							<div className={scss.instructor_profile}>Учитель</div>
						</div>
						<IconChevronDown className={scss.photo_profile} stroke={2} />
					</div>
					<Menu
						id="basic-menu"
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right'
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right'
						}}
						MenuListProps={{
							'aria-labelledby': 'basic-button'
						}}
						PaperProps={{
							style: {
								boxShadow: 'none',
								border: '1px solid #336fff',
								width: '200px',
								background: 'rgb(221, 233, 249)',
								borderRadius: '10px'
							}
						}}
					>
						<MenuItem
							onClick={handleNavigate}
							style={{
								display: 'flex',
								gap: '10px',
								color: '#1976d2',
								fontSize: '18px',
								fontWeight: '600',
								alignItems: 'center'
							}}
						>
							<img src={vector} alt="" />
							<p> Выйти</p>
						</MenuItem>
					</Menu>
				</div>
			)}
			{/* //! student header*/}
			{pathname.startsWith(`/courses/${courseId}`) && (
				<div className={scss.subHeaderCourses2}>
					<Box>
						<Box
							sx={{
								borderColor: 'divider',
								paddingTop: '10px'
							}}
						>
							<Tabs
								className={scss.tabs}
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
						></div>
						<img
							style={{ cursor: 'pointer' }}
							onClick={handleOpenNotification}
							src={bell}
							alt="bell"
						/>
						<img style={{ cursor: 'pointer' }} src={profile} alt="Profile" />
						<div style={{ cursor: 'pointer' }}>
							<p>Студент</p>
						</div>
						<IconChevronDown style={{ cursor: 'pointer' }} stroke={2} />
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
