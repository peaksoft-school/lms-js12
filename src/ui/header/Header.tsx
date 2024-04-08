import { IconDropdrown } from '@/src/assets/icons';
import user from '@/src/assets/png/Profile.png';
import scss from './Header.module.scss';
import { useLocation } from 'react-router-dom';
import bill from '@/src/assets/png/Header icons.png';
import React from 'react';
import { Fade, Menu, MenuItem } from '@mui/material';
import Logout from '@/src/assets/png/logout.svg';

const Header = () => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const { pathname } = useLocation();

	return (
		<header className={scss.Header}>
			<div className={scss.container}>
				<div className={scss.content}>
					<img src={bill} alt="" />
					<div className={scss.headerCard}>
						<img
							id="fade-button"
							aria-controls={open ? 'fade-menu' : undefined}
							aria-haspopup="true"
							aria-expanded={open ? 'true' : undefined}
							src={user}
							onClick={handleClick}
							alt="#"
						/>
						<div>
							{pathname === '/' ? (
								<>
									<p
										id="fade-button"
										aria-controls={open ? 'fade-menu' : undefined}
										aria-haspopup="true"
										aria-expanded={open ? 'true' : undefined}
										onClick={handleClick}
									>
										Студент
									</p>
								</>
							) : null}
						</div>
						<div>{pathname === '/admin' ? <p>Администратор</p> : null}</div>
						<div>{pathname === '/instructor' ? <p>Инструктор</p> : null}</div>
						<div
							className={scss.icon}
							id="fade-button"
							aria-controls={open ? 'fade-menu' : undefined}
							aria-haspopup="true"
							aria-expanded={open ? 'true' : undefined}
							onClick={handleClick}
						>
							<IconDropdrown />
						</div>
						<Menu
							id="fade-menu"
							MenuListProps={{
								'aria-labelledby': 'fade-button'
							}}
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							TransitionComponent={Fade}
						>
							<MenuItem
								style={{ width: 'px', display: 'flex', gap: '20px' }}
								onClick={handleClose}
							>
								Выйти
								<img style={{ width: '30px' }} src={Logout} alt="" />
							</MenuItem>
						</Menu>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
