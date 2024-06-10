import { useEffect, useState } from 'react';
import scss from './ResultTest.module.scss';
import { Box, ScrollArea } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { Radio, Checkbox } from '@mui/material';
import { green, red } from '@mui/material/colors';
import { useGetMyResultTestQuery } from '@/src/redux/api/students/answerTest';

function ResultTest() {
	const { getTaskId } = useParams();
	const { data } = useGetMyResultTestQuery(getTaskId);
	console.log(data, 'data');
	const [questions, setQuestions] = useState<
		ANSWERTEST.AnswerQuestionResponse[]
	>([]);

	useEffect(() => {
		console.log('testId:', getTaskId);
		console.log('data:', data);
		if (data) {
			setQuestions(data.answerQuestionResponses);
		}
	}, [data]);

	const handleCheckboxChange = (questionId: number, optionId: number) => {
		const updatedQuestions = questions.map((question) =>
			question.questionId === questionId
				? {
						...question,
						answerOptionResponses: question.answerOptionResponses.map(
							(option) =>
								option.optionId === optionId
									? { ...option, isChecked: !option.yourChoice }
									: option.yourChoice && option.true
										? { ...option, true: false }
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
				<h2>{data?.testTitle}</h2>
				<p className={scss.get_test_time}>{data?.totalPoint}</p>
			</div>
			<ScrollArea type="always" scrollbars="xy" offsetScrollbars>
				<Box>
					<div className={scss.testing_container}>
						{data?.answerQuestionResponses.map((question) => (
							<div key={question.questionId} className={scss.question}>
								<div className={scss.get_test_testing_second_container}>
									<h4>{question.questionId}.</h4>
									<h4>{question.questionTitle}.</h4>
									<h4>{question.point}</h4>
									<h4>{question.questionType}</h4>
								</div>
								{question.answerOptionResponses.map((option) => (
									<div key={option.optionId} className={scss.option}>
										{/* <input
											type={
												question.answerOptionResponses.filter((opt) => opt.true)
													.length === 2
													? 'checkbox'
													: 'radio'
											}
											checked={option.true}
											onChange={() =>
												handleCheckboxChange(
													question.questionId,
													option.optionId
												)
											}
											className={option.true ? scss.correct_checkbox : ''}
										/> */}
										{question.answerOptionResponses.filter(
											(opt) => opt.yourChoice
										).length === 2 ? (
											<Checkbox
												checked={option.yourChoice}
												onChange={() =>
													handleCheckboxChange(
														question.questionId,
														option.optionId
													)
												}
												sx={{
													color: green[600],
													'&.Mui-checked': {
														color: green[600]
													}
												}}
											/>
										) : (
											<Radio
												checked={option.yourChoice}
												onChange={() =>
													handleCheckboxChange(
														question.questionId,
														option.optionId
													)
												}
												sx={{
													color: option.true ? green[600] : red[800],
													'&.Mui-checked': {
														color: option.true ? green[600] : red[600]
													}
												}}
											/>
										)}
										<label>{option.option}</label>
									</div>
								))}
								<hr className={scss.getTest_hr} />
							</div>
						))}
					</div>
				</Box>
			</ScrollArea>
		</div>
	);
}

export default ResultTest;
