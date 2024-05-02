// import React, { useState } from 'react';
// import { useNavigate, useLocation, Link } from 'react-router-dom';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import scss from './SupHeader.module.scss';
// import profileImage from '@/src/assets/profile.png';
// import { IconBell, IconChevronDown } from '@tabler/icons-react';

// interface TabPanelProps {
// 	children?: React.ReactNode;
// 	value: number;
// 	index: number;
// }

// const SupHeader = () => {
// 	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
// 	const [value, setValue] = useState(0);
// 	const open = Boolean(anchorEl);
// 	const navigate = useNavigate();
// 	const { pathname } = useLocation();

// 	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
// 		setValue(newValue);
// 	};

// 	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
// 		setAnchorEl(event.currentTarget);
// 	};

// 	const handleLogout = () => {
// 		navigate('/registration');
// 	};

// 	const TabPanel = (props: TabPanelProps) => {
// 		const { children, value, index, ...other } = props;

// 		return (
// 			<div
// 				role="tabpanel"
// 				hidden={value !== index}
// 				id={`simple-tabpanel-${index}`}
// 				aria-labelledby={`simple-tab-${index}`}
// 				{...other}
// 			>
// 				{value === index && (
// 					<Box sx={{ p: 3 }}>
// 						<Typography>{children}</Typography>
// 					</Box>
// 				)}
// 			</div>
// 		);
// 	};

// 	const a11yProps = (index: number) => {
// 		return {
// 			id: `simple-tab-${index}`,
// 			'aria-controls': `simple-tabpanel-${index}`
// 		};
// 	};

// 	return (
// 		<div className={scss.sup_header_container}>
// 			{pathname !== '/admin/courses' && pathname !== '/instructor/' && (
// 				<div className={scss.sup_header_third_containers}>
// 					<div className={scss.notification}>
// 						<IconBell className={scss.img} stroke={2} />
// 					</div>
// 					<div className={scss.profile_photo}>
// 						<div className={scss.profile}>
// 							<img src={profileImage} alt="profile-Image" />
// 						</div>
// 						<div
// 							id="basic-button"
// 							aria-controls={open ? 'basic-menu' : undefined}
// 							aria-haspopup="true"
// 							aria-expanded={open ? 'true' : undefined}
// 							onClick={handleClick}
// 							className={scss.sup_teachers}
// 						>
// 							{pathname.startsWith('/admin') && <div> Администратор</div>}
// 							{pathname.startsWith('/instructor') && <div>Учитель</div>}

// 							<IconChevronDown stroke={2} />
// 						</div>
// 						<Menu
// 							id="basic-menu"
// 							anchorEl={anchorEl}
// 							open={open}
// 							onClose={() => setAnchorEl(null)}
// 							MenuListProps={{
// 								'aria-labelledby': 'basic-button'
// 							}}
// 						>
// 							<MenuItem onClick={handleLogout}>Выйти</MenuItem>
// 						</Menu>
// 					</div>
// 				</div>
// 			)}

// 			{pathname === '/admin/courses' && (
// 				<>
// 					<div className={scss.sup_high_second_container}>
// 						<div className={scss.sup_header_tab_panel}>
// 							<Box>
// 								<Box
// 									sx={{
// 										borderColor: 'divider',
// 										paddingTop: '60px'
// 									}}
// 								>
// 									<Tabs
// 										value={value}
// 										onChange={handleChange}
// 										aria-label="basic tabs example"
// 									>
// 										<Tab label="Учитель" {...a11yProps(0)} />
// 										<Tab label="Студенты" {...a11yProps(1)} />
// 									</Tabs>
// 								</Box>
// 							</Box>
// 						</div>

// 						{/* //!  */}
// 						<div className={scss.sup_header_third_container}>
// 							<div className={scss.notification}>
// 								<IconBell className={scss.img} stroke={2} />
// 							</div>
// 							<div className={scss.sup_header_fourth_container}>
// 								<img
// 									className={scss.sup_header_profile_images}
// 									src={profileImage}
// 									alt="profile-Image"
// 								/>
// 								<div
// 									id="basic-button"
// 									aria-controls={open ? 'basic-menu' : undefined}
// 									aria-haspopup="true"
// 									aria-expanded={open ? 'true' : undefined}
// 									onClick={handleClick}
// 									className={scss.sup_teacher}
// 								>
// 									{pathname.startsWith('/admin') && <div> Администратор</div>}
// 									{pathname.startsWith('/instructor') && <div>Учитель</div>}
// 									<IconChevronDown stroke={2} />
// 								</div>
// 								<Menu
// 									id="basic-menu"
// 									anchorEl={anchorEl}
// 									open={open}
// 									onClose={() => setAnchorEl(null)}
// 									MenuListProps={{
// 										'aria-labelledby': 'basic-button'
// 									}}
// 								>
// 									<MenuItem onClick={handleLogout}>Выйти</MenuItem>
// 								</Menu>
// 							</div>
// 						</div>
// 					</div>
// 				</>
// 			)}
// 			{pathname === '/instructor/course/:id' ? (
// 				<>
// 					<div className={scss.sup_high_second_container}>
// 						<div className={scss.sup_header_tab_panel}>
// 							<Box>
// 								<Box
// 									sx={{
// 										borderColor: 'divider',
// 										paddingTop: '60px'
// 									}}
// 								>
// 									<Tabs
// 										value={value}
// 										onChange={handleChange}
// 										aria-label="basic tabs example"
// 									>
// 										<Tab label="Материалы" {...a11yProps(0)} />
// 										<Link to={`student`}>
// 											<Tab label="Студенты" {...a11yProps(1)} />
// 										</Link>
// 										<Tab label="Рейтинг студентов" {...a11yProps(2)} />
// 									</Tabs>
// 								</Box>
// 							</Box>
// 						</div>

// 						{/* //!  */}
// 						<div className={scss.sup_header_third_container}>
// 							<div className={scss.notification}>
// 								<IconBell className={scss.img} stroke={2} />
// 							</div>
// 							<div className={scss.sup_header_fourth_container}>
// 								<img
// 									className={scss.sup_header_profile_images}
// 									src={profileImage}
// 									alt="profile-Image"
// 								/>
// 								<div
// 									id="basic-button"
// 									aria-controls={open ? 'basic-menu' : undefined}
// 									aria-haspopup="true"
// 									aria-expanded={open ? 'true' : undefined}
// 									onClick={handleClick}
// 									className={scss.sup_teacher}
// 								>
// 									{pathname.startsWith('/admin') && <div> Администратор</div>}
// 									{pathname.startsWith('/instructor') && <div>Учитель</div>}
// 									<IconChevronDown stroke={2} />
// 								</div>
// 								<Menu
// 									id="basic-menu"
// 									anchorEl={anchorEl}
// 									open={open}
// 									onClose={() => setAnchorEl(null)}
// 									MenuListProps={{
// 										'aria-labelledby': 'basic-button'
// 									}}
// 								>
// 									<MenuItem onClick={handleLogout}>Выйти</MenuItem>
// 								</Menu>
// 							</div>
// 						</div>
// 					</div>
// 				</>
// 			) : null}

// 			<TabPanel value={value} index={0}></TabPanel>
// 			<TabPanel value={value} index={1}></TabPanel>
// 			{pathname === '/instructor/' && (
// 				<TabPanel value={value} index={2}></TabPanel>
// 			)}
// 		</div>
// 	);
// };

// export default SupHeader;

// ! new
import { IconChevronDown, IconUserCircle } from '@tabler/icons-react';
import scss from './SupHeader.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, MenuItem } from '@mui/material';
import { useState } from 'react';

const SupHeader = () => {
	const { pathname } = useLocation();
	const open = Boolean();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const navigate = useNavigate();

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleLogout = () => {
		navigate('/registration');
	};

	return (
		<div className={scss.header}>
			{/* //! admin header */}
			{pathname !== '/admin/courses' && pathname !== '/instructor/' && (
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
								Aдминистратор
							</div>
						)}
						{pathname.startsWith('/instructor') && (
							<div style={{ fontSize: '18px', fontWeight: '500' }}>Учитель</div>
						)}
					</div>
					<IconChevronDown style={{ cursor: 'pointer' }} stroke={2} />
					<Menu
						id="basic-menu"
						anchorEl={anchorEl}
						open={open}
						onClose={() => setAnchorEl(null)}
						MenuListProps={{
							'aria-labelledby': 'basic-button'
						}}
					>
						<MenuItem onClick={handleLogout}>Выйти</MenuItem>
					</Menu>
				</div>
			)}
		</div>
	);
};

export default SupHeader;
