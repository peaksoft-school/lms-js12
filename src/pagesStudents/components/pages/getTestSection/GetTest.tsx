import scss from './GetTest.module.scss';
import ButtonSave from '@/src/ui/customButton/ButtonSave';
import { Box, ScrollArea } from '@mantine/core';
import {
	useGetQuestionListTestsQuery,
	usePostTestMutation
} from '@/src/redux/api/students/test';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function GetTest() {
	const { lessonId, getTaskId } = useParams();
	const { data } = useGetQuestionListTestsQuery(getTaskId);
	const [saveIds, setSaveIds] = useState({});
	const [postTest] = usePostTestMutation();
	const navigate = useNavigate();
	const [questions, setQuestions] = useState<
		STUDENTTEST.QuestionResponseList[]
	>([]);
	console.log(saveIds);

	const sendTest = async () => {
		const requestData = {
			getTaskId: getTaskId,
			saveIds: saveIds
		};

		try {
			const response = await postTest(requestData);
			console.log(response);
			// Добавьте дополнительную обработку ответа, если необходимо
			setTimeout(() => {
				navigate(
					`/courses/${lessonId}/materials/${lessonId}/${getTaskId}/resultTest`
				);
			}, 200);
		} catch (error) {
			console.error('Ошибка при отправке данных на сервер:', error);
			// Обработайте ошибку по вашему усмотрению
		}
	};

	useEffect(() => {
		if (data) {
			setQuestions(data.questionResponseList);
		}
	}, [data]);

	const handleCheckboxChange = (questionId: number, optionId: number) => {
		// Копируем текущий объект saveIds
		const newSaveIds = { ...saveIds };
		// Переключаем значение идентификатора
		newSaveIds[questionId] = optionId;
		// Обновляем состояние
		setSaveIds(newSaveIds);
	};

	return (
		<div className={scss.Main_div}>
			<div className={scss.get_test_name_test}>
				<h2>{data?.title}</h2>
				<p className={scss.get_test_time}>
					{data?.hour}:{data?.minute}
				</p>
			</div>
			<ScrollArea type="always" scrollbars="xy" offsetScrollbars>
				<Box>
					<div className={scss.testing_container}>
						{data?.questionResponseList.map((question) => (
							<div key={question.questionId} className={scss.question}>
								<div className={scss.get_test_testing_second_container}>
									<h4>{question.questionId}.</h4>
									<h4>{question.title}.</h4>
									<h4>{question.point}-</h4>
									<h4>{question.questionType}</h4>
								</div>
								{question.optionResponses.map((option) => (
									<div key={option.optionId} className={scss.option}>
										<input
											type={
												question.optionResponses.some((item) => item.isTrue)
													? 'checkbox'
													: 'radio'
											}
											onClick={() =>
												handleOptionChange(question.questionId, option.optionId)
											}
											checked={saveIds[question.questionId] === option.optionId}
										/>

										<label>{option.option}</label>
									</div>
								))}
								<hr className={scss.getTest_hr} />
							</div>
						))}
						<div className={scss.getTest_button}>
							<ButtonSave
								type={'button'}
								width={'92px'}
								disabled={false}
								onClick={() => sendTest()}
							>
								Отправить
							</ButtonSave>
						</div>
					</div>
				</Box>
			</ScrollArea>
		</div>
	);
}

export default GetTest;
