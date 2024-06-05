import { useState } from 'react';
import scss from './GetTest.module.scss';
import ButtonSave from '@/src/ui/customButton/ButtonSave';
import { Box, ScrollArea } from '@mantine/core';
import { useGetQuestionListTestsQuery } from '@/src/redux/api/students/test';
import { useParams } from 'react-router-dom';

function GetTest() {
	const { testId } = useParams();
	console.log(testId);
	const { data } = useGetQuestionListTestsQuery(testId);

	const [questions, setQuestions] = useState([
		{
			id: 1,
			text: 'Какого типа данных нет в java?',
			options: [
				{ id: 1, text: ' int ', isCorrect: true, isChecked: false },
				{ id: 2, text: ' float', isCorrect: true, isChecked: false },
				{ id: 3, text: ' double', isCorrect: false, isChecked: false },
				{ id: 4, text: ' bubble', isCorrect: false, isChecked: false }
			]
		},
		{
			id: 2,
			text: 'Какого типа данных нет в java?',
			options: [
				{ id: 5, text: ' int', isCorrect: true, isChecked: false },
				{ id: 6, text: ' float', isCorrect: true, isChecked: false },
				{ id: 7, text: ' double', isCorrect: true, isChecked: false },
				{ id: 8, text: ' bubble', isCorrect: true, isChecked: false }
			]
		},
		{
			id: 3,
			text: 'Какого типа данных нет в java?',
			options: [
				{ id: 5, text: ' int', isCorrect: false, isChecked: false },
				{ id: 6, text: ' float', isCorrect: false, isChecked: false },
				{ id: 7, text: ' double', isCorrect: true, isChecked: false },
				{ id: 8, text: ' bubble', isCorrect: true, isChecked: false }
			]
		},
		{
			id: 4,
			text: 'Какого типа данных нет в java?',
			options: [
				{ id: 5, text: ' int', isCorrect: false, isChecked: false },
				{ id: 6, text: ' float', isCorrect: false, isChecked: false },
				{ id: 7, text: ' double', isCorrect: false, isChecked: false },
				{ id: 8, text: ' bubble', isCorrect: false, isChecked: false }
			]
		}
	]);

	const handleCheckboxChange = (questionId: number, optionId: number) => {
		const updatedQuestions = questions.map((question) =>
			question.id === questionId
				? {
						...question,
						options: question.options.map((option) =>
							option.id === optionId
								? { ...option, isChecked: !option.isChecked }
								: option.isCorrect && option.isChecked
									? { ...option, isChecked: false }
									: option
						)
					}
				: question
		);
		setQuestions(updatedQuestions);
	};

	return (
		<div className={scss.Main_div}>
			<div className={scss.get_test_name_test}>
				<h2>Название теста</h2>
				<p className={scss.get_test_time}>59:39</p>
			</div>
			<ScrollArea type="always" scrollbars="xy" offsetScrollbars>
				<Box>
					<div className={scss.testing_container}>
						{data?.questionResponseList.map((question) => (
							<div key={question.questionId} className={scss.question}>
								<div className={scss.get_test_testing_second_container}>
									<h4>{question.title}.</h4>
									<h4>{question.point}</h4>
									<h4>{question.questionType}</h4>
								</div>
								{question.optionResponses.map((option) => (
									<div key={option.optionId} className={scss.option}>
										<input
											type={
												question.optionResponses.filter((opt) => opt.isTrue)
													.length === 2
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
								children={'Отправить'}
								disabled={false}
								onClick={() => {
									console.log('Отправить');
								}}
							></ButtonSave>
						</div>
					</div>
				</Box>
			</ScrollArea>
		</div>
	);
}

export default GetTest;
