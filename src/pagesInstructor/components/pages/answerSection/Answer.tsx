import Input from '@/src/ui/customInput/Input';
import scss from './Answer.module.scss';
import { useState, useEffect } from 'react';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import {
	useGetInstructorTaskQuery,
	usePatchTaskInstructorMutation
} from '@/src/redux/api/instructor/addTask';
import { useParams } from 'react-router-dom';
import person from '@/src/assets/svgs/Profile.png';
import ButtonSave from '@/src/ui/customButton/ButtonSave';

const Answer = () => {
	const [comments, setComments] = useState('');
	const [score, setScore] = useState('');
	const [isButtonDisabled, setIsButtonDisabled] = useState(true);
	const { answerId } = useParams();
	const [patchTaskInstructor] = usePatchTaskInstructorMutation();
	const test = Number(answerId);
	const { data } = useGetInstructorTaskQuery(test);

	useEffect(() => {
		if (comments.trim() && score.trim()) {
			setIsButtonDisabled(false);
		} else {
			setIsButtonDisabled(true);
		}
	}, [comments, score]);

	const handleOnClose = async () => {
		const newComment = {
			point: score,
			comment: comments,
			isAccept: false
		};
		await patchTaskInstructor({ newComment, answerId });
		setComments('');
		setScore('');
	};

	const handleScore = async () => {
		const newComment = {
			point: score,
			comment: comments,
			isAccept: true
		};
		await patchTaskInstructor({ newComment, answerId });
		setComments('');
		setScore('');
	};

	return (
		<div className={scss.answer}>
			<h1>Материалы</h1>
			<div className={scss.main_task}>
				<div className={scss.student_task}>
					<h2>Задание студента :</h2>
					{data && (
						<div className={scss.text_task}>
							<div className={scss.task_sms}>{data.text}</div>
							<div dangerouslySetInnerHTML={{ __html: data.description }} />
						</div>
					)}
				</div>
				<div
					style={{ borderBottom: '1px solid #cfcfcf', paddingTop: '20px' }}
				></div>
				<div>
					<div>
						{data?.comment.map((item, index) => (
							<div key={index} className={scss.mainProfile}>
								<div className={scss.profile}>
									<img src={person} alt="" className={scss.image} />
									<p>{item.author}</p>
								</div>
								<div className={scss.grade_comment}>
									<p className={scss.content}>{item.content}</p>
								</div>
							</div>
						))}
						{data && (
							<div>
								<div className={scss.score}>Оценка: {data.point}</div>
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
						placeholder="Комментарий к заданию"
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

							<ButtonSave
								type="button"
								width="117px"
								onClick={handleScore}
								disabled={isButtonDisabled}
							>
								Принято
							</ButtonSave>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Answer;
