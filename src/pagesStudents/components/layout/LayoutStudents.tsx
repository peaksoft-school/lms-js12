import { Route, Routes } from 'react-router-dom';
import scss from './LayoutStudents.module.scss';
import Header from '@/src/ui/header/Header';
import { useEffect, useState } from 'react';
import HeaderMobile from '@/src/ui/headerMobile/HeaderMobile.tsx';
import CalendarPage from '../pages/CalendarPage';
import SupHeader from '@/src/ui/supHeader/SupHeader';
import CoursesPage from '../pages/CoursesPage';
import LessonListPage from '../pages/LessonListPage';
import LessonsStudentPage from '../pages/LessonsStudentPage';

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
						<Route path="/courses" element={<CoursesPage />} />
						<Route path="/calendar" element={<CalendarPage />} />
						<Route
							path="/courses/:coursesId/materials"
							element={<LessonListPage />}
						/>
						<Route
							path="/courses/:coursesId/materials/:sectionStudentId"
							element={<LessonsStudentPage />}
						/>
						<Route
							path="/courses/:coursesId/materials/:sectionStudentId/video"
							element={<LessonsStudentPage />}
						/>
					</Routes>
				</main>
				{isMobile && <HeaderMobile />}
			</div>
		</>
	);
};

export default LayoutStudents;
