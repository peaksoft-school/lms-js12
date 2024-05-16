import { useState } from 'react';
import scss from './Test.module.scss';
import { useNavigate } from 'react-router-dom';
import ButtonSave from '@/src/ui/customButton/ButtonSave';

const Test = () => {
	const navigate = useNavigate();
	const [questions] = useState([
		{
			number: '№',
			text: 'Название теста',
			time: '40'
		},
		{
			number: '№',
			text: 'Название теста',
			time: '40'
		}
	]);

	const id = localStorage.getItem('id');
	const lessonId = localStorage.getItem('lessonId');

	return (
		<div className={scss.test_container}>
			<div className={scss.container}>
				{questions.map((question) => (
					<div className={scss.test_container_second}>
						<div className={scss.test_container_fifth}>
							<div className={scss.test_container_third}>
								<h4>{question.number}</h4>
								<h4 className={scss.test_text}>{question.text}</h4>
							</div>
							<div className={scss.test_container_forth}>
								<p className={scss.text_time}>Время: {question.time} минут</p>
							</div>
						</div>
						<div className={scss.test_buttons_container}>
							<ButtonSave
								type={'button'}
								width={''}
								children={'Начать тест'}
								disabled={false}
								onClick={() =>
									navigate(
										`/instructor/course/${id}/materials/${lessonId}/showTest`
									)
								}
							></ButtonSave>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Test;
