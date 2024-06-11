import {
	IconAlignJustified,
	IconChartHistogram,
	IconChevronDown,
	IconUser,
	IconUserCheck,
	IconWallpaper
} from '@tabler/icons-react';
import profile from '@/src/assets/svgs/Profile.png';
import scss from './SubHeaderMobile.module.scss';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, Menu, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import bell from '@/src/assets/svgs/Header icons.png';
import NotificationHeader from '../customModal/notificationHeader/NotificationHeader';

const SupHeaderMobile = () => {
	const { pathname } = useLocation();
	const { courseId } = useParams();
	const navigate = useNavigate();
	const [anchorElOpen, setAnchorElOpen] = useState<null | HTMLElement>(null);
	const [value, setValue] = useState<number>(0);
	const [openNotification, setOpenNotification] = useState(false);
	const handleOpenNotification = () => {
		setOpenNotification(true);
	};

	const handleCloseNotification = () => {
		setOpenNotification(false);
	};
	console.log(value);

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

	const openStudent = () => {
		navigate(`/admin/courses/${courseId}/student`);
	};
	const openTeacher = () => {
		navigate(`/admin/courses/${courseId}/teacher`);
	};
	const openMaterial = () => {
		navigate(`/instructor/course/${courseId}/materials`);
	};
	const openInstructorStudent = () => {
		navigate(`/instructor/course/${courseId}/student`);
	};
	const openRatingStudent = () => {
		navigate(`/courses/${courseId}/rating`);
	};
	const openMaterialStudent = () => {
		navigate(`/courses/${courseId}/materials`);
	};

	const openel = Boolean(anchorElOpen);
	const handleClickOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorElOpen(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorElOpen(null);
	};

	return (
		<div className={scss.header}>
			{/* //! admin header для /admin/courses */}
			{pathname.startsWith(`/admin/courses/${courseId}`) && (
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
							style={{ display: 'flex', gap: '12px' }}
							onClick={() => {
								openTeacher();
								handleClose();
							}}
						>
							<IconUserCheck stroke={2} />
							<span> Учителя</span>
						</MenuItem>
						<MenuItem
							style={{ display: 'flex', gap: '12px' }}
							onClick={() => {
								openStudent();
								handleClose();
							}}
						>
							<IconUser stroke={2} />
							<span> Студенты</span>
						</MenuItem>
					</Menu>

					<div className={scss.header_elements}>
						<img src={profile} alt="Profile" />
						<div>
							<p> Aдминистратор</p>
						</div>
						<IconChevronDown style={{ cursor: 'pointer' }} stroke={2} />
					</div>
				</div>
			)}
			{/* //! ins */}
			{/* {pathname.startsWith(`/courses/${courseId}`) && (
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
						<div>
							<p>Учитель</p>
						</div>
						<IconChevronDown style={{ cursor: 'pointer' }} stroke={2} />
					</div>
				</div>
			)} */}
			{/* //! ins */}
			{pathname.startsWith(`/instructor/course/${courseId}`) && (
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
							style={{ display: 'flex', gap: '10px' }}
							onClick={() => {
								openMaterial();
								handleClose();
							}}
						>
							<IconWallpaper stroke={2} />
							<span> Материалы</span>
						</MenuItem>
						<MenuItem
							style={{ display: 'flex', gap: '10px' }}
							onClick={() => {
								openInstructorStudent();
								handleClose();
							}}
						>
							<IconUser stroke={2} />
							<span>Студенты</span>
						</MenuItem>
						<MenuItem
							style={{ display: 'flex', gap: '10px' }}
							onClick={() => {
								handleClose();
							}}
						>
							<IconChartHistogram stroke={2} />
							<span> Рейтинг студентов</span>
						</MenuItem>
					</Menu>

					<div className={scss.header_elements}>
						<img onClick={handleOpenNotification} src={bell} alt="bell" />
						<img src={profile} alt="Profile" />
						<div>
							<p>Учитель</p>
						</div>
						<IconChevronDown style={{ cursor: 'pointer' }} stroke={2} />
					</div>
				</div>
			)}
			{pathname.startsWith(`/courses/${courseId}`) && (
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
								openMaterialStudent();
							}}
						>
							Материалы
						</MenuItem>

						<MenuItem
							onClick={() => {
								openRatingStudent();
							}}
						>
							Рейтинг студентов
						</MenuItem>
					</Menu>

					<div className={scss.header_elements}>
						<img onClick={handleOpenNotification} src={bell} alt="bell" />
						<img src={profile} alt="Profile" />
						<div>
							<p>Студент</p>
						</div>
						<IconChevronDown style={{ cursor: 'pointer' }} stroke={2} />
					</div>
					<NotificationHeader
						open={openNotification}
						handleClose={handleCloseNotification}
					/>
				</div>
			)}
		</div>
	);
};
export default SupHeaderMobile;
