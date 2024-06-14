import { useGetTaskInstructorQuery } from '@/src/redux/api/instructor/addTask';
import scss from './GetOneTask.module.scss';
import { IconUserCircle } from '@tabler/icons-react';
import { useState } from 'react';
import ButtonSave from '@/src/ui/customButton/ButtonSave';
import { useParams } from 'react-router-dom';

const GetOneTask = () => {
	const { lessonId } = useParams();
	const lesson = Number(lessonId);
	const { data } = useGetTaskInstructorQuery(lesson);
	const [isTrue, setIsTrue] = useState(true);
	console.log(setIsTrue);

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
					<div className={scss.student_comment}>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora!
						</p>
						<p className={scss.data}>12.13.2024</p>
					</div>
					<div
						style={{ display: 'flex', gap: '15px', flexDirection: 'column' }}
					>
						<div>
							<div className={scss.user}>
								<IconUserCircle stroke={2} />
								<p>Ракатова Нурайым</p>
							</div>
						</div>
						<div className={scss.correct_hw}>
							<p>uygui</p>
							<p className={scss.data}>12.13.2024</p>
						</div>
					</div>
					{isTrue ? (
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
									style={{ display: 'flex', justifyContent: 'space-between' }}
								>
									<p>10 баллов</p>
									<p className={scss.data}>12.13.2024</p>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default GetOneTask;
