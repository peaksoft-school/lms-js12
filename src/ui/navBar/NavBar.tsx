import { useLocation } from 'react-router-dom';
import scss from './Navbar.module.scss';
import peaksoft from '@/src/assets/png/Header.png';
import { useState } from 'react';
import {
	IconCourse,
	IconGroups,
	IconStudents,
	IconTeacher
} from '@/src/assets/icons';
import calendar from '@/src/assets/png/calendar-symbol.svg';

const NavBar = () => {
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
									<IconGroups />
									<p>Группы</p>
								</li>
								<li className={scss.part}>
									<IconCourse />
									<p>Курсы </p>
								</li>
								<li className={scss.part}>
									<IconTeacher />
									<p>Учителя</p>
								</li>
								<li className={scss.part}>
									<IconStudents />
									<p>Студенты</p>
								</li>
								<li className={scss.part}>
									<img className={scss.calendar} src={calendar} alt="" />
									<p>Расписание </p>
								</li>
							</ul>
						) : null}
						{pathname === '/' ? (
							<ul className={scss.MainPart}>
								<li className={scss.part}>
									<IconCourse />
									<p>Мои Курсы </p>
								</li>
								<li className={scss.part}>
									<img className={scss.calendar} src={calendar} alt="" />
									<p>Расписание </p>
								</li>
							</ul>
						) : null}
						{pathname === '/instructor' ? (
							<ul className={scss.MainPart}>
								<li className={scss.part}>
									<IconCourse />
									<p> Мои Курсы </p>
								</li>
								<li className={scss.part}>
									<img className={scss.calendar} src={calendar} alt="" />
									<p>Расписание </p>
								</li>
							</ul>
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
										<IconGroups />
										<p>Группы</p>
									</li>
									<li className={scss.part}>
										<IconCourse />
										<p>Курсы </p>
									</li>
									<li className={scss.part}>
										<IconTeacher />
										<p>Учителя</p>
									</li>
									<li className={scss.part}>
										<IconStudents />
										<p>Студенты</p>
									</li>
									<li className={scss.part}>
										<img className={scss.calendar} src={calendar} alt="" />
										<p>Расписание </p>
									</li>
								</ul>
							) : null}
							{pathname === '/' ? (
								<div className={scss.MainPart}>
									<div className={scss.part}>
										<IconCourse />
										<p>Мои Курсы </p>
									</div>
									<li className={scss.part}>
										<img className={scss.calendar} src={calendar} alt="" />
										<p>Расписание </p>
									</li>
								</div>
							) : null}
							{pathname === '/instructor' ? (
								<ul className={scss.MainPart}>
									<li className={scss.part}>
										<IconCourse />
										<p> Мои Курсы </p>
									</li>
									<li className={scss.part}>
										<img className={scss.calendar} src={calendar} alt="" />
										<p>Расписание </p>
									</li>
								</ul>
							) : null}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
