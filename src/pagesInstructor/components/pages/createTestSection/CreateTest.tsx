import { useState } from 'react';
import { IconCopy } from '@tabler/icons-react';
import { IconDelete } from '@/src/assets/icons';
import { Select } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { usePostTestMutation } from '@/src/redux/api/instructor/test';
import scss from './CreateTest.module.scss';
import Input from '@/src/ui/customInput/Input';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import ButtonSave from '@/src/ui/customButton/ButtonSave';
import ButtonCircle from '@/src/ui/customButton/ButtonCircle';

interface OptionResponse {
	option: string;
	isTrue: boolean;
}

interface QuestionRequest {
	title: string;
	point: string;
	questionType: string;
	optionRequests: OptionResponse[];
}

interface TestRequest {
	title: string;
	hour: string;
	minute: string;
	questionRequests: QuestionRequest[];
}

interface CopyData {
	inputValue3: string;
	inputValue4: string;
	option: string;
	inputs: { value: string; visible: boolean }[];
}

const CreateTest = () => {
	const { control, handleSubmit, reset } = useForm();
	const [option, setOption] = useState('SINGLE');
	const [time, setTime] = useState('00:00');
	const [inputs, setInputs] = useState<
		{ id: number; value: string; visible: boolean }[]
	>([{ id: 1, value: '', visible: true }]);
	const [copiesData, setCopiesData] = useState<CopyData[]>([]);
	const [titleValue, setTitleValue] = useState('');
	const [pointValue, setPointValue] = useState('');
	const [postTest] = usePostTestMutation();
	const { lessonId } = useParams();
	const [checked, setChecked] = useState(false);

	const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setTime(event.target.value);
	const handleChangeTitleValue = (e: React.ChangeEvent<HTMLInputElement>) =>
		setTitleValue(e.target.value);
	const handleChangePointValue = (e: React.ChangeEvent<HTMLInputElement>) =>
		setPointValue(e.target.value);

	const handleAddInput = () =>
		setInputs([...inputs, { id: inputs.length + 1, value: '', visible: true }]);
	const handleOptionClick = (selectedOption: string) =>
		setOption(selectedOption);

	const handleCopy = (copyDataIndex: number) => {
		const newCopyData = JSON.parse(JSON.stringify(copiesData[copyDataIndex])); // Deep copy
		setCopiesData([
			...copiesData.slice(0, copyDataIndex + 1),
			newCopyData,
			...copiesData.slice(copyDataIndex + 1)
		]);
	};

	const handleDelete = (copyDataIndex: number) => {
		setCopiesData(copiesData.filter((_, index) => index !== copyDataIndex));
	};

	const handleCopies = () => {
		const newCopyData = {
			inputValue3: '',
			inputValue4: '',
			inputs: [{ value: '', visible: true }],
			option: 'SINGLE'
		};
		setCopiesData([...copiesData, newCopyData]);
	};

	const handleAddInputOption = (copyDataIndex: number) => {
		const updatedCopiesData = [...copiesData];
		updatedCopiesData[copyDataIndex].inputs.push({ value: '', visible: true });
		setCopiesData(updatedCopiesData);
	};

	const onSubmit = async (data) => {
		const initialAnswers = inputs.map((input) => input.value);
		const initialQuestion: QuestionRequest = {
			title: titleValue,
			point: pointValue,
			questionType: option,
			optionRequests: initialAnswers.map((ans) => ({
				option: ans,
				isTrue: checked
			}))
		};

		const copiedQuestions = copiesData.map((copyData) => {
			const answers = copyData.inputs.map((input) => input.value);
			return {
				title: copyData.inputValue3,
				point: copyData.inputValue4,
				questionType: copyData.option === 'SINGLE' ? 'SINGLE' : 'MULTIPLE',
				optionRequests: answers.map((ans) => ({
					option: ans,
					isTrue: false
				}))
			};
		});

		const questionRequests: QuestionRequest[] = [
			initialQuestion,
			...copiedQuestions
		];

		const newTest: TestRequest = {
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

	const renderInputFields = (inputs, setInputs, option: string) =>
		inputs.map(
			(input, index: number) =>
				input.visible && (
					<div key={index} className={scss.input_div}>
						{option === 'SINGLE' ? (
							<div className={scss.radio_checkbox}>
								
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
										value={input.value}
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
								<button className={scss.button_cancel} type="button">
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
		);

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
								<span>Тип тест</span>
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
									{renderInputFields(inputs, setInputs, option)}
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
												onClick={() => setChecked(!checked)}
												checked={copyData.option === 'SINGLE'}
												onChange={() => {
													const updatedCopiesData = [...copiesData];
													updatedCopiesData[copyIndex].option = 'SINGLE';
													setCopiesData(updatedCopiesData);
												}}
											/>
											Один <span>из списка</span>
										</label>
										<label style={{ display: 'flex', gap: '5px' }}>
											<input
												style={{ cursor: 'pointer' }}
												type="checkbox"
												onClick={() => setChecked(!checked)}
												checked={copyData.option === 'MULTIPLE'}
												onChange={() => {
													const updatedCopiesData = [...copiesData];
													updatedCopiesData[copyIndex].option = 'MULTIPLE';
													setCopiesData(updatedCopiesData);
												}}
											/>
											Несколько <span>из списка</span>
										</label>
									</div>
								</div>
								<div className={scss.div_text2}>
									<div className={scss.components}>
										{renderInputFields(
											copyData.inputs,
											(updatedInputs) => {
												const updatedCopiesData = [...copiesData];
												updatedCopiesData[copyIndex].inputs = updatedInputs;
												setCopiesData(updatedCopiesData);
											},
											copyData.option
										)}
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
					<ButtonCancel
						onClick={() => {}}
						width="100px"
						type={'button'}
						disabled={false}
					>
						Отмена
					</ButtonCancel>
					<ButtonSave
						onClick={() => {}}
						width="30px"
						type="submit"
						disabled={false}
					>
						Сохранить
					</ButtonSave>
				</div>
				<div className={scss.button_circle}>
					<ButtonCircle
						onClick={handleCopies}
						type="button"
						disabled={false}
					></ButtonCircle>
				</div>
			</div>
		</form>
	);
};

export default CreateTest;
