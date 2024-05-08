import { Route, Routes } from 'react-router-dom';
import scss from './LayoutStudents.module.scss';
import Header from '@/src/ui/header/Header';
import { useEffect, useState } from 'react';
// import Material from '@/src/ui/material/Material';
import HeaderMobile from '@/src/ui/headerMobile/HeaderMobile.tsx';
import CalendarPage from '../pages/CalendarPage';
import SupHeader from '@/src/ui/supHeader/SupHeader';
import MaterialsPage from '../pages/MaterialsPage';
import CoursesPage from '../pages/CoursesPage';

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
					<SupHeader />
					<Routes>
						<Route path="/" element={<CoursesPage />} />
						<Route path="/calendar" element={<CalendarPage />} />
						<Route path="/:coursesId/materials" element={<MaterialsPage />} />
						{/* <Route path="/courses/:coursesId" element={<Material />} /> */}
					</Routes>
				</main>
				{isMobile && <HeaderMobile />}
			</div>
		</>
	);
};

export default LayoutStudents;
