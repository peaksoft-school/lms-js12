// ! new// ! new
import { IconChevronDown, IconUserCircle } from '@tabler/icons-react';
import scss from './SupHeader.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Menu, MenuItem, Tab, Tabs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

interface TabPanelProps {
	children?: React.ReactNode;
	value: number;
	index: number;
}
const SupHeader = () => {
	const { pathname } = useLocation();
	const open = Boolean();
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

	const TabPanel = (props: TabPanelProps) => {
		const { children, value, index, ...other } = props;
		return (
			<div
				role="tabpanel"
				hidden={value !== index}
				id={`simple-tabpanel-${index}`}
				aria-labelledby={`simple-tab-${index}`}
				{...other}
			>
				{value === index && (
					<Box sx={{ p: 3 }}>
						<Typography>{children}</Typography>
					</Box>
				)}
			</div>
		);
	};
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

	return (
		<div className={scss.header}>
			{/* //! admin header */}
			{pathname !== `/admin/courses/${id}/student` &&
				pathname !== `/admin/courses/${id}/teacher` &&
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
									<Tab label="Материалы" {...a11yProps(0)} />
									<Tab label="Студенты" {...a11yProps(1)} />
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
		</div>
	);
};
export default SupHeader;
