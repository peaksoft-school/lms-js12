import { useGetStudentTableQuery } from '@/src/redux/api/admin/student';
import scss from './Late.module.scss';
import { Link, useParams } from 'react-router-dom';

const Late = () => {
	const { data } = useGetStudentTableQuery();
	const { courseId, lessonId, getTaskId } = useParams();
	return (
		<div className={scss.main_part}>
			<div className={scss.late}>
				{data?.map((item) => (
					<Link
						to={`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/answer/${item._id}`}
					>
						<div className={scss.card_container}>
							<p className={scss.card_link}>
								{item.firstName}
								{item.lastName}
							</p>
							<div
								onClick={() => {
									localStorage.setItem('task', String(item._id));
								}}
								className={scss.button}
							></div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Late;
