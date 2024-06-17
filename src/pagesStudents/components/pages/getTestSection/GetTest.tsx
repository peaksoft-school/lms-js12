import scss from './GetTest.module.scss';
import { Box, ScrollArea } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetInsideTestQuery } from '@/src/redux/api/instructor/test';
import ButtonSave from '@/src/ui/customButton/ButtonSave';
import { usePostTestResultStudentsMutation } from '@/src/redux/api/students/test';
import { useState, useEffect } from 'react';

function GetTest() {
	const { coursesId, lessonId, testId } = useParams();
	const [postTestResultStudents] = usePostTestResultStudentsMutation();
	const [testIdSave, setTestIdSave] = useState([]);
	const [remainingTime, setRemainingTime] = useState(null);

	const sendTestResult = async () => {
		// Convert strings to integers
		const testIds = testIdSave.map((id) => parseInt(id, 10));

		try {
			// Call the mutation with the array of integers
			await postTestResultStudents(testIds);
		} catch (error) {
			console.error('Error posting test results:', error);
			// Handle error if needed
		}
	};

	const test = Number(testId);
	const { data } = useGetInsideTestQuery(test);
	const navigate = useNavigate();

	const handleOptionChange = (optionId) => {
		setTestIdSave((prevTestIdSave) =>
			prevTestIdSave.includes(optionId)
				? prevTestIdSave.filter((id) => id !== optionId)
				: [...prevTestIdSave, optionId]
		);
	};

	useEffect(() => {
		if (data) {
			const endTime = new Date();
			endTime.setHours(endTime.getHours() + data.hour);
			endTime.setMinutes(endTime.getMinutes() + data.minute);

			const updateRemainingTime = () => {
				const now = new Date();
				const timeLeft = endTime - now;

				if (timeLeft <= 0) {
					setRemainingTime('00:00:00');
					clearInterval(timer);
				} else {
					const hours = Math.floor(timeLeft / (1000 * 60 * 60));
					const minutes = Math.floor(
						(timeLeft % (1000 * 60 * 60)) / (1000 * 60)
					);
					const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
					setRemainingTime(
						`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
					);
				}
			};

			updateRemainingTime();
			const timer = setInterval(updateRemainingTime, 1000);

			return () => clearInterval(timer);
		}
	}, [data]);

	return (
		<ScrollArea type="always" scrollbars="xy" offsetScrollbars>
			<Box>
				<div className={scss.Main_div}>
					{data && (
						<>
							<div className={scss.get_test_name_test} key={data.testId}>
								<h2>{data.title}</h2>
								<p className={scss.get_test_time}>
									{`Оставшееся время для прохождения теста: ${remainingTime}`}
								</p>
							</div>
						</>
					)}
					<div className={scss.testing_container}>
						{data?.questionResponseList?.map((question) => (
							<div key={question.questionId} className={scss.question}>
								<div className={scss.get_test_testing_second_container}>
									<h4>{question.title}</h4>
								</div>
								{question.optionResponses.map((option) => (
									<div key={option.optionId} className={scss.option}>
										{question.optionResponses.filter((opt) => opt.isTrue)
											.length === 1 ? (
											<>
												<input
													type="radio"
													checked={testIdSave.includes(option.optionId)}
													onChange={() => handleOptionChange(option.optionId)}
													className={scss.correct_checkbox}
												/>
												<label>{option.option}</label>
											</>
										) : (
											<>
												<input
													type="checkbox"
													checked={testIdSave.includes(option.optionId)}
													onChange={() => handleOptionChange(option.optionId)}
													className={scss.correct_checkbox}
												/>
												<label>{option.option}</label>
											</>
										)}
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
									sendTestResult();
									setTimeout(() => {
										navigate(
											`/courses/${coursesId}/materials/${lessonId}/${testId}/resultTest`
										);
									}, 300);
								}}
							></ButtonSave>
						</div>
					</div>
				</div>
			</Box>
		</ScrollArea>
	);
}

export default GetTest;
