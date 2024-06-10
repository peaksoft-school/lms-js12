import scss from './GetTestInstructor.module.scss';
import { Box, ScrollArea } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useGetInsideTestQuery } from '@/src/redux/api/instructor/test';

function GetTestInstructor() {
	const { getTaskId } = useParams();

	const { data: test = {} } = useGetInsideTestQuery(getTaskId);

	const handleCheckboxChange = (questionId, optionId) => {
		const updatedQuestions = questions.map((question) =>
			question.id === questionId
				? {
						...question,
						options: question.options.map((option) =>
							option.id === optionId
								? { ...option, isChecked: !option.isChecked }
								: option
						)
					}
				: question
		);
		setQuestions(updatedQuestions);
	};

	return (
		<ScrollArea type="always" scrollbars="xy" offsetScrollbars>
			<Box>
				<div className={scss.Main_div}>
					{test && (
						<>
							<div className={scss.get_test_name_test} key={test.testId}>
								<h2>{test.title}</h2>
								<p className={scss.get_test_time}>
									{` Время для прохождения теста:${test.hour}.${test.minute}`}
								</p>
							</div>
						</>
					)}
					<div className={scss.testing_container}>
						{test?.questionResponseList?.map((question) => (
							<div key={question.questionId} className={scss.question}>
								<div className={scss.get_test_testing_second_container}>
									<h4>{question.title}</h4>
								</div>
								{question.optionResponses.map((option) => (
									<div key={option.optionId} className={scss.option}>
										<input
											type={
												question.optionResponses.filter((opt) => opt.isTrue)
													.length !== 2
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
					</div>
				</div>
			</Box>
		</ScrollArea>
	);
}

export default GetTestInstructor;
