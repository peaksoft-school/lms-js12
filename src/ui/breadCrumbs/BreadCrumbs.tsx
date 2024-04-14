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
			{pathname === '/' && (
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
			{pathname.startsWith('/instructor') && (
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
		</div>
	);
}
