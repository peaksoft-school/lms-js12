/* eslint-disable react-hooks/exhaustive-deps */
import {
	IconBellRinging2,
	IconChevronDown,
	IconUserCircle
} from '@tabler/icons-react';
import scss from './SupHeader.module.scss';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Box, Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import NotificationHeader from '../customModal/notificationHeader/NotificationHeader';

const SupHeader = () => {
	const { pathname } = useLocation();
	const [openNotification, setOpenNotification] = useState(false);
	const navigate = useNavigate();
	const { courseId } = useParams();

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

	const lessonId = localStorage.getItem('lessonId');

	return (
		<div className={scss.header}>
			{/* //! admin header для /admin/courses */}
			{pathname.startsWith(`/admin/courses/${courseId}`) && (
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
								<Tab onClick={openTeacher} label="Учителя" {...a11yProps(0)} />
								<Tab onClick={openStudent} label="Студенты" {...a11yProps(1)} />
							</Tabs>
						</Box>
					</Box>
					<div className={scss.header_elements}>
						<IconUserCircle className={scss.profile} stroke={2} />
						<div>
							<p> Aдминистратор</p>
						</div>
						<IconChevronDown style={{ cursor: 'pointer' }} stroke={2} />
					</div>
				</div>
			)}
			{/* //! ins */}
			{pathname.startsWith(`/instructor/course/${courseId}`) && (
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
						<div>
							<div className={scss.instructor_profile}>Учитель</div>
						</div>
						<IconChevronDown style={{ cursor: 'pointer' }} stroke={2} />
					</div>
				</div>
			)}
			{/* //! student header*/}
			{pathname.startsWith(`/courses/${courseId}`) && (
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
						<div>
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
