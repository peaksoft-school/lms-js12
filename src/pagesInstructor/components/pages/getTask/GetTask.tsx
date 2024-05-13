import { useGetTaskInstructorQuery } from '@/src/redux/api/instructor/addTask';
import scss from './GetTask.module.scss';
const GetTask = () => {
	const { data } = useGetTaskInstructorQuery();
	return (
		<div className={scss.Task}>
			{data?.map((item) => (
				<div>
					<h1>{item.title}</h1>
					<p>{item.description}</p>
					<img src={item.description} alt="" />
					<p>{item.dedline}</p>
				</div>
			))}
		</div>
	);
};

export default GetTask;
