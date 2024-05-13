import { Route, Routes } from 'react-router-dom';
import scss from './LayoutInstructor.module.scss';
import Header from '@/src/ui/header/Header';
import { useEffect, useState } from 'react';
import MyCourses from '@/src/ui/myCourses/MyCourses';
import CalendarPage from '../pages/CalendarPage';
import HeaderMobile from '@/src/ui/headerMobile/HeaderMobile.tsx';
import SupHeader from '@/src/ui/supHeader/SupHeader';
import MyCoursePage from '../pages/MyCoursePage';
import NotCreated from '@/src/ui/notCreated/NotCreated';
import CreateCourse from '@/src/ui/customModal/CreateCurse';
import { useGetCourseInstructorQuery } from '@/src/redux/api/instructor/course';
import AnnouncementPage from '@/src/pagesAdmin/components/pages/AnnouncementPage';
import TrashPage from '@/src/pagesAdmin/components/pages/TrashPage';
import InternalInstructorStudentsPage from '../pages/InternalInstructorStudentsPage';
import MaterialsPage from '../pages/MaterialsPage';
import LessonPage from '../pages/LessonPage';
import SupHeaderMobile from '@/src/ui/subHeaderMobile/SupHeaderMobile';
import { LessonMobilePage } from '../pages/LessonMobilePage';
const LayoutInstructor = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(true);
	const { data: courses = [] } = useGetCourseInstructorQuery();
	const [courseHandle, setCourseHandle] = useState(false);

	const handleOpenCourse = () => {
		setCourseHandle(true);
	};
	const handleCloseCourse = () => {
		setCourseHandle(false);
	};

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
						<Route
							path={'/course'}
							element={
								!courses || courses.length === 0 ? (
									<NotCreated
										text="Вы пока не создали курсы!"
										buttonClick={handleOpenCourse}
										name="Курсы"
										buttontText="Создать курс"
									/>
								) : (
									<MyCoursePage />
								)
							}
						/>
						<Route path="/calendar" element={<CalendarPage />} />

						<Route path="/courses/:coursesId" element={<MyCourses />} />
						<Route
							path="/course/:studentCourseId/student"
							element={<InternalInstructorStudentsPage />}
						/>
						<Route
							path="/course/:materialsId/materials"
							element={<MaterialsPage />}
						/>
						{!isMobile && (
							<>
								<Route
									path="/course/:materialsId/materials/:lessonId"
									element={<LessonPage />}
								/>
								<Route
									path="/course/:materialsId/materials/:lessonId/video"
									element={<LessonPage />}
								/>
							</>
						)}
						{isMobile && (
							<>
								<Route
									path="/course/:materialsId/materials/:lessonId"
									element={<LessonMobilePage />}
								/>
								<Route
									path="/course/:materialsId/materials/:lessonId/video"
									element={<LessonMobilePage />}
								/>
							</>
						)}
						<Route path="announcement" element={<AnnouncementPage />} />
						<Route path="trash" element={<TrashPage />} />
					</Routes>
				</main>
				{isMobile && <HeaderMobile />}

				<CreateCourse
					handleOpenCourse={handleOpenCourse}
					open={courseHandle}
					handleClose={handleCloseCourse}
				/>
			</div>
		</>
	);
};

export default LayoutInstructor;
