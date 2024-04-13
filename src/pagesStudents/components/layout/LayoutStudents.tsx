import { Route, Routes } from 'react-router-dom';
import scss from './LayoutStudents.module.scss';
import Header from '@/src/ui/header/Header';
// import NavBar from '@/src/ui/navBar/NavBar';
import HomePage from '../pages/HomePage';
import { useEffect, useState } from 'react';
import HeaderMobail from '@/src/ui/headerMobail/HeaderMobail';
import BasicBreadcrumbs from '@/src/ui/breadCrumbs/BreadCrumbs';
import MyCourses from '@/src/ui/myCourses/MyCourses';
import Announcement from '@/src/ui/announcement/Announcement';
import Groups from '@/src/ui/group/Groups';

const LayoutStudents = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(true);
	useEffect(() => {
		const changeIsMobile = () => {
			if (window.innerWidth < 1000) {
				setIsMobile(true);
			} else {
				setIsMobile(false);
			}
		};

		changeIsMobile();
		window.addEventListener('resize', changeIsMobile);

		return () => {
			window.removeEventListener('resize', changeIsMobile);
		};
	}, []);
	useEffect(() => {
		if (localStorage.getItem('isOpenNavBar') === 'false') {
			setIsOpen(false);
		} else {
			setIsOpen(true);
		}
	}, []);

	return (
		<>
			<div className={scss.Layout}>
				{!isMobile && (
					<>
						<Header isOpen={isOpen} setIsOpen={setIsOpen} />
					</>
				)}
				<main>
					<BasicBreadcrumbs />
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="courses/:coursesId" element={<MyCourses />} />
						<Route path="groups" element={<Groups />} />
						<Route path="announcement" element={<Announcement />} />
					</Routes>
				</main>
				{isMobile && <HeaderMobail />}
			</div>
		</>
	);
};

export default LayoutStudents;
