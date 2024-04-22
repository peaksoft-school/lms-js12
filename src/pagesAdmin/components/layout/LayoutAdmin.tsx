import { Route, Routes } from 'react-router-dom';
import scss from './LayoutAdmin.module.scss';
import Header from '@/src/ui/header/Header';
import HomePage from '../pages/HomePage';
import { useEffect, useState } from 'react';
import HeaderMobile from '@/src/ui/headerMobile/HeaderMobile.tsx';
import MyCourses from '@/src/ui/myCourses/MyCourses';
import Cards from '@/src/ui/customCards/Cards';
import Material from '@/src/ui/material/Material';
import CalendarPage from '../pages/CalendarPage';
import Teacher from '@/src/pagesAdmin/components/pages/teachers/Teachers';
import NotCreated from '@/src/ui/notCreated/NotCreated';
import ModalAddTeacher from '@/src/ui/customModal/ModalAddTeacher';
import { useGetTeacherQuery } from '@/src/redux/api/admin/teacher';

const LayoutAdmin = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(true);
	const { data } = useGetTeacherQuery();

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
						<Route path="/" element={<HomePage />} />
						<Route path="/calendar" element={<CalendarPage />} />
						<Route
							path="/teacher"
							element={
								!data || data.length === 0 ? (
									<NotCreated
										text="Вы пока не добавили учителей!"
										button={<ModalAddTeacher />}
										name="Учителя"
									/>
								) : (
									<Teacher />
								)
							}
						/>
						<Route path="" element={<HomePage />} />
						<Route path="/courses" element={<Cards />} />
						<Route path="/courses/:coursesId" element={<MyCourses />} />
						<Route
							path="/courses/:coursesId/:matelials"
							element={<Material />}
						/>
					</Routes>
				</main>
				{isMobile && <HeaderMobile />}
			</div>
		</>
	);
};

export default LayoutAdmin;
