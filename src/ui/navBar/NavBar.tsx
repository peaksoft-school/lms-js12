import { useLocation } from 'react-router-dom';
import scss from './Navbar.module.scss';
import peaksoft from '@/src/assets/png/Header.png';
import Course from '@/src/assets/icons2/Course';
import Groups from '@/src/assets/icons2/Groups';
import Teacher from '@/src/assets/icons2/Teacher';
import Students from '@/src/assets/icons2/Students';
import { FC, useState } from 'react';

interface BackProps {
	toggleDrawer: (value: boolean) => void;
}

const NavBar: FC<BackProps> = ({ toggleDrawer }) => {
	const { pathname } = useLocation();
	const [isBurgetMenu, setIsBurgetMenu] = useState<boolean>(false);

	return (
		<div className={scss.NavBar}>
			<div className={scss.content}>
				<div className={scss.nav_card}>
					<div className={scss.navBar_img}>
						<img src={peaksoft} alt="" />
					</div>
					<div>
						{pathname === '/admin' ? (
							<ul className={scss.MainPart}>
								<li className={scss.part}>
									<Groups />
									<p>Группы</p>
								</li>
								<li className={scss.part}>
									<Course />
									<p>Курсы </p>
								</li>
								<li className={scss.part}>
									<Teacher />
									<p>Учителя</p>
								</li>
								<li className={scss.part}>
									<Students />
									<p>Студенты</p>
								</li>
							</ul>
						) : null}
						{pathname === '/' ? (
							<div className={scss.MainPart}>
								<div className={scss.part}>
									<Course />
									<p>Мои Курсы </p>
								</div>
							</div>
						) : null}
						{pathname === '/instructor' ? (
							<div className={scss.MainPart}>
								<div className={scss.part}>
									<Course />
									<p> Мои Курсы </p>
								</div>
							</div>
						) : null}
					</div>
				</div>
			</div>
			<div className={scss.Main_burger}>
				<div className={scss.burger__button}>
					<label>
						<input
							type="checkbox"
							checked={isBurgetMenu}
							onChange={() => {
								setIsBurgetMenu(!isBurgetMenu);
								toggleDrawer(!isBurgetMenu);
							}}
						/>
						<span></span>
						<span></span>
						<span></span>
					</label>
				</div>
				<div
					className={
						isBurgetMenu
							? `${scss.burger_menu} ${scss.active}`
							: `${scss.burger_menu} `
					}
				>
					<div className={scss.nav_Burger}>
						<div className={scss.navBar_img}>
							<img src={peaksoft} alt="#" />
						</div>
						<div>
							{pathname === '/admin' ? (
								<ul className={scss.MainPart}>
									<li className={scss.part}>
										<Groups />
										<p>Группы</p>
									</li>
									<li className={scss.part}>
										<Course />
										<p>Курсы </p>
									</li>
									<li className={scss.part}>
										<Teacher />
										<p>Учителя</p>
									</li>
									<li className={scss.part}>
										<Students />
										<p>Студенты</p>
									</li>
								</ul>
							) : null}
							{pathname === '/' ? (
								<div className={scss.MainPart}>
									<div className={scss.part}>
										<Course />
										<p>Мои Курсы </p>
									</div>
								</div>
							) : null}
							{pathname === '/instructor' ? (
								<div className={scss.MainPart}>
									<div className={scss.part}>
										<Course />
										<p> Мои Курсы </p>
									</div>
								</div>
							) : null}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
