import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import scss from './SupHeader.module.scss';
import profileImage from '../../../../assets/profile.png';
import { IconBell } from '@tabler/icons-react';
import ArrowDown from '@/src/assets/icons/icon-Arrow-Down';

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
			
			{pathname !== '/admin/courses' || pathname === '/admin' ? (
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
							Администратор
							<ArrowDown />
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
			) : (
				<div className={scss.sup_high_second_container}>
					<div className={scss.sup_header_tab_panel}>
						<Box>
							<Box
								sx={{
									// borderBottom: 1,
									// borderColor: 'divider',
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
							{/* <TabPanel value={value} index={0}>
								Учителя
							</TabPanel>
							<TabPanel value={value} index={1}>
								Студенты
							</TabPanel> */}
						</Box>
					</div>

					{/* //!  */}
					<div className={scss.sup_header_third_container}>
						<div>
							<IconBell stroke={2} />
						</div>
						<div className={scss.sup_header_fourth_container}>
							<img
								className={scss.sup_header_profile_image}
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
								<p>Администратор</p>
								<ArrowDown />
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
			)}
		</div>
	);
};

export default SupHeader;
