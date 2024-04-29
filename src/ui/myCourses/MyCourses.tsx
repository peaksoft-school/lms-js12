import { Link, useLocation, useParams } from 'react-router-dom';
import BasicBreadcrumbs from '../breadCrumbs/BreadCrumbs';
import { useGetStudentTableQuery } from '@/src/redux/api/admin/student';

const MyCourses = () => {
	const { coursesId } = useParams();
	console.log(coursesId!);
	const { data } = useGetStudentTableQuery();
	const { pathname } = useLocation();

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
