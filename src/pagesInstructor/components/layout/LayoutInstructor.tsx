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
import CreateCourse from '@/src/ui/customModal/createCourse/CreateCurse';
import { useGetCourseInstructorQuery } from '@/src/redux/api/instructor/course';
import AnnouncementPage from '@/src/pagesAdmin/components/pages/AnnouncementPage';
import TrashPage from '@/src/pagesAdmin/components/pages/TrashPage';
import InternalInstructorStudentsPage from '../pages/InternalInstructorStudentsPage';
import MaterialsPage from '../pages/MaterialsPage';
import LessonPage from '../pages/LessonPage';
import SupHeaderMobile from '@/src/ui/subHeaderMobile/SubHeaderMobile';
import AddTaskPage from '../pages/AddTaskPage';
import EditTask from '../pages/editTaskSection/EditTask';
import GetTask from '../pages/getTaskSection/GetTask';
import Answer from '../pages/answerSection/Answer';
import GetTestInstructor from '../pages/getTestSection/GetTestInstructor';

import RatingStudentsPage from '../pages/RatingStudentsPage';
// import { Breadcrumbs } from '@mui/material';
import BasicBreadcrumbs from '@/src/ui/breadCrumbs/BreadCrumbs';
import SupHeaderCourses from '@/src/ui/supheaderCourses/SupHeaderCourses';
import CrateTask from '../pages/createTaskSection/CrateTask';
import CreateTest from '../pages/createTestSection/CreateTest';

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
							<Routes>
								<Route path="/course/:courseId/*" element={<SupHeader />} />
								<Route path="/*" element={<SupHeaderCourses />} />
							</Routes>
						</>
					)}
					{isMobile && (
						<>
							<Routes>
								<Route
									path="/courses/:courseId/*"
									element={<SupHeaderMobile />}
								/>
								<Route path="/*" element={<SupHeaderCourses />} />
							</Routes>
						</>
					)}
					<p style={{ paddingInline: '20px', paddingTop: '24px' }}>
						<BasicBreadcrumbs />
					</p>
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
							path="/course/:courseId/student"
							element={<InternalInstructorStudentsPage />}
						/>
						<Route
							path="/course/:courseId/materials"
							element={<MaterialsPage />}
						/>

						<Route
							path="/course/:courseId/materials/:lessonId"
							element={<LessonPage />}
						/>
						<Route
							path="/course/:courseId/materials/:lessonId/video"
							element={<LessonPage />}
						/>
						<Route
							path="/course/:courseId/materials/:lessonId/lesson/:getTaskId/panding"
							element={<LessonPage />}
						/>

						<Route
							path="/course/:courseId/materials/:lessonId/lesson/:getTaskId/accepted"
							element={<LessonPage />}
						/>
						<Route
							path="/course/:courseId/materials/:lessonId/lesson/:getTaskId/notAccepted"
							element={<LessonPage />}
						/>
						<Route
							path="/course/:courseId/materials/:lessonId/lesson/:getTaskId/late"
							element={<LessonPage />}
						/>
						<Route
							path="/course/:courseId/materials/:lessonId/lesson/:getTaskId/notSubmitted"
							element={<GetTask />}
						/>
						<Route
							path="/course/:courseId/materials/:lessonId/lesson/:getTaskId/answer/:answerId"
							element={<Answer />}
						/>

						<Route
							path="/course/:courseId/materials/:lessonId/lesson"
							element={<LessonPage />}
						/>
						<Route
							path="/course/:courseId/materials/:lessonId/lesson/addTask"
							element={<AddTaskPage />}
						/>

						<Route
							path="/course/:courseId/materials/:lessonId/lesson/update"
							element={<EditTask />}
						/>
						<>
							<Route
								path="/course/:courseId/materials/:lessonId"
								element={<LessonPage />}
							/>
							<Route
								path="/course/:courseId/materials/:lessonId/video"
								element={<LessonPage />}
							/>
							<Route
								path="/course/:courseId/materials/:lessonId/presentation"
								element={<LessonPage />}
							/>
							<Route
								path="/course/:courseId/materials/:lessonId/lesson/:getTaskId/panding"
								element={<LessonPage />}
							/>

							<Route
								path="/course/:courseId/materials/:lessonId/lesson/:getTaskId/accepted"
								element={<LessonPage />}
							/>
							<Route
								path="/course/:courseId/materials/:lessonId/lesson/:getTaskId/notAccepted"
								element={<LessonPage />}
							/>
							<Route
								path="/course/:courseId/materials/:lessonId/lesson/:getTaskId/late"
								element={<LessonPage />}
							/>
							<Route
								path="/course/:courseId/materials/:lessonId/lesson/:getTaskId/notSubmitted"
								element={<LessonPage />}
							/>
							<Route
								path="/course/:courseId/materials/:lessonId/lesson/:getTaskId/answer/:answerId"
								element={<Answer />}
							/>

							<Route
								path="/course/:courseId/materials/:lessonId/lesson"
								element={<LessonPage />}
							/>
							<Route
								path="/course/:courseId/materials/:lessonId/lesson/addTask"
								element={<AddTaskPage />}
							/>

							<Route
								path="/course/:courseId/materials/:lessonId/lesson/update"
								element={<EditTask />}
							/>
						</>
						<Route
							path="/course/:ratingId/rating"
							element={<RatingStudentsPage />}
						/>
						<Route path="announcement" element={<AnnouncementPage />} />
						<Route path="trash" element={<TrashPage />} />
						<Route
							path="/course/:courseId/materials/:lessonId/test"
							element={<LessonPage />}
						/>
						<Route
							path="/course/:courseId/materials/:lessonId/showTest"
							element={<GetTestInstructor />}
						/>
						<Route
							path="/course/:courseId/materials/:lessonId/createTask"
							element={<CreateTest />}
						/>
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
