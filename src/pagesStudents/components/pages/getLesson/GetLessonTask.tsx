import { useNavigate, useParams } from 'react-router-dom';
import scss from './GetLessonLask.module.scss';
import { useGetTaskInstructorQuery } from '@/src/redux/api/instructor/addTask';

import DeleteTask from '@/src/ui/customModal/deleteModal/DeleteTask';
import { useState } from 'react';

const GetLessonTask = () => {
	const [openDelete, setOpenDelete] = useState(false);
	const [saveId, setSaveId] = useState<number | null>(null);
	const navigate = useNavigate();
	const { data: lesson = [] } = useGetTaskInstructorQuery();
	// const { lessonStudent } = useParams();
	const id = localStorage.getItem('id');

	console.log(saveId);

	const lessonId = localStorage.getItem('lessonId');
	const task = localStorage.getItem('task');

	const lastId = localStorage.getItem('lastId');
	const GetLessonTaskFunc = () => {
		navigate(
			`/courses/${id}/materials/${lessonId}/lesson/${task}/lesson/${lastId}`
		);
	};
	return (
		<div className={scss.Task}>
			<div className={scss.card_lesson}>
				{lesson?.map((item) => (
					<div
						className={scss.card_container}
						onClick={() => {
							console.log(item._id + 'Проблема!');
							localStorage.setItem('lastId', String(item._id));
							localStorage.setItem('task', item._id);

							setSaveId(item._id);
							setTimeout(() => {
								GetLessonTaskFunc();
							}, 1000);
						}}
					>
						<p className={scss.card_link}>{item.title}</p>
					</div>
				))}
			</div>

			<DeleteTask
				openModalDelete={openDelete}
				closeModalDelete={() => setOpenDelete(false)}
				deleteById={saveId}
			/>
		</div>
	);
};

export default GetLessonTask;
