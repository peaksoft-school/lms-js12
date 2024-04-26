import { Route, Routes } from 'react-router-dom';
import scss from './LayoutAdmin.module.scss';
import Header from '@/src/ui/header/Header';
import HomePage from '../pages/HomePage';
import { useEffect, useState } from 'react';
import HeaderMobile from '@/src/ui/headerMobile/HeaderMobile.tsx';
import MyCourses from '@/src/ui/myCourses/MyCourses';
import Material from '@/src/ui/material/Material';
import CalendarPage from '../pages/CalendarPage';
import Teacher from '@/src/pagesAdmin/components/pages/teachers/Teachers';
import NotCreated from '@/src/ui/notCreated/NotCreated';
import ModalAddTeacher from '@/src/ui/customModal/ModalAddTeacher';
import { useGetTeacherQuery } from '@/src/redux/api/admin/teacher';
import Trash from '@/src/ui/trash/Trash';
import Students from '../pages/studentSection/Students';
import { useGetGroupQuery } from '@/src/redux/api/admin/groups';
import Groups from '../pages/group/Groups';
import CreateGroup from '@/src/ui/customModal/CreateGroup';
import { useGetStudentTableQuery } from '@/src/redux/api/admin/student';
import ModalAddStudent from '@/src/ui/customModal/ModalAddStudent';
import Courses from '../pages/course/Courses';

const LayoutAdmin = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(true);
	const { data } = useGetTeacherQuery();

	const { data: groups = [] } = useGetGroupQuery();
	const { data: student = [] } = useGetStudentTableQuery();

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
						<Route path="/courses" element={<Courses />} />
						<Route path="/trash" element={<Trash />} />
						<Route path="/courses/:coursesId" element={<MyCourses />} />
						<Route
							path="/courses/:coursesId/:matelials"
							element={<Material />}
						/>
						<Route
							path={'/students'}
							element={
								!student || student.length === 0 ? (
									<NotCreated
										text="Вы пока не добавили группу!"
										button={<ModalAddStudent />}
										name="Учителя"
									/>
								) : (
									<Students />
								)
							}
						/>
						<Route
							path="/group"
							element={
								!groups || groups.length === 0 ? (
									<NotCreated
										text="Вы пока не добавили группу!"
										button={<CreateGroup />}
										name="Учителя"
									/>
								) : (
									<Groups />
								)
							}
						/>
					</Routes>
				</main>
				{isMobile && <HeaderMobile />}
			</div>
		</>
	);
};

export default LayoutAdmin;
