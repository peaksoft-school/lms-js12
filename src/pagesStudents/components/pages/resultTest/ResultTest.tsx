import { blue, green } from '@mui/material/colors';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';

import scss from './ResultTest.module.scss';
import { Box, ScrollArea } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useGetTestResultStudentsQuery } from '@/src/redux/api/students/test';

function ResultTest() {
	const { testId } = useParams();
	const test = Number(testId);
	const { data } = useGetTestResultStudentsQuery(test);
	console.log(data);

	return (
		<ScrollArea type="always" scrollbars="xy" offsetScrollbars>
			<Box>
				<div className={scss.Main_div}>
					<>
						<div className={scss.get_test_name_test} key={data?.testId}>
							<h2>{data?.testTitle}</h2>
							<p className={scss.get_test_time}>
								{`Время для прохождения теста: ${data?.testId}`}
							</p>
						</div>
						<div className={scss.testing_container}>
							{data?.answerQuestionResponses.map((question) => (
								<div key={question.questionId} className={scss.question}>
									<div className={scss.get_test_testing_second_container}>
										<h4>{question.questionTitle}</h4>
									</div>
									{question.answerOptionResponses.map((item) => (
										<div key={item.optionId} className={scss.option}>
											{question.answerOptionResponses.filter((opt) => opt.true)
												.length === 1 ? (
												<FormControlLabel
													value={item.option}
													control={
														<Radio
															checked={item.true}
															className={item.true ? scss.correct_checkbox : ''}
															sx={{
																color:
																	item.yourChoice && item.true
																		? green[800]
																		: blue
															}}
														/>
													}
													label={item.option}
												/>
											) : (
												<div
													className={
														item.yourChoice && item.true
															? scss.input
															: item.true
																? scss.input2
																: item.true === false &&
																	  item.yourChoice === true
																	? scss.input3
																	: ''
													}
												>
													<input
														type="checkbox"
														checked={item.true === true || item.yourChoice}
														className={scss.correct_checkbox}
													/>
													<label>{item.option}</label>
												</div>
											)}
										</div>
									))}
									<hr className={scss.getTest_hr} />
								</div>
							))}
						</div>
					</>
				</div>
			</Box>
		</ScrollArea>
	);
}

export default ResultTest;
