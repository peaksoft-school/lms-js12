import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	useAnswerTaskStudentQuery,
	useGetTaskInstructorQuery
} from '@/src/redux/api/instructor/addTask';
import scss from './GetOneTask.module.scss';
import profile from '@/src/assets/profile.png';
import ButtonSave from '@/src/ui/customButton/ButtonSave';

const GetOneTask = () => {
	const { coursesId, lessonId, getTaskId } = useParams();
	const lesson = Number(lessonId);
	const getTask = Number(getTaskId);

	const { data: taskData } = useGetTaskInstructorQuery(lesson);
	const { data: response, status } = useAnswerTaskStudentQuery(getTask);

	const navigate = useNavigate();

	useEffect(() => {
		if (
			(response === undefined && status === 'fulfilled') ||
			status === 'rejected'
		) {
			navigate(
				`/courses/${coursesId}/materials/${lessonId}/lesson/${getTaskId}/send-task`
			);
		}
	}, [response, status, navigate, coursesId, lessonId, getTaskId]);

	return (
		<div className={scss.get_task}>
			<div className={scss.Task}>
				{taskData?.taskResponse.map((item, index) => (
					<div key={index} className={scss.card}>
						<div className={scss.text}>
							<h2>{item.title}</h2>
							<h2>{item.deadline}</h2>
						</div>
						<div dangerouslySetInnerHTML={{ __html: item.description }} />
					</div>
				))}

				{response && (
					<div className={scss.comment}>
						<div className={scss.student_comment}>
							<p>{response.text}</p>
							<p className={scss.data}>132023</p>
						</div>

						<div className={scss.comments_container}>
							<div className={scss.user}>
								<img src={profile} alt="profile" />
								<p>
									{response.comment.map((item, index) => (
										<span key={index}>{item.author}</span>
									))}
								</p>
							</div>
							<div className={scss.correct_hw}>
								<p>
									{response.comment.map((item, index) => (
										<span key={index}>{item.content}</span>
									))}
								</p>
								<p className={scss.data}>12.13.2024</p>
							</div>
						</div>

						{response.taskAnswerStatus === 'ACCEPTED' ? (
							<div className={scss.getHw}>
								<h3>Ваше ДЗ не принято</h3>
								<ButtonSave
									onClick={() => {}}
									width="230px"
									disabled={false}
									type="button"
								>
									Редактировать задание
								</ButtonSave>
							</div>
						) : (
							<div className={scss.notGetHw}>
								<h3>Ваше ДЗ успешно принято</h3>
								<div className={scss.accepted_status}>
									<p>{response.point}</p>
									<p className={scss.data}>12.13.2024</p>
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default GetOneTask;
