import React, { useState } from 'react';
import Input from '@/src/ui/customInput/Input';
import scss from './CreateTest.module.scss';
import { IconCopy } from '@tabler/icons-react';
import { IconDelete } from '@/src/assets/icons';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import ButtonSave from '@/src/ui/customButton/ButtonSave';
import ButtonCircle from '@/src/ui/customButton/ButtonCircle';
import { Select } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import { usePostTestMutation } from '@/src/redux/api/instructor/test';
import { useParams } from 'react-router-dom';

interface CopyData {
	inputValue3: string;
	inputValue4: string;
	inputs: string[];
	options: string;
	
}

const CreateTest = () => {
	const { control, handleSubmit, reset } = useForm();
	const [option, setOption] = useState('SINGLE');
	const [options, setOptions] = useState('SINGLE');
	const [time, setTime] = useState('00:00');
	const [inputs, setInputs] = useState([{ id: 1, value: '', visible: true }]);
	const [copiesData, setCopiesData] = useState<CopyData[]>([]);
	const [titleValue, setTitleValue] = useState<string>('');
	const [pointValue, setPointValue] = useState<string>('');
	const [postTest] = usePostTestMutation();
	const { lessonId } = useParams();

	const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTime(event.target.value);
	};

	const handleChangeTitleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitleValue(e.target.value);
	};

	const handleChangePointValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPointValue(e.target.value);
	};

	const handleAddInput = () => {
		setInputs([...inputs, { id: inputs.length + 1, value: '', visible: true }]);
	};

	const handleOptionClick = (selectedOption: string) => {
		setOption(selectedOption);
	};

	const handleOptionClickUp = (selectedOption: string) => {
		setOptions(selectedOption);
	};

	const handleCopy = (copyDataIndex: number) => {
		const newCopyData = {
			inputValue3: '',
			inputValue4: '',
			inputs: [''],
			options: 'SINGLE'
		};
		const updatedCopiesData = [...copiesData];
		updatedCopiesData.splice(copyDataIndex + 1, 0, newCopyData);
		setCopiesData(updatedCopiesData);
	};

	const handleDelete = (copyDataIndex: number) => {
		const updatedCopiesData = copiesData.filter(
			(_, index) => index !== copyDataIndex
		);
		setCopiesData(updatedCopiesData);
	};

	const handleCopies = () => {
		const newCopyData: CopyData = {
			inputValue3: '',
			inputValue4: '',
			inputs: [''],
			options: 'SINGLE'
		};
		setCopiesData([...copiesData, newCopyData]);
	};

	const handleAddInputOption = (copyDataIndex: number) => {
		const updatedCopiesData = [...copiesData];
		updatedCopiesData[copyDataIndex].inputs.push('');
		setCopiesData(updatedCopiesData);
	};

	const onSubmit = async (data) => {
		const initialAnswers = inputs.map((input) => input.value);

		const initialQuestion = {
			title: titleValue,
			point: pointValue,
			questionType: option,
			optionRequests: initialAnswers.map((ans) => ({
				option: ans,
				isTrue: false
			}))
		};

		const copiedQuestions = copiesData.map((copyData, index) => {
			const answers = copyData.inputs.map((input) => input);
			return {
				title: copyData.inputValue3,
				point: copyData.inputValue4,
				questionType: copyData.options === 'SINGLE' ? 'SINGLE' : 'MULTIPLE',
				optionRequests: answers.map((ans) => ({
					option: ans,
					isTrue: false
				}))
			};
		});

		const questionRequests = [initialQuestion, ...copiedQuestions];

		const newTest = {
			title: data.title,
			hour: time.split(':')[0],
			minute: time.split(':')[1],
			questionRequests: questionRequests
		};

		try {
			const response = await postTest({ newTest, lessonId });
			console.log(response, 'response');
			reset();
		} catch (error) {
			console.error(error);
		}
	};

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
								<span>Тип теста:</span>
								<Select
									placeholder="  Тип теста:"
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
							<div className={scss.input_text}>
								<h2 className={scss.h2_number}>1</h2>
								<Controller
									name="titleValue"
									control={control}
									render={({ field }) => (
										<Input
											type="text"
											placeholder="Вопрос"
											width="100%"
											size="small"
											{...field}
											value={titleValue}
											onChange={handleChangeTitleValue}
										/>
									)}
								/>
								<Controller
									name="pointValue"
									control={control}
									render={({ field }) => (
										<Input
											type="number"
											placeholder="Введите кол-во баллов"
											width="100%"
											size="small"
											{...field}
											value={pointValue}
											onChange={handleChangePointValue}
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
							<div className={scss.div_text2}>
								<div className={scss.components}>
									{inputs.map(
										(input, index) =>
											input.visible && (
												<div key={index} className={scss.input_div}>
													{option === 'SINGLE' ? (
														<div className={scss.radio_checkbox}>
															<Controller
																name={`option_1_isTrue_${index}`}
																control={control}
																render={({ field }) => (
																	<label>
																		<input
																			{...field}
																			style={{ cursor: 'pointer' }}
																			type="radio"
																			name="option_1"
																			value={index}
																		/>
																	</label>
																)}
															/>
														</div>
													) : (
														<div className={scss.radio_checkbox}>
															<Controller
																name={`option_1_isTrue_${index}`}
																control={control}
																render={({ field }) => (
																	<label>
																		<input
																			{...field}
																			style={{ cursor: 'pointer' }}
																			type="checkbox"
																			value={index}
																		/>
																	</label>
																)}
															/>
														</div>
													)}
													<div className={scss.variant_inputs}>
														<Controller
															name={`optionValue_${index}`}
															control={control}
															render={({ field }) => (
																<Input
																	{...field}
																	size="small"
																	placeholder={`Вариант ${index + 1}`}
																	type="text"
																	value={inputs[index].value}
																	onChange={(e) => {
																		const newInputs = [...inputs];
																		newInputs[index].value = e.target.value;
																		setInputs(newInputs);
																	}}
																	width="100%"
																/>
															)}
														/>

														<div className={scss.notice}>
															<button className={scss.button_cancel}>
																<span
																	className={scss.delete_icon}
																	onClick={() => {
																		const newInputs = [...inputs];
																		newInputs.splice(index, 1);
																		setInputs(newInputs);
																	}}
																>
																	&times;
																</span>
															</button>
														</div>
													</div>
												</div>
											)
									)}
									<p className={scss.p_text2}>
										<a
											style={{ color: '#258aff' }}
											href="#"
											onClick={handleAddInput}
										>
											Добавить вариант
										</a>
										<div style={{ display: 'flex', gap: '15px' }}>
											<div
												className={scss.copy_icon}
												onClick={() => handleCopy(0)}
											>
												<IconCopy />
											</div>
											<div className={scss.delete_icon}>
												<IconDelete />
											</div>
										</div>
									</p>
								</div>
							</div>
						</div>
					</div>
					{/* CopiesData */}
					{copiesData.map((copyData, copyIndex) => (
						<div key={copyIndex} className={scss.div_component2}>
							<div className={scss.input_contain2}>
								<div className={scss.input_text}>
									<h2 className={scss.h2_number}>{copyIndex + 2}</h2>
									<Controller
										name={`copyData_${copyIndex}_inputValue3`}
										control={control}
										render={({ field }) => (
											<Input
												type="text"
												placeholder="Вопрос"
												width="100%"
												size="small"
												{...field}
												value={copyData.inputValue3}
												onChange={(e) => {
													const updatedCopiesData = [...copiesData];
													updatedCopiesData[copyIndex].inputValue3 =
														e.target.value;
													setCopiesData(updatedCopiesData);
												}}
											/>
										)}
									/>

									<Controller
										name={`copyData_${copyIndex}_inputValue4`}
										control={control}
										render={({ field }) => (
											<Input
												type="number"
												placeholder="Введите кол-во баллов"
												width="100%"
												size="small"
												{...field}
												value={copyData.inputValue4}
												onChange={(e) => {
													const updatedCopiesData = [...copiesData];
													updatedCopiesData[copyIndex].inputValue4 =
														e.target.value;
													setCopiesData(updatedCopiesData);
												}}
											/>
										)}
									/>
									<div className={scss.radio_input}>
										<label style={{ display: 'flex', gap: '5px' }}>
											<input
												style={{ cursor: 'pointer' }}
												type="checkbox"
												name="options"
												checked={options === 'SINGLE'}
												onChange={() => handleOptionClickUp('SINGLE')}
											/>
											Один <span>из списка</span>
										</label>
										<label style={{ display: 'flex', gap: '5px' }}>
											<input
												style={{ cursor: 'pointer' }}
												type="checkbox"
												// name="options"
												checked={options === 'MULTIPLE'}
												onChange={() => handleOptionClickUp('MULTIPLE')}
											/>
											Несколько <span>из списка</span>
										</label>
									</div>
								</div>
								<div className={scss.div_text2}>
									<div className={scss.components}>
										{copyData.inputs.map((input, index) => (
											<div key={index} className={scss.input_div}>
												{options === 'one' ? (
													<div className={scss.radio_checkbox}>
														<Controller
															name={`isTrue${copyIndex}`}
															control={control}
															render={({ field }) => (
																<label>
																	<input
																		style={{ cursor: 'pointer' }}
																		{...field}
																		type="radio"
																		name="option"
																	/>
																</label>
															)}
														/>
													</div>
												) : (
													<div className={scss.radio_checkbox}>
														<Controller
															name={`options${copyIndex}`}
															control={control}
															render={({ field }) => (
																<label>
																	<input
																		type="checkbox"
																		{...field}
																		style={{ cursor: 'pointer' }}
																	/>
																</label>
															)}
														/>
													</div>
												)}
												<div className={scss.variant_inputs}>
													<Controller
														name="option"
														control={control}
														render={({ field }) => (
															<Input
																{...field}
																size="small"
																placeholder={`Вариант ${index + 1}`}
																type="text"
																value={input}
																onChange={(e) => {
																	const newCopyData = [...copiesData];
																	newCopyData[copyIndex].inputs[index] =
																		e.target.value;
																	setCopiesData(newCopyData);
																}}
																width="100%"
															/>
														)}
													/>

													<div className={scss.notice}>
														<button className={scss.button_cancel}>
															<span
																className={scss.delete_icon}
																onClick={() => {
																	const newCopyData = [...copiesData];
																	newCopyData[copyIndex].inputs.splice(
																		index,
																		1
																	);
																	setCopiesData(newCopyData);
																}}
															>
																&times;
															</span>
														</button>
													</div>
												</div>
											</div>
										))}
										<p className={scss.p_text2}>
											<a
												style={{ color: '#258aff' }}
												href="#"
												onClick={() => handleAddInputOption(copyIndex)}
											>
												Добавить вариант
											</a>
											<div style={{ display: 'flex', gap: '15px' }}>
												<div
													className={scss.copy_icon}
													onClick={() => handleCopy(copyIndex)}
												>
													<IconCopy />
												</div>
												<div
													className={scss.delete_icon}
													onClick={() => handleDelete(copyIndex)}
												>
													<IconDelete />
												</div>
											</div>
										</p>
									</div>
								</div>
							</div>
						</div>
					))}
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

export default CreateTest;
