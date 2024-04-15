import { Route, Routes } from 'react-router-dom';
import scss from './LayoutStudents.module.scss';
import Header from '@/src/ui/header/Header';
import HomePage from '../pages/HomePage';
import { useEffect, useState } from 'react';
<<<<<<< HEAD
import HeaderMobile from '@/src/ui/headerMobail/HeaderMobail';
import CalendarPage from '@/src/pagesAdmin/components/pages/CalendarPage';
=======
import HeaderMobail from '@/src/ui/headerMobail/HeaderMobail';
import Material from '@/src/ui/material/Material';
import MyCourses from '@/src/ui/myCourses/MyCourses';
import Cards from '@/src/ui/customCards/Cards';
>>>>>>> dev

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
				<main style={{ width: '100%' }}>
					<Routes>
<<<<<<< HEAD
						<Route path="/" element={<HomePage />} />
						<Route path="/calendar" element={<CalendarPage />} />
=======
						<Route path="" element={<HomePage />} />
						<Route path="/courses" element={<Cards />} />
						<Route path="/courses/:coursesId" element={<MyCourses />} />
						<Route
							path="/courses/:coursesId/:matelials"
							element={<Material />}
						/>
>>>>>>> dev
					</Routes>
				</main>
				{isMobile && <HeaderMobile />}
			</div>
		</>
	);
};

export default LayoutStudents;
