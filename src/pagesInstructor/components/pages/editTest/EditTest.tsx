import { useEffect, useState } from 'react';
import Input from '@/src/ui/customInput/Input';
import scss from './EditTest.module.scss';
import { IconCopy } from '@tabler/icons-react';
import { IconDelete } from '@/src/assets/icons';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import ButtonSave from '@/src/ui/customButton/ButtonSave';
import ButtonCircle from '@/src/ui/customButton/ButtonCircle';
import { Select } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import {
	useEditTestMutation,
	useGetInsideTestQuery
} from '@/src/redux/api/instructor/test';

const EditTest = () => {
	const { control, handleSubmit, reset } = useForm();
	const { getTaskId } = useParams();
	const { data } = useGetInsideTestQuery(getTaskId);
	const [editTest] = useEditTestMutation();
	const [time, setTime] = useState(`${data?.hour}:${data?.minute}`);
	const [inputs, setInputs] = useState([]);
	const [copiesData, setCopiesData] = useState([]);
	const [option, setOption] = useState('SINGLE');

	useEffect(() => {
		if (data) {
			setTime(`${data.hour}:${data.minute}`);
			setInputs(
				data.questionResponseList.map((question) => ({
					options: question.optionResponses.map((option) => ({
						value: option.option,
						isTrue: option.isTrue
					})),
					title: question.title,
					point: question.point
				}))
			);
			setCopiesData([]);
		}
	}, [data]);

	const handleTimeChange = (event) => setTime(event.target.value);

	const handleOptionClick = (selectedOption) => setOption(selectedOption);

	const onSubmit = async (formData) => {
		const initialQuestions = inputs.map((input, index) => ({
			title: formData[`titleValue_${index}`],
			point: formData[`pointValue_${index}`],
			questionType: option,
			optionRequests: input.options.map((option, optionIndex) => ({
				option: formData[`optionValue_${index}_${optionIndex}`],
				isTrue:
					formData[`option_${index}_isTrue_${optionIndex}`] ===
					optionIndex.toString()
			}))
		}));

		const copiedQuestions = copiesData.map((copyData, index) => ({
			title: formData[`copyData_${index}_inputValue3`],
			point: formData[`copyData_${index}_inputValue4`],
			questionType: option,
			optionRequests: copyData.options.map((option, optionIndex) => ({
				option: formData[`copyData_${index}_optionValue_${optionIndex}`],
				isTrue:
					formData[`copyData_${index}_option_${optionIndex}_isTrue`] ===
					optionIndex.toString()
			}))
		}));

		const allQuestions = [...initialQuestions, ...copiedQuestions];

		const newTest = {
			title: formData.title,
			hour: time.split(':')[0],
			minute: time.split(':')[1],
			questionRequests: allQuestions
		};
		console.log(newTest);

		try {
			const response = await editTest({ newTest, getTaskId });
			console.log(response, 'response');
			reset();
		} catch (error) {
			console.error(error);
		}
	};

	const handleCopies = () => {
		const newCopyData = {
			options: [{ value: '', isTrue: false }],
			title: '',
			point: ''
		};
		setInputs([...inputs, newCopyData]);
	};
	const renderInputFields = (inputs, questionIndex) =>
		inputs.map((input, index) => (
			<div key={index} className={scss.input_div}>
				<div className={scss.variant_inputs}>
					{data?.questionResponseList[questionIndex].questionType ===
					'MULTIPLE' ? (
						<div className={scss.radio_checkbox}>
							<Controller
								name={`option_${questionIndex}_${index}_isTrue`}
								control={control}
								render={({ field }) => (
									<label>
										<input
											{...field}
											style={{ cursor: 'pointer' }}
											type="checkbox"
											// checked{}
										/>
									</label>
								)}
							/>
						</div>
					) : (
						<div className={scss.radio_checkbox}>
							<Controller
								name={`option_${questionIndex}_${index}_isTrue`}
								control={control}
								render={({ field }) => (
									<label>
										<input
											{...field}
											style={{ cursor: 'pointer' }}
											type="radio"
											name={`option_${questionIndex}`}
										/>
									</label>
								)}
							/>
						</div>
					)}
					<div className={scss.option_input}>
						<Controller
							name={`optionValue_${questionIndex}_${index}`}
							control={control}
							defaultValue={input.value}
							render={({ field }) => (
								<Input
									{...field}
									size="small"
									placeholder={`Вариант ${index + 1}`}
									type="text"
									width="100%"
								/>
							)}
						/>
						<div className={scss.notice}>
							<button
								className={scss.button_cancel}
								type="button"
								onClick={() => {
									const newInputs = [...inputs];
									newInputs.splice(index, 1);
									setInputs(newInputs);
								}}
							>
								<span className={scss.delete_icon}>&times;</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		));

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={scss.test}>
				<h1>Материалы</h1>
				<div className={scss.name_of_the_test}>
					<h2>Название теста</h2>
					<div className={scss.container}>
						<div className={scss.input}>
							<Controller
								name="title"
								control={control}
								defaultValue={data?.title}
								render={({ field }) => (
									<Input
										type="text"
										{...field}
										placeholder="Введи название теста"
										size="small"
										width="100%"
									/>
								)}
							/>
						</div>
						<div className={scss.input_time}>
							<p>Время прохождения теста</p>
							<input
								className={scss.time_inputs}
								name="time"
								type="time"
								value={time}
								onChange={handleTimeChange}
							/>
							<p style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
								<span>Тип тест</span>
								<Select
									placeholder="Тип теста:"
									data={['Soft', 'Medium', 'Hard']}
									defaultValue="soft"
									clearable
								/>
							</p>
						</div>
					</div>
				</div>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
					<div className={scss.div_component2}>
						<div className={scss.input_contain2}>
							{inputs.map((item, index) => (
								<div className={scss.mainInput} key={index}>
									<div className={scss.input_text}>
										<h2 className={scss.h2_number}>{index + 1}</h2>
										<Controller
											name={`titleValue_${index}`}
											control={control}
											defaultValue={item.title}
											render={({ field }) => (
												<Input
													type="text"
													placeholder="Вопрос"
													width="100%"
													size="small"
													{...field}
												/>
											)}
										/>
										<Controller
											name={`pointValue_${index}`}
											control={control}
											defaultValue={item.point}
											render={({ field }) => (
												<Input
													type="number"
													placeholder="Введите кол-во баллов"
													width="100%"
													size="small"
													{...field}
												/>
											)}
										/>
										<div className={scss.radio_input}>
											<label style={{ display: 'flex', gap: '5px' }}>
												<input
													style={{ cursor: 'pointer' }}
													type="checkbox"
													name="option"
													checked={option === 'SINGLE'}
													onChange={() => handleOptionClick('SINGLE')}
												/>
												Один <span>из списка</span>
											</label>
											<label style={{ display: 'flex', gap: '5px' }}>
												<input
													style={{ cursor: 'pointer' }}
													type="checkbox"
													name="option"
													checked={option === 'MULTIPLE'}
													onChange={() => handleOptionClick('MULTIPLE')}
												/>
												Несколько <span>из списка</span>
											</label>
										</div>
									</div>
									<div>{renderInputFields(item.options, index)}</div>
									<div className={scss.div_text2}>
										<div className={scss.components}>
											<p className={scss.p_text2}>
												<a
													style={{ color: '#258aff' }}
													href="#"
													onClick={() => {
														const newInputs = [...inputs];
														newInputs[index].options.push({
															value: '',
															isTrue: false
														});
														setInputs(newInputs);
													}}
												>
													Добавить вариант
												</a>
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className={scss.button_contain}>
					<ButtonCancel width="100px" type={'button'} disabled={false}>
						Отмена
					</ButtonCancel>
					<ButtonSave width="30px" type="submit" disabled={false}>
						Сохранить
					</ButtonSave>
				</div>
				<div className={scss.button_circle}>
					<ButtonCircle onClick={handleCopies} type="button" disabled={false}>
						{' '}
					</ButtonCircle>
				</div>
			</div>
		</form>
	);
};

export default EditTest;
