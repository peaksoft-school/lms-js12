import scss from './GetTest.module.scss';
import ButtonSave from '@/src/ui/customButton/ButtonSave';
import { Box, ScrollArea } from '@mantine/core';
import { useGetQuestionListTestsQuery } from '@/src/redux/api/students/test';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function GetTest() {
	const { lessonId, testId } = useParams();
	const { data } = useGetQuestionListTestsQuery(testId);
	const navigate = useNavigate();
	const [questions, setQuestions] = useState<
		STUDENTTEST.QuestionResponseList[]
	>([]);

	useEffect(() => {
		if (data) {
			setQuestions(data.questionResponseList);
		}
	}, [data]);

	const handleCheckboxChange = (questionId: number, optionId: number) => {
		const updatedQuestions = questions.map((question) =>
			question.questionId === questionId
				? {
						...question,
						optionResponses: question.optionResponses.map((option) =>
							option.optionId === optionId
								? { ...option, isTrue: !option.isTrue }
								: { ...option, isTrue: false }
						)
					}
				: question
		);
		setQuestions(updatedQuestions);
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
												question.optionResponses.length === 2
													? 'checkbox'
													: 'radio'
											}
											checked={option.isTrue}
											onChange={() =>
												handleCheckboxChange(
													question.questionId,
													option.optionId
												)
											}
											className={option.isTrue ? scss.correct_checkbox : ''}
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
								onClick={() =>
									navigate(
										`/courses/${lessonId}/materials/${lessonId}/${testId}/resultTest`
									)
								}
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
