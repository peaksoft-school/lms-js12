import React, { useState } from 'react';
import scss from './Material.module.scss';
import { IconCopy } from '@tabler/icons-react';
import { IconDelete } from '@/src/assets/icons';
import Input from 'path/to/Input';

const Copy = () => {
	const [inputValue1, setInputValue1] = useState('');
	const [inputValue2, setInputValue2] = useState('');
	const [inputValue3, setInputValue3] = useState('');
	const [isCopied, setIsCopied] = useState(true);
	const [option, setOption] = useState('one');
	const handleCopy = () => {
		try {
			const textToCopy = `${inputValue1} ${inputValue2} ${inputValue3}`;

			const tempInput = document.createElement('textarea');
			tempInput.value = textToCopy;
			tempInput.style.position = 'absolute';
			tempInput.style.left = '-9999px';
			document.body.appendChild(tempInput);
			tempInput.select();
			document.execCommand('copy');

			document.body.removeChild(tempInput);

			setIsCopied(true);
			console.log('Text copied:', textToCopy);
		} catch (error) {
			console.error('Ошибка копирования: ', error);
		}
	};
	function handleAddInput(
		event: MouseEvent<HTMLAnchorElement, MouseEvent>
	): void {
		throw new Error('Function not implemented.');
	}

	function handleCopy(): void {
		throw new Error('Function not implemented.');
	}

	function handleInputChange(value: any, index: any) {
		throw new Error('Function not implemented.');
	}

	function handleOptionClick(arg0: string): void {
		throw new Error('Function not implemented.');
	}

	function handleDelete(index: any): void {
		throw new Error('Function not implemented.');
	}

	return (
		<div>
			{isCopied && (
				<div className={scss.div_component2}>
					<div className={scss.input_contain2}>
						<div className={scss.input_text2}>
							<h2 className={scss.h2_number}>1</h2>
							<Input
								type="text"
								placeholder="Вопрос"
								width="35%"
								size="small"
								value={inputValue1}
								onChange={(e: {
									target: { value: React.SetStateAction<string> };
								}) => setInputValue1(e.target.value)}
							/>
							<Input
								type="text"
								placeholder="Введите кол-во баллов"
								width="25%"
								size="small"
								value={inputValue2}
								onChange={(e: {
									target: { value: React.SetStateAction<string> };
								}) => setInputValue2(e.target.value)}
							/>
							<div className={scss.radio_input}>
								<label>
									<input
										type="radio"
										name="option"
										// value="one"
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
								{Input.map(
									(
										input: { [x: string]: any },
										index: React.Key | null | undefined
									) => (
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
													value={input[index]}
													onChange={(e: { target: { value: never } }) =>
														handleInputChange(e.target.value, index)
													}
													width="100%"
												/>
											</div>
										</div>
									)
								)}
								<p className={scss.p_text2}>
									Добавить вариант
									<h4>ИЛИ </h4>{' '}
									<a href="#" onClick={handleAddInput}>
										Добавить вариант "Другое"
									</a>
									<div
										className={scss.copy_delete_icon}
										onClick={() => handleCopy()}
									>
										<IconCopy />
									</div>
									<div onClick={() => handleDelete(index)}>
										<IconDelete />
									</div>
								</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Copy;
