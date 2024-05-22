import { useState } from 'react';
import { Radio, Checkbox } from '@mui/material';
import { green, red } from '@mui/material/colors';
import scss from './GetTestInstructor.module.scss';
import ButtonSave from '@/src/ui/customButton/ButtonSave';
import { IconClockHour3 } from '@tabler/icons-react';

interface Option {
	id: number;
	text: string;
	isCorrect: boolean;
	isChecked: boolean;
}

interface Question {
	id: number;
	text: string;
	options: Option[];
}

const GetTestInstructor = () => {
	const [questions, setQuestions] = useState<Question[]>([
		{
			id: 1,
			text: 'Какого типа данных нет в java?',
			options: [
				{ id: 1, text: 'int', isCorrect: true, isChecked: false },
				{ id: 2, text: 'float', isCorrect: true, isChecked: false },
				{ id: 3, text: 'double', isCorrect: false, isChecked: false },
				{ id: 4, text: 'bubble', isCorrect: false, isChecked: false }
			]
		},
		{
			id: 2,
			text: 'Какого типа данных нет в java?',
			options: [
				{ id: 5, text: 'int', isCorrect: true, isChecked: false },
				{ id: 6, text: 'float', isCorrect: true, isChecked: false },
				{ id: 7, text: 'double', isCorrect: true, isChecked: false },
				{ id: 8, text: 'bubble', isCorrect: true, isChecked: false }
			]
		},
		{
			id: 3,
			text: 'Какого типа данных нет в java?',
			options: [
				{ id: 9, text: 'int', isCorrect: false, isChecked: false },
				{ id: 10, text: 'float', isCorrect: false, isChecked: false },
				{ id: 11, text: 'double', isCorrect: true, isChecked: false },
				{ id: 12, text: 'bubble', isCorrect: true, isChecked: false }
			]
		},
		{
			id: 4,
			text: 'Какого типа данных нет в java?',
			options: [
				{ id: 13, text: 'int', isCorrect: false, isChecked: false },
				{ id: 14, text: 'float', isCorrect: false, isChecked: false },
				{ id: 15, text: 'double', isCorrect: true, isChecked: false },
				{ id: 16, text: 'bubble', isCorrect: false, isChecked: false }
			]
		}
	]);

	const handleCheckboxChange = (questionId: number, optionId: number) => {
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
		<div className={scss.Main_div}>
			<h2 className={scss.material_get_test}>Материалы</h2>
			<div className={scss.head_container}>
				<div className={scss.get_test_name_test}>
					<div>
						<h3 className={scss.get_test_name}>Название теста</h3>
					</div>
					<div className={scss.get_test_times_container}>
						<p className={scss.get_test_time}>
							Время для прохождения теста: 1 ч. 20 м.
						</p>
						<IconClockHour3 stroke={2} />
					</div>
				</div>
			</div>
			<div className={scss.testing_container}>
				{questions.map((question) => (
					<div key={question.id} className={scss.question}>
						<div className={scss.get_test_testing_second_container}>
							<h4>{question.id}.</h4>
							<h4>{question.text}</h4>
						</div>
						{question.options.map((option) => (
							<div key={option.id} className={scss.option}>
								{question.options.filter((opt) => opt.isCorrect).length ===
								2 ? (
									<Checkbox
										checked={option.isChecked}
										onChange={() =>
											handleCheckboxChange(question.id, option.id)
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
										checked={option.isChecked}
										onChange={() =>
											handleCheckboxChange(question.id, option.id)
										}
										sx={{
											color: option.isCorrect ? green[600] : red[800],
											'&.Mui-checked': {
												color: option.isCorrect ? green[600] : red[600]
											}
										}}
									/>
								)}
								<label>{option.text}</label>
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
							console.log('Отправить');
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default GetTestInstructor;
