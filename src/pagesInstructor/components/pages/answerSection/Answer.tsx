import Input from '@/src/ui/customInput/Input';
import scss from './Answer.module.scss';
import { useState } from 'react';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import {
	useGetInstructorTaskQuery,
	usePatchTaskInstructorMutation
} from '@/src/redux/api/instructor/addTask';
import { useParams } from 'react-router-dom';
import person from '@/src/assets/svgs/Profile.png';

const Answer = () => {
	const [comments, setComments] = useState('');
	const [score, setScore] = useState('');
	const { answerId } = useParams();
	const [patchTaskInstructor] = usePatchTaskInstructorMutation();
	const test = Number(answerId);
	const { data } = useGetInstructorTaskQuery(test);

	const handleOnClose = async () => {
		const newComment = {
			point: score,
			comment: comments,
			isAccept: false
		};
		await patchTaskInstructor({ newComment, answerId });
	};

	const handleScore = async () => {
		const newComment = {
			point: score,
			comment: comments,
			isAccept: true
		};
		await patchTaskInstructor({ newComment, answerId });
	};
	return (
		<div className={scss.Answer}>
			<h1>Материалы</h1>
			<div className={scss.main_task}>
				<div className={scss.student_task}>
					<h2>Задание студента:</h2>
					{data && (
						<div>
							<div>{data.text}</div>

							<div dangerouslySetInnerHTML={{ __html: data.description }} />
						</div>
					)}
				</div>
				<div
					style={{ borderBottom: '1px solid gray', paddingTop: '20px' }}
				></div>
				<div>
					<div>
						{data?.comment.map((item) => (
							<div className={scss.mainProfile}>
								<div className={scss.profile}>
									<img src={person} alt="" className={scss.image} />
									<p className={scss.auth}>{item.author}</p>
								</div>
								<div className={scss.grade_comment}>
									<p className={scss.content}>{item.content}</p>
								</div>
							</div>
						))}
						{data && (
							<div>
								<div className={scss.score}>Оценка:{data.point}</div>
							</div>
						)}
					</div>
				</div>
				<div className={scss.comments}>
					<Input
						size="small"
						value={comments}
						onChange={(e) => setComments(e.target.value)}
						width="100%"
						type="text"
						placeholder="Комментарий  к заданию"
					/>
					<div className={scss.comment_part}>
						<ButtonCancel
							type="button"
							width="145px"
							disabled={false}
							onClick={handleOnClose}
						>
							Не принято
						</ButtonCancel>
						<div className={scss.comment_div}>
							<input
								value={score}
								onChange={(e) => setScore(e.target.value)}
								width="100%"
								type="text"
								placeholder="Введите баллы"
							/>
							<button style={{ cursor: 'pointer' }} onClick={handleScore}>
								Принято
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Answer;
