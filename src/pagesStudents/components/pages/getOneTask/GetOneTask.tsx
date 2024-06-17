import {
	useAnswerTaskStudentQuery,
	useGetTaskInstructorQuery
} from '@/src/redux/api/instructor/addTask';
import scss from './GetOneTask.module.scss';
import profile from '@/src/assets/profile.png';
import ButtonSave from '@/src/ui/customButton/ButtonSave';
import { useNavigate, useParams } from 'react-router-dom';
import SendOneTask from '../sendOneTask/SendOneTask';
import { useEffect } from 'react';

const GetOneTask = () => {
	const { lessonId, getTaskId } = useParams();
	const lesson = Number(lessonId);
	const { data } = useGetTaskInstructorQuery(lesson);
	const getTask = Number(getTaskId);
	const { data: response } = useAnswerTaskStudentQuery(getTask);
	const navigate = useNavigate();

	useEffect(() => {
		if (
			data?.response?.message ===
			'Ответ на задание не найден для данного пользователя'
		) {
			const { coursesId, lessonId, getTaskId } = data.response;
			navigate(
				`/courses/${coursesId}/materials/${lessonId}/lesson/${getTaskId}/send-task`
			);
		}
	}, [data]);
	return (
		<div className={scss.get_task}>
			<div className={scss.Task}>
				{data?.taskResponse.map((item) => (
					<div className={scss.card}>
						<div className={scss.text}>
							<h2>{item.title}</h2>
							<h2>{item.deadline}</h2>
						</div>

						<div dangerouslySetInnerHTML={{ __html: item.description }} />
					</div>
				))}
				<div className={scss.comment}>
					{response && (
						<>
							<div className={scss.student_comment}>
								<p>{response.text}</p>
								<p className={scss.data}>{132023}</p>
							</div>
							<div
								style={{
									display: 'flex',
									gap: '15px',
									flexDirection: 'column'
								}}
							>
								<div>
									<div className={scss.user}>
										<img src={profile} alt="" />
										<p>{response.comment.map((item) => item.author)}</p>
									</div>
								</div>
								<div className={scss.correct_hw}>
									<p>{response.comment.map((item) => item.content)}</p>
									<p className={scss.data}>12.13.2024</p>
								</div>
							</div>
							{response.taskAnswerStatus === 'ACCEPTED' ? (
								<>
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
								</>
							) : (
								<>
									<div className={scss.notGetHw}>
										<h3>Ваше ДЗ успешно принято</h3>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between'
											}}
										>
											<p>{response.point}</p>
											<p className={scss.data}>12.13.2024</p>
										</div>
									</div>
								</>
							)}

							{!response && (
								<>
									<SendOneTask />
								</>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default GetOneTask;
