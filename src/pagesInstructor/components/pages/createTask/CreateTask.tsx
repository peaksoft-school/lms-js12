import React, { useState } from 'react';
import Input from '@/src/ui/customInput/Input';
import scss from './CreateTest.module.scss';
import { IconCopy } from '@tabler/icons-react';
import { IconDelete } from '@/src/assets/icons';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import ButtonSave from '@/src/ui/customButton/ButtonSave';
import ButtonCircle from '@/src/ui/customButton/ButtonCircle';
import { Select } from '@mantine/core';
// import { usePostTestMutation } from '@/src/redux/api/instructor/test';
import { Controller, useForm } from 'react-hook-form';

interface CopyData {
	inputValue3: string;
	inputValue4: string;
	inputs: string[];
	options: string;
}

const Test = () => {
	const { control, handleSubmit, reset } = useForm();
	const [option, setOption] = useState('one');
	const [options, setOptions] = useState('one');
	const [time, setTime] = useState('00:00');
	const [inputs, setInputs] = useState([{ id: 1, value: '', visible: true }]);
	const [copiesData, setCopiesData] = useState<CopyData[]>([]);
	const [titleValue, setTitleValiue] = useState<string>('');
	const [pointValue, setPointValue] = useState<string>('');
	const [optionValue, setOptionValue] = useState<any>('');
	// const [postTest] = usePostTestMutation();

	// ! post submit
	const onSubmit = async (data) => {
		const { title, hour, minute } = data;

		console.log(data);

		// const postData = {
		//   title: data.title,
		//   hour: time.split(':')[0],4
		//   minute: time.split(':')[1],
		//   questionType: option,
		//   questionRequests: [
		//     ...inputs.map((input) => ({
		//       title: data[question_${input.id}_title],
		//       point: data[question_${input.id}_point],
		//       optionRequests: inputs.map((input, idx) => ({
		//         option: option.trim(),
		//         isTrue: data[option_${input.id}_isTrue_${idx}]  false
		//       }))
		//     }))
		//     // ...copiesData.map((copyData, copyIndex) => ({
		//     //   title: data[`copy_${copyIndex}_title`],
		//     //   point: data[`copy_${copyIndex}_point`],
		//     //   questionType: copyData.options,
		//     //   optionRequests: copyData.inputs.map((_, idx) => ({
		//     //     option: data[`copy_${copyIndex}_option_${idx}`],
		//     //     isTrue: data[`copy_${copyIndex}_isTrue_${idx}`]  false
		//     //   }))
		//     // }))option
		//   ]
		// };

		let answer = inputs.forEach((el) => {
			return el.value;
		});
		const newData = {
			title: title,
			hour: time,
			minute: time,
			questionRequests: [
				{
					title: titleValue,
					point: pointValue,
					questionType: option,
					optionRequests: [
						{
							option: answer,
							isTrue: false
						}
					]
				}
			]
		};
		await postTest({ newData, id: 1 });
		console.log(newData, 'newData');

		reset();
	};

	const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setTime(value);
		console.log(value);
	};
	const handleChangeTitleValueFunk = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setTitleValiue(e.target.value);
	};
	const handleChangesetPointValueFunk = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
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
			options: 'one'
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
			options: 'one'
		};
		const updatedCopiesData = [...copiesData];
		updatedCopiesData.push(newCopyData);
		setCopiesData(updatedCopiesData);
	};

	const handleAddInputOption = (copyDataIndex: number) => {
		const updatedCopiesData = [...copiesData];
		updatedCopiesData[copyDataIndex].inputs.push('');
		setCopiesData(updatedCopiesData);
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={scss.test}>
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

							<p
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '10px'
								}}
							>
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
				<div>
					<div className={scss.div_component2}>
						<div className={scss.input_contain2}>
							<div className={scss.input_text}>
								<h2 className={scss.h2_number}>1</h2>
								<Controller
									name="title"
									control={control}
									render={({ field }) => (
										<Input
											type="text"
											placeholder="Вопрос"
											width="100%"
											size="small"
											{...field}
											value={titleValue}
											onChange={handleChangeTitleValueFunk}
										/>
									)}
								/>
								<Controller
									name="point"
									control={control}
									render={({ field }) => (
										<Input
											type="number"
											placeholder="Введите кол-во баллов"
											width="100%"
											size="small"
											{...field}
											onChange={handleChangesetPointValueFunk}
											value={pointValue}
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
									{inputs.map((input, index) =>
										input.visible ? (
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
														name="optionV"
														control={control}
														render={({ field }) => (
															<Input
																{...field}
																size="small"
																placeholder={`Вариант  ${index + 1}`}
																type="text"
																value={inputs[index].value}
																// value={optionValue}
																onChange={(e) => {
																	const newInputs = [...inputs];
																	newInputs[index].value = e.target.value;
																	setInputs(newInputs);
																	inputs.forEach((el) => {
																		return setOptionValue(el.value);
																	});
																}}
																// onChange={(e) => setOptionValue(e.target.value)}
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
										) : null
									)}
									<p className={scss.p_text2}>
										<a
											style={{ color: '#258aff' }}
											href="#"
											onClick={handleAddInput}
										>
											Добавить вариант
										</a>
										<div
											style={{
												display: 'flex',
												gap: '15px'
											}}
										>
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

					{/* //! */}
					{copiesData.map((copyData, copyIndex) => (
						<div key={copyIndex} className={scss.div_component2}>
							<div className={scss.input_contain2}>
								<div className={scss.input_text}>
									<h2 className={scss.h2_number}>{copyIndex + 2}</h2>
									<Controller
										name="optionV"
										control={control}
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
										name="point"
										control={control}
										render={({ field }) => (
											<Input
												type="text"
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
																placeholder={`Вариант  ${index + 1}`}
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
										</p>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
				<div className={scss.button_contain}>
					<ButtonCancel
						width="100px"
						onClick={() => {}}
						type={'button'}
						disabled={false}
					>
						Отмена
					</ButtonCancel>
					<ButtonSave
						// onClick={handleSubmit(onSubmit)}
						width="30px"
						type="submit"
						disabled={false}
					>
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

export default Test;
