import { useGetLessonQuery } from '@/src/redux/api/lesson';
// import { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import BasicBreadcrumbs from '../breadCrumbs/BreadCrumbs';

// interface LessonType {
// 	_id: number;
// 	title: string;
// 	date: string;
// 	text: string;
// 	img: string;
// }

const MyCourses = () => {
	const { coursesId } = useParams();
	console.log(coursesId!);
	const { data } = useGetLessonQuery();
	const { pathname } = useLocation();

	// const [course, setCourse] = useState<LessonType>();

	// useEffect(() => {
	// 	const filterData = data?.find((item) => item._id === +coursesId!);
	// 	setCourse(filterData!);
	// }, [data]);

	return (
		<div>
			<BasicBreadcrumbs />
			{data?.map((item) => {
				let linkTo = '';
				if (pathname.startsWith('/admin')) {
					linkTo = `/admin/courses/${coursesId}/${item._id}`;
				} else if (pathname.startsWith('/instructor')) {
					linkTo = `/instructor/courses/${coursesId}/${item._id}`;
				} else {
					linkTo = `/courses/${coursesId}/${item._id}`;
				}
				return (
					<Link key={item._id} to={linkTo}>
						<div>
							<h1>{item.title}</h1>
						</div>
					</Link>
				);
			})}
		</div>
	);
};

export default MyCourses;
