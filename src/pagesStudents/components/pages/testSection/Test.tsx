// import { useState } from 'react';
import scss from './Test.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import ButtonSave from '@/src/ui/customButton/ButtonSave';
import { useGetStudentTestsQuery } from '@/src/redux/api/students/test';

const Test = () => {
	const { coursesId, lessonId, testId } = useParams();
	// console.log(courseId, lessonId);
	const { data } = useGetStudentTestsQuery(lessonId);
	console.log(data);

	const navigate = useNavigate();
	console.log(data, 'data');

	return (
		<div className={scss.test_container}>
			<div className={scss.container}>
				{data?.testResponseForGetAll.map((question) => (
					<div key={question.testId} className={scss.test_container_second}>
						<div className={scss.test_container_fifth}>
							<div className={scss.test_container_third}>
								<h4 className={scss.test_text}>{question.title}</h4>
							</div>
							<div className={scss.test_container_forth}>
								<p className={scss.text_time}>Время: {question.hour} час</p>
								<p className={scss.text_time}>Время: {question.minute} минут</p>
							</div>
						</div>
						<div className={scss.test_buttons_container}>
							<ButtonSave
								type={'button'}
								width={''}
								disabled={false}
								onClick={() =>
									navigate(
										`/courses/${coursesId}/materials/${lessonId}/${question.testId}/showTest`
									)
								}
							>
								Начать тест
							</ButtonSave>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Test;
