import React, { useState } from 'react';
import Input from '@/src/ui/customInput/Input';
import scss from './Test.module.scss';
import { IconCopy } from '@tabler/icons-react';
import { Button, Dialog, DialogContent, DialogActions } from '@mui/material';
import { IconDelete } from '@/src/assets/icons';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import ButtonSave from '@/src/ui/customButton/ButtonSave';
import ButtonCircle from '@/src/ui/customButton/ButtonCircle';
import { usePostMaterialTestMutation } from '@/src/redux/api/instructor/test';

const Test: React.FC = () => {
	const [option, setOption] = useState('one');
	const [options, setOptions] = useState('one');
	const [hours, setHours] = useState('00');
	const [minutes, setMinutes] = useState('00');
	const [inputs, setInputs] = useState([1]);
	const [inputValue, setInputValue] = useState('');
	const [inputValue1, setInputValue1] = useState('');
	const [inputValue2, setInputValue2] = useState('');
	const [inputValue3, setInputValue3] = useState('');
	const [inputValue4, setInputValue4] = useState('');
	const [copiesData, setCopiesData] = useState([]);
	const [open, setOpen] = useState(false);

	const handleInputChange = (value, index) => {
		const newInputs = [...inputs];
		newInputs[index] = value;
		setInputs(newInputs);
	};

	const handleInputChange3 = (e) => {
		const newValue = e.target.value;
		setInputValue3(newValue);
	};

	const handleInputChange4 = (e) => {
		const newValue = e.target.value;
		setInputValue4(newValue);
	};
	//...2...
	const handleInputUpdate = (value, inputIndex) => {
		const updatedInputs = [...inputs];
		updatedInputs[inputIndex] = value;
		setInputs(updatedInputs);
	};

	const handleCopy = () => {
		const newCopyData = {
			inputValue4: inputValue4,
			inputValue3: inputValue3,
			inputValue5: '',
			inputs,
			option
		};
		setCopiesData([...copiesData, newCopyData]);
	};

	const handleDelete = (copyIndex) => {
		const updatedCopiesData = [...copiesData];
		updatedCopiesData.splice(copyIndex, 1);
		setCopiesData(updatedCopiesData);
	};

	const handleAddInput = () => {
		setInputs([...inputs, inputs.length + 1]);
	};

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleTimeChange = () => {
		handleClose();
	};

	const handleHourChange = (event) => setHours(event.target.value);
	const handleMinuteChange = (event) => setMinutes(event.target.value);

	const [postTest] = usePostMaterialTestMutation();
	const handleSave = async () => {
		try {
			const testData = {
				testName: 'Колдонуучунун аталышы',
				testTime: `${hours}:${minutes}`,
				testType: String,
				testPlacholder: 'setInputValue',
				testPlacholder1: 'setInputValue1',
				testPlacholde2: 'setInputValue2'
			};

			const response = await postTest(testData);
			if (response) {
				console.log('Response:', response);
			} else {
				console.error('Response is undefined or null');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const handleOptionClick = (selectedOption) => {
		setOption(selectedOption);
	};
	const handleOptionClickup = (selectedOption) => {
		setOption(selectedOption);
	};

	const handleCopyy = (copyDataIndex) => {
		const newCopyData = {
			inputValue3: '',
			inputValue4: '',
			inputs: [''],
			option: 'try'
		};
		const updatedCopiesData = [...copiesData];
		updatedCopiesData.splice(copyDataIndex + 1, 0, newCopyData);
		setCopiesData(updatedCopiesData);
	};

	const handleDeletee = (copyDataIndex) => {
		const updatedCopiesData = copiesData.filter(
			(_, index) => index !== copyDataIndex
		);
		setCopiesData(updatedCopiesData);
	};

	const handleCancel = () => {
		setOption('one');
		setHours('00');
		setMinutes('00');
		setInputs([1]);
		setInputValue('');
		setInputValue1('');
		setInputValue2('');
		setInputValue3('');
		setInputValue4('');
		setCopiesData([]);
	};

	const handleCopies = () => {
		const newCopyData = {
			inputValue3: '',
			inputValue4: '',
			inputs: [''],
			option: 'try'
		};
		const updatedCopiesData = [...copiesData];
		updatedCopiesData.push(newCopyData);
		setCopiesData(updatedCopiesData);
	};

	const handleAddInputt = (copyDataIndex) => {
		const updatedCopiesData = [...copiesData];
		updatedCopiesData[copyDataIndex].inputs.push('');
		setCopiesData(updatedCopiesData);
	};

	return (
		<div>
			<h1>material</h1>
			<div className={scss.div_component}>
				<h3 className={scss.text_h3}>Название теста</h3>
				<div className={scss.container}>
					<div className={scss.input_contain}>
						<Input
							type="text"
							placeholder="Введи название теста"
							size="small"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							width={''}
						/>
					</div>
					<div className={scss.input_time}>
						<p className={scss.p_text}>Время прохождения теста </p>
						<div>
							<input
								className={scss.time_inputs}
								type="time"
								value={`${hours}:${minutes}`}
								onClick={handleOpen}
								placeholder="c.m"
							/>

							<Dialog
								open={open}
								onClose={handleClose}
								className={scss.modal_contain}
							>
								<DialogTitle className={scss.title}>
									Установка времени
								</DialogTitle>
								<DialogContent className={scss.vremia_time}>
									<div className={scss.vremia}>
										<input
											className={scss.vremia}
											type="number"
											value={hours}
											onChange={handleHourChange}
											min="0"
											max="23"
											style={{
												width: '70px',
												marginRight: '5px',
												height: '50px'
											}}
										/>
									</div>
									<h1>:</h1>
									<div>
										<input
											className={scss.vremia}
											type="number"
											value={minutes}
											onChange={handleMinuteChange}
											min="0"
											max="59"
											style={{
												width: '70px',
												marginRight: '5px',
												height: '50px'
											}}
										/>
									</div>
								</DialogContent>
								<div className={scss.chas_minuta}>
									<span>Час</span>
									<span>Минута</span>
								</div>
								<DialogActions>
									<Button onClick={handleClose} className={scss.handleClose}>
										Отмена
									</Button>
									<Button onClick={handleTimeChange}>OK</Button>
								</DialogActions>
							</Dialog>
						</div>
						<p>
							Tip testa:{' '}
							<select>
								<option value="" typeof="radio">
									Soft
								</option>
								<option value="">Medium</option>
								<option value="">Hard</option>
							</select>
						</p>
					</div>
				</div>
			</div>
			<div className={scss.div_component2}>
				<div className={scss.input_contain2}>
					<div className={scss.input_texsts}>
						<h2 className={scss.h2_number}>1</h2>
						<Input
							type="text"
							placeholder="Вопрос"
							width="35%"
							size="small"
							value={inputValue1}
							onChange={(e) => setInputValue1(e.target.value)}
						/>
						<Input
							type="text"
							placeholder="Введите кол-во баллов"
							width="25%"
							size="small"
							value={inputValue2}
							onChange={(e) => setInputValue2(e.target.value)}
						/>
						<div className={scss.radio_input}>
							<label>
								<input
									type="radio"
									name="option"
									checked={option === 'one'}
									onChange={() => handleOptionClick('one')}
								/>
								Один из списка
							</label>
							<label>
								<input
									type="radio"
									name="option"
									value="multiple"
									checked={option === 'multiple'}
									onChange={() => handleOptionClick('multiple')}
								/>
								Несколько из списка
							</label>
						</div>
					</div>
					<div className={scss.div_text2}>
						<div className={scss.components}>
							{inputs.map((input, index) => (
								<div key={index} className={scss.input_div}>
									{option === 'one' ? (
										<div className={scss.radio_checkbox}>
											<label>
												<input
													className={scss.checkbox_input}
													type="radio"
													name="option"
												/>
											</label>
										</div>
									) : (
										<div className={scss.radio_checkbox}>
											<label>
												<input
													className={scss.checkbox_input}
													type="checkbox"
													name="option"
												/>
											</label>
										</div>
									)}
									<div className={scss.variant_inputs}>
										<Input
											size="small"
											placeholder={`Вариант  ${index + 1}`}
											type="search"
											value={inputs[index]}
											onChange={(e) => handleInputChange(e.target.value, index)}
											width="100%"
										/>
									</div>
								</div>
							))}
							<p className={scss.p_text2}>
								Добавить вариант
								<h4>ИЛИ </h4>{' '}
								<a href="#" onClick={handleAddInput}>
									Добавить вариант "Другое"
								</a>
								<div className={scss.copy_icon} onClick={handleCopyy}>
									<IconCopy />
								</div>
								<div
									className={scss.delete_icon}
									onClick={() => handleDelete()}
								>
									<IconDelete />
								</div>
							</p>
						</div>
					</div>
				</div>
			</div>

			{copiesData.map((copyData, copyIndex) => (
				<div key={copyIndex} className={scss.div_component2}>
					<div className={scss.input_contain2}>
						<div className={scss.input_texsts}>
							<h2 className={scss.h2_number}>1</h2>
							<Input
								type="text"
								placeholder="Вопрос"
								width="35%"
								size="small"
								value={inputValue3}
								onChange={(e) => {
									setInputValue3(e.target.value);
								}}
							/>
							<Input
								type="text"
								placeholder="Введите кол-во баллов"
								width="25%"
								size="small"
								value={inputValue4}
								onChange={(e) => {
									setInputValue4(e.target.value);
								}}
							/>
							<div className={scss.radio_input}>
								<label>
									<input
										type="radio"
										name="options"
										checked={options === 'one'}
										onChange={() => handleOptionClickup('one')}
									/>
									Один из списка
								</label>
								<label>
									<input
										type="radio"
										name="options"
										value="multiple"
										checked={options === 'multiple'}
										onChange={() => handleOptionClickup('multiple')}
									/>
									Несколько из списка
								</label>
							</div>
						</div>
						<div className={scss.div_text2}>
							<div className={scss.components}>
								{copyData.inputs.map((input, index) => (
									<div key={index} className={scss.input_div}>
										{copyData.option === 'one' ? (
											<div className={scss.radio_checkbox}>
												<label>
													<input
														className={scss.checkbox_input}
														type="radio"
														name={`options${copyIndex}`}
													/>
												</label>
											</div>
										) : (
											<div className={scss.radio_checkbox}>
												<label>
													<input
														className={scss.checkbox_input}
														type="checkbox"
														name={`options${copyIndex}`}
													/>
												</label>
											</div>
										)}
										<div className={scss.variant_inputs}>
											<Input
												size="small"
												placeholder={`Вариант  ${index + 1}`}
												type="search"
												value={input[index]}
												onChange={(e) =>
													handleInputUpdate(e.target.value, inputIndex)
												}
												width="100%"
											/>
										</div>
									</div>
								))}
								<p className={scss.p_text2}>
									Добавить вариант
									<h4>ИЛИ </h4>{' '}
									<a href="#" onClick={() => handleAddInputt(copyIndex)}>
										Добавить вариант "Другое"
									</a>
									<div
										className={scss.copy_icon}
										onClick={() => handleCopyy(copyIndex)}
									>
										<IconCopy />
									</div>
									<div
										className={scss.delete_icon}
										onClick={() => handleDeletee(copyIndex)}
									>
										<IconDelete />
									</div>
								</p>
							</div>
						</div>
					</div>
				</div>
			))}
			<div className={scss.button_contain}>
				<ButtonCancel
					width="100px"
					onClick={handleCancel}
					type={'button'}
					disabled={false}
				>
					Отмена
				</ButtonCancel>
				<ButtonSave
					width="30px"
					onClick={handleSave}
					type={'button'}
					disabled={false}
				>
					Сохранить
				</ButtonSave>
			</div>
			<div className={scss.button_circle}>
				<ButtonCircle
					onClick={handleCopies}
					type={'button'}
					disabled={false}
				></ButtonCircle>
			</div>
		</div>
	);
};

export default Test;
