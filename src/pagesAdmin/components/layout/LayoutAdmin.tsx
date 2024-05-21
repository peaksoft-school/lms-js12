import { Route, Routes } from 'react-router-dom';
import scss from './LayoutAdmin.module.scss';
import Header from '@/src/ui/header/Header';
import { useEffect, useState } from 'react';
import HeaderMobile from '@/src/ui/headerMobile/HeaderMobile.tsx';
// import MyCourses from '@/src/ui/myCourses/MyCourses';
import Material from '@/src/ui/material/Material';
import CalendarPage from '../pages/CalendarPage';
import NotCreated from '@/src/ui/notCreated/NotCreated';
import ModalAddTeacher from '@/src/ui/customModal/ModalAddTeacher';
import { useGetTeacherQuery } from '@/src/redux/api/admin/teacher';
import { useGetGroupQuery } from '@/src/redux/api/admin/groups';
import Groups from '@/src/pagesAdmin/components/pages/groupSections/Groups';
import CreateGroup from '@/src/ui/customModal/createGroup/CreateGroup.tsx';
import { useGetStudentTableQuery } from '@/src/redux/api/admin/student';
import ModalAddStudent from '@/src/ui/customModal/ModalAddStudent';
import AnalyticsPage from '@/src/pagesAdmin/components/pages/AnalyticsPage.tsx';
import TrashPage from '../pages/TrashPage';
import TeacherPage from '../pages/TeacherPage.tsx';
import { useGetCourseQuery } from '@/src/redux/api/admin/courses/index.ts';
import CoursesPage from '../pages/CoursesPage.tsx';
import StudentsPage from '../pages/StudentsPage.tsx';
import InternalStudentsPage from '../pages/InternalStudentsPage.tsx';
import SupHeader from '@/src/ui/supHeader/SupHeader.tsx';
import AnnouncementPage from '../pages/AnnouncementPage.tsx';
import CreateCourse from '@/src/ui/customModal/createCourse/CreateCurse.tsx';
import InternalCoursesPage from '../pages/InternalCoursesPage.tsx';
import CoursesTeacher from '../pages/coursesTeacher/CoursesTeacher.tsx';
import SupHeaderMobile from '@/src/ui/subHeaderMobile/SubHeaderMobile.tsx';

const LayoutAdmin = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(true);
	const { data } = useGetTeacherQuery();
	const { data: groups = [] } = useGetGroupQuery();
	const { data: student = [] } = useGetStudentTableQuery();
	const { data: courses = [] } = useGetCourseQuery();
	const [openGroups, setOpen] = useState(false);
	const [courseHandle, setCourseHandle] = useState(false);
	const [openTeacher, setOpenTeacher] = useState(false);
	const [openStudent, setOpenModalStudent] = useState(false);
	const handleOpenStudentModal = () => {
		setOpenModalStudent(true);
	};

	const handleOpenCourse = () => {
		setCourseHandle(true);
	};
	const handleCloseCourse = () => {
		setCourseHandle(false);
	};

	const handleCloseStudentModal = () => {
		setOpenModalStudent(false);
	};
	const handleOpenTeacherModal = () => {
		setOpenTeacher(true);
	};

	const handleCloseTeacherModal = () => {
		setOpenTeacher(false);
	};

	const handleOpen = () => setOpen(true);
	const handleCloseCourses = () => setOpen(false);

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
					{!isMobile && (
						<>
							<SupHeader />
						</>
					)}
					{isMobile && (
						<>
							<SupHeaderMobile />
						</>
					)}
					<Routes>
						<Route path="/analytics" element={<AnalyticsPage />} />
						<Route path="/calendar" element={<CalendarPage />} />
						<Route
							path="/teacher"
							element={
								!data || data.length === 0 ? (
									<NotCreated
										text="Вы пока не добавили учителей!"
										name="Учителя"
										buttonClick={handleOpenTeacherModal}
										buttontText="Добавить учителя"
									/>
								) : (
									<TeacherPage />
								)
							}
						/>

						<Route path="/trash" element={<TrashPage />} />
						{/* <Route path="/courses/:coursesId" element={<MyCourses />} /> */}

						<Route
							path="/courses/:coursesId/:matelials"
							element={<Material />}
						/>
						<Route
							path={'/students'}
							element={
								!student || student.length === 0 ? (
									<NotCreated
										text="Вы пока не добавили студентов!"
										buttonClick={handleOpenStudentModal}
										name="Студенты"
										buttontText="Добавить студента"
									/>
								) : (
									<StudentsPage />
								)
							}
						/>
						<Route
							path={'/courses'}
							element={
								!courses || courses.length === 0 ? (
									<NotCreated
										text="Вы пока не создали курсы!"
										buttonClick={handleOpenCourse}
										name="Курсы"
										buttontText="Создать курс"
									/>
								) : (
									<CoursesPage />
								)
							}
						/>
						<Route
							path="/courses/:coursesPart/student"
							element={<InternalCoursesPage />}
						/>
						<Route
							path="/courses/:coursesTeacher/teacher"
							element={<CoursesTeacher />}
						/>
						<Route
							path="/group"
							element={
								!groups || groups.length === 0 ? (
									<NotCreated
										text="Вы пока не добавили группу!"
										buttonClick={handleOpen}
										name="Группы"
										buttontText="Создать группу"
									/>
								) : (
									<Groups />
								)
							}
						/>
						<Route path="/group/:groupId" element={<InternalStudentsPage />} />
						<Route path="/announcement" element={<AnnouncementPage />} />
					</Routes>
				</main>
				{isMobile && <HeaderMobile />}

				<CreateCourse
					handleOpenCourse={handleOpenCourse}
					open={courseHandle}
					handleClose={handleCloseCourse}
				/>

				<CreateGroup
					handleOpen={handleOpen}
					open={openGroups}
					handleClose={handleCloseCourses}
				/>
				<ModalAddTeacher
					open={openTeacher}
					handleClose={handleCloseTeacherModal}
				/>
				<ModalAddStudent
					open={openStudent}
					handleClose={handleCloseStudentModal}
				/>
			</div>
		</>
	);
};

export default LayoutAdmin;
