import { useGetStudentTableQuery } from '@/src/redux/api/admin/student';
import scss from './Accepted.module.scss';
import { Link, useParams } from 'react-router-dom';

const Accepted = () => {
	const { data } = useGetStudentTableQuery();
	const { courseId, lessonId, getTaskId } = useParams();

	return (
		<div className={scss.main_part}>
			<div className={scss.acceped}>
				{data?.map((item) => (
					<Link
						to={`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/answer/${item._id}`}
					>
						<div className={scss.card_container}>
							<p className={scss.card_link}>
								{item.firstName}
								{item.lastName}
							</p>
							<div className={scss.button}></div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Accepted;
