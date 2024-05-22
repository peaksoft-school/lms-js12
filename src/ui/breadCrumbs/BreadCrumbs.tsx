import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useGetCardQuery, useGetLessonQuery } from '@/src/redux/api/lesson';
import { useEffect, useState } from 'react';
import { IconChevronRight } from '@tabler/icons-react';

interface LessonType {
	_id: number;
	title: string;
}
export default function BasicBreadcrumbs() {
	const { pathname } = useLocation();
	const { coursesId, matelials } = useParams();
	const { data } = useGetCardQuery(coursesId);
	const { data: lessonOne = [] } = useGetLessonQuery();
	const [course, setCourse] = useState<LessonType>();
	const [lesson, setLesson] = useState<LessonType>();

	useEffect(() => {
		const filterData = data?.find((item) => item._id === +coursesId!);
		setCourse(filterData!);
	}, [data]);
	useEffect(() => {
		const filterData = lessonOne?.find((item) => item._id === +matelials!);
		setLesson(filterData!);
	}, [lessonOne]);

	const item = localStorage.getItem('item');
	const id = localStorage.getItem('id');
	const taskName = localStorage.getItem('taskName');
	const lessonId = localStorage.getItem('lessonId');
	const task = localStorage.getItem('task');
	const hwTask = localStorage.getItem('hwTask');
	return (
		<div role="presentation">
			{pathname.startsWith('/admin') && (
				<>
					<Breadcrumbs
						aria-label="breadcrumb"
						separator={<IconChevronRight stroke={2} />}
					>
						<Link to="">Курсы</Link>
						<Link to={`/courses/:${coursesId}`}>{course?.title}</Link>
						<Link to={`/courses/:${coursesId}`}>{lesson?.title}</Link>
						<Typography color="text.primary">Breadcrumbs</Typography>
					</Breadcrumbs>
				</>
			)}

			{/* //! instructor breadCrumbs*/}
			{pathname.startsWith(`/instructor/course/${id}/materials`) && (
				<>
					<Breadcrumbs
						aria-label="breadcrumb"
						separator={<IconChevronRight stroke={2} />}
					>
						<Link style={{ fontSize: '14px' }} to="/instructor/course">
							Мои курсы
						</Link>
						<Link
							style={{ fontSize: '14px' }}
							to={`/instructor/course/${id}/materials`}
						>
							{item}
						</Link>
						<Link
							style={
								pathname === `/instructor/course/${id}/materials`
									? { fontSize: '14px', color: 'black' }
									: { fontSize: '14px' }
							}
							to={`/instructor/course/${id}/materials`}
						>
							Материалы
						</Link>
						{pathname ===
							`/instructor/course/${id}/materials/${lessonId}/video` && (
							<Breadcrumbs
								aria-label="breadcrumb"
								separator={<IconChevronRight stroke={2} />}
							>
								<Link style={{ fontSize: '14px' }} to={'#'}>
									{taskName}
								</Link>
								<Link style={{ fontSize: '14px', color: 'black' }} to={'#'}>
									Видеоурок
								</Link>
							</Breadcrumbs>
						)}
						{pathname ===
							`/instructor/course/${id}/materials/${lessonId}/presentation` && (
							<Breadcrumbs
								aria-label="breadcrumb"
								separator={<IconChevronRight stroke={2} />}
							>
								<Link style={{ fontSize: '14px' }} to={'#'}>
									{taskName}
								</Link>
								<Link style={{ fontSize: '14px', color: 'black' }} to={'#'}>
									Презентация
								</Link>
							</Breadcrumbs>
						)}
						{pathname ===
							`/instructor/course/${id}/materials/${lessonId}/lesson` && (
							<Breadcrumbs
								aria-label="breadcrumb"
								separator={<IconChevronRight stroke={2} />}
							>
								<Link style={{ fontSize: '14px' }} to={'#'}>
									{taskName}
								</Link>
								<Link style={{ fontSize: '14px', color: 'black' }} to={'#'}>
									Задание
								</Link>
							</Breadcrumbs>
						)}
						{pathname ===
							`/instructor/course/${id}/materials/${lessonId}/lesson/${task}/panding` && (
							<Breadcrumbs
								aria-label="breadcrumb"
								separator={<IconChevronRight stroke={2} />}
							>
								<Link style={{ fontSize: '14px' }} to={'#'}>
									{taskName}
								</Link>
								<Link style={{ fontSize: '14px' }} to={'#'}>
									Задание
								</Link>
								<Link style={{ fontSize: '14px', color: 'black' }} to={'#'}>
									{hwTask}
								</Link>
							</Breadcrumbs>
						)}
					</Breadcrumbs>
				</>
			)}
			{pathname === `/instructor/course/${id}/rating` && (
				<>
					<Breadcrumbs
						aria-label="breadcrumb"
						separator={<IconChevronRight stroke={2} />}
					>
						<Link style={{ fontSize: '14px' }} to="/instructor/course">
							Мои курсы
						</Link>
						<Link
							style={{ fontSize: '14px' }}
							to={`/instructor/course/${id}/materials`}
						>
							Курсы
						</Link>
						<Link
							style={{ fontSize: '14px', color: 'black' }}
							to={`/instructor/course/${id}/materials`}
						>
							Рейтинг
						</Link>
					</Breadcrumbs>
				</>
			)}

			{/* //! student breadCrumbs*/}
			{pathname === `/courses/${localStorage.getItem('id')}/materials` && (
				<>
					<Breadcrumbs
						aria-label="breadcrumb"
						separator={<IconChevronRight stroke={2} />}
					>
						<Link style={{ fontSize: '14px' }} to="/courses">
							Мои курсы
						</Link>
						<Link
							style={{ fontSize: '14px', color: 'black' }}
							to={`/courses/${id}/materials`}
						>
							{item}
						</Link>
						{/* <Link to={`/courses/:${coursesId}`}>{lesson?.title}</Link> */}
					</Breadcrumbs>
				</>
			)}
			{pathname === `/courses/${id}/rating` && (
				<>
					<Breadcrumbs
						aria-label="breadcrumb"
						separator={<IconChevronRight stroke={2} />}
					>
						<Link style={{ fontSize: '14px' }} to="/courses">
							Мои курсы
						</Link>
						<Link style={{ fontSize: '14px' }} to={`/courses/${id}/materials`}>
							Курсы
						</Link>
						<Link
							style={{ fontSize: '14px', color: 'black' }}
							to={`/courses/${id}/materials`}
						>
							Рейтинг
						</Link>
					</Breadcrumbs>
				</>
			)}
			{pathname.startsWith(
				`/courses/${localStorage.getItem('id')}/materials/${localStorage.getItem('lessonId')}`
			) && (
				<>
					<Breadcrumbs
						aria-label="breadcrumb"
						separator={<IconChevronRight stroke={2} />}
					>
						<Link style={{ fontSize: '14px' }} to="/courses">
							Мои курсы
						</Link>
						<Link style={{ fontSize: '14px' }} to={`/courses/${id}/materials`}>
							{item}
						</Link>
						<Link style={{ fontSize: '14px' }} to={`/courses/${id}/materials`}>
							{taskName}
						</Link>
						{pathname ===
							`/courses/${localStorage.getItem('id')}/materials/${localStorage.getItem('lessonId')}/presentation` && (
							<Link style={{ fontSize: '14px', color: 'black' }} to={`#`}>
								Презентация
							</Link>
						)}
						{pathname ===
							`/courses/${localStorage.getItem('id')}/materials/${localStorage.getItem('lessonId')}/video` && (
							<Link style={{ fontSize: '14px', color: 'black' }} to={`#`}>
								Видеоурок
							</Link>
						)}
					</Breadcrumbs>
				</>
			)}
		</div>
	);
}
