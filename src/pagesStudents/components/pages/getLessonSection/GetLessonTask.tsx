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
	const { courseId, lessonId, getTaskId } = useParams();
	const GetLessonTaskFunc = () => {
		navigate(`/courses/${courseId}/materials/${lessonId}/lesson/${getTaskId}`);
	};
	return (
		<div className={scss.Task}>
			<div className={scss.card_lesson}>
				{lesson?.map((item) => (
					<div
						className={scss.card_container}
						onClick={() => {
							setSaveId(item._id);
							setTimeout(() => {
								GetLessonTaskFunc();
							}, 500);
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
