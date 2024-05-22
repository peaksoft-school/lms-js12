import { useGetTaskInstructorQuery } from '@/src/redux/api/instructor/addTask';
import scss from './GetOneTask.module.scss';

const GetOneTask = () => {
	const { data } = useGetTaskInstructorQuery();

	return (
		<div className={scss.get_task}>
			<div className={scss.Task}>
				{data?.map((item) => (
					<div className={scss.card}>
						<div className={scss.text}>
							<h2>{item.title}</h2>
							<h2>{item.dedline}</h2>
						</div>

						<div dangerouslySetInnerHTML={{ __html: item.description }} />
					</div>
				))}
			</div>
		</div>
	);
};

export default GetOneTask;
