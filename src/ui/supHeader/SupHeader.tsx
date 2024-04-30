import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import scss from './SupHeader.module.scss';
import profileImage from '@/src/assets/profile.png';
import { IconBell } from '@tabler/icons-react';
import ArrowToDown from '@/src/assets/icons/icon-arrowToDown';

const SupHeader = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [value, setValue] = useState(0);
	const open = Boolean(anchorEl);
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleLogout = () => {
		navigate('/registration');
	};

	interface TabPanelProps {
		children?: React.ReactNode;
		value: number;
		index: number;
	}

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

	return (
		<div className={scss.sup_header_container}>
			{pathname !== '/admin/courses' && pathname !== '/instructor/courses' && (
				<div className={scss.sup_header_third_containers}>
					<div className={scss.notification}>
						<IconBell className={scss.img} stroke={2} />
					</div>
					<div className={scss.profile_photo}>
						<div className={scss.profile}>
							<img src={profileImage} alt="profile-Image" />
						</div>
						<div
							id="basic-button"
							aria-controls={open ? 'basic-menu' : undefined}
							aria-haspopup="true"
							aria-expanded={open ? 'true' : undefined}
							onClick={handleClick}
							className={scss.sup_teachers}
						>
							{pathname.startsWith('/admin') && <p> Администратор</p>}
							{pathname.startsWith('/instructor') && <p>Учитель</p>}

							<ArrowToDown />
						</div>
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
				</div>
			)}

			{pathname === '/admin/courses' && (
				<>
					<div className={scss.sup_high_second_container}>
						<div className={scss.sup_header_tab_panel}>
							<Box>
								<Box
									sx={{
										borderColor: 'divider',
										paddingTop: '60px'
									}}
								>
									<Tabs
										value={value}
										onChange={handleChange}
										aria-label="basic tabs example"
									>
										<Tab label="Учителя" {...a11yProps(0)} />
										<Tab label="Студенты" {...a11yProps(1)} />
									</Tabs>
								</Box>
							</Box>
						</div>

						{/* //!  */}
						<div className={scss.sup_header_third_container}>
							<div className={scss.notification}>
								<IconBell className={scss.img} stroke={2} />
							</div>
							<div className={scss.sup_header_fourth_container}>
								<img
									className={scss.sup_header_profile_images}
									src={profileImage}
									alt="profile-Image"
								/>
								<div
									id="basic-button"
									aria-controls={open ? 'basic-menu' : undefined}
									aria-haspopup="true"
									aria-expanded={open ? 'true' : undefined}
									onClick={handleClick}
									className={scss.sup_teacher}
								>
									{pathname.startsWith('/admin') && <p> Администратор</p>}
									{pathname.startsWith('/instructor') && <p>Учитель</p>}
									<ArrowToDown />
								</div>
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
						</div>
					</div>
				</>
			)}
			{pathname === '/instructor/courses' ? (
				<>
					<div className={scss.sup_high_second_container}>
						<div className={scss.sup_header_tab_panel}>
							<Box>
								<Box
									sx={{
										borderColor: 'divider',
										paddingTop: '60px'
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
						</div>

						{/* //!  */}
						<div className={scss.sup_header_third_container}>
							<div className={scss.notification}>
								<IconBell className={scss.img} stroke={2} />
							</div>
							<div className={scss.sup_header_fourth_container}>
								<img
									className={scss.sup_header_profile_images}
									src={profileImage}
									alt="profile-Image"
								/>
								<div
									id="basic-button"
									aria-controls={open ? 'basic-menu' : undefined}
									aria-haspopup="true"
									aria-expanded={open ? 'true' : undefined}
									onClick={handleClick}
									className={scss.sup_teacher}
								>
									{pathname.startsWith('/admin') && <p> Администратор</p>}
									{pathname.startsWith('/instructor') && <p>Учитель</p>}
									<ArrowToDown />
								</div>
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
						</div>
					</div>
				</>
			) : null}
		</div>
	);
};

export default SupHeader;

