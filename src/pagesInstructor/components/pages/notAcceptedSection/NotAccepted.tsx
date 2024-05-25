import { useGetStudentTableQuery } from '@/src/redux/api/admin/student';
import scss from './NotAccepted.module.scss';
import { Link } from 'react-router-dom';

const NotAccepted = () => {
	const { data } = useGetStudentTableQuery();
	const id = localStorage.getItem('id');
	const lessonId = localStorage.getItem('lessonId');
	const task = localStorage.getItem('task');
	return (
		<div className={scss.main_part}>
			<div className={scss.not_accepted}>
				{data?.map((item) => (
					<Link
						onClick={() => localStorage.setItem('taskId', String(item._id))}
						to={`/instructor/course/${id}/materials/${lessonId}/lesson/${task}/answer/${item._id}`}
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

export default NotAccepted;
