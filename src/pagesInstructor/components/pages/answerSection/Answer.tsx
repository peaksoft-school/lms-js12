import Input from '@/src/ui/customInput/Input';
import scss from './Answer.module.scss';
import { useState } from 'react';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import { useGetTaskInstructorQuery } from '@/src/redux/api/instructor/addTask';

const Answer = () => {
	const [comments, setCommmets] = useState('');
	const [srore, setScore] = useState('');
	const { data } = useGetTaskInstructorQuery();
	return (
		<div className={scss.Answer}>
			<h1>Материалы</h1>
			<div className={scss.main_task}>
				<div className={scss.student_task}>
					<h2>Задание студента:</h2>
					{data?.map((item) => <div>{item.title}</div>)}
				</div>
				<hr />
				<div className={scss.comments}>
					<Input
						size="small"
						value={comments}
						onChange={(e) => setCommmets(e.target.value)}
						width="100%"
						type="text"
						placeholder="Комментарий  к заданию"
					/>
					<div className={scss.comment_part}>
						<ButtonCancel
							type="button"
							width="145px"
							disabled={false}
							onClick={() => {}}
						>
							Не принято
						</ButtonCancel>
						<div className={scss.comment_div}>
							<input
								value={srore}
								onChange={(e) => setScore(e.target.value)}
								width="100%"
								type="text"
								placeholder="Введите баллы"
							/>
							<button>Принято</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Answer;
