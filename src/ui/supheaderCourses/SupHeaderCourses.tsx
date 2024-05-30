import { useLocation, useNavigate } from 'react-router-dom';
import profile from '@/src/assets/svgs/Profile.png';
import scss from './SupHeaderCourses.module.scss';
import { IconChevronDown } from '@tabler/icons-react';
import { Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import vector from '@/src/assets/svgs/Vector.svg';

const SupHeaderCourses = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleNavigate = () => {
		navigate(`/auth/login`);
		setAnchorEl(null);
	};

	return (
		<div className={scss.all_header}>
			{pathname.startsWith('/admin') && (
				<>
					<div className={scss.courses_admin} onClick={handleClick}>
						<img src={profile} alt="Profile" />
						<p>Администратор</p>
						<IconChevronDown stroke={2} />
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
				</>
			)}
			{pathname.startsWith('/instructor') && (
				<>
					<div className={scss.courses_admin} onClick={handleClick}>
						<img src={profile} alt="Profile" />
						<p>Учитель</p>
						<IconChevronDown stroke={2} />
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
							onClick={handleClose}
							style={{
								display: 'flex',
								gap: '10px',
								color: '#1976d2',
								fontSize: '18px',
								fontWeight: '600',
								alignItems: 'center'
							}}
						>
							<img src={verctor} alt="" />
							<p> Выйти</p>
						</MenuItem>
					</Menu>
				</>
			)}
			{pathname.startsWith('/courses') && (
				<>
					<div className={scss.courses_admin} onClick={handleClick}>
						<img src={profile} alt="Profile" />
						<p>Студент</p>
						<IconChevronDown stroke={2} />
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
							onClick={handleClose}
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
				</>
			)}
			{pathname.startsWith('/calendar') && (
				<>
					<div className={scss.courses_admin} onClick={handleClick}>
						<img src={profile} alt="Profile" />
						<p>Студент</p>
						<IconChevronDown stroke={2} />
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
							onClick={handleClose}
							style={{
								display: 'flex',
								gap: '10px',
								color: '#1976d2',
								fontSize: '18px',
								fontWeight: '600',
								alignItems: 'center'
							}}
						>
							<img src={verctor} alt="" />
							<p> Выйти</p>
						</MenuItem>
					</Menu>
				</>
			)}
		</div>
	);
};

export default SupHeaderCourses;
