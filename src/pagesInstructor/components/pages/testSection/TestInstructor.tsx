/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import scss from './TestInstructor.module.scss';
import { useNavigate } from 'react-router-dom';
import editIcon from '@/src/assets/svgs/edit.svg';
import deleteIcon from '../../../../assets/svgs/delete-red.svg';
import { IconDotsVertical, IconPlus } from '@tabler/icons-react';
import { Button, Menu, MenuItem } from '@mui/material';

interface Question {
	id: string;
	number: string;
	text: string;
	time: string;
}

const TestInstructor = () => {
	const navigate = useNavigate();
	const [questions, setQuestions] = useState<Question[]>([
		{
			id: '1',
			number: '№',
			text: 'Название теста 1',
			time: '40'
		},
		{
			id: '2',
			number: '№',
			text: 'Название теста 2',
			time: '40'
		},
		{
			id: '2',
			number: '№',
			text: 'Название теста 2',
			time: '40'
		},
		{
			id: '2',
			number: '№',
			text: 'Название теста 2',
			time: '40'
		},
		{
			id: '2',
			number: '№',
			text: 'Название теста 2',
			time: '40'
		},
		{
			id: '2',
			number: '№',
			text: 'Название теста 2',
			time: '40'
		},
		{
			id: '2',
			number: '№',
			text: 'Название теста 2',
			time: '40'
		},
		{
			id: '2',
			number: '№',
			text: 'Название теста 2',
			time: '40'
		},
		{
			id: '2',
			number: '№',
			text: 'Название теста 2',
			time: '40'
		},
		{
			id: '2',
			number: '№',
			text: 'Название теста 2',
			time: '40'
		},
		{
			id: '2',
			number: '№',
			text: 'Название теста 2',
			time: '40'
		},
		{
			id: '2',
			number: '№',
			text: 'Название теста 2',
			time: '40'
		},
		{
			id: '2',
			number: '№',
			text: 'Название теста 2',
			time: '40'
		},
		{
			id: '2',
			number: '№',
			text: 'Название теста 2',
			time: '40'
		},
		{
			id: '2',
			number: '№',
			text: 'Название теста 2',
			time: '40'
		},
		{
			id: '2',
			number: '№',
			text: 'Название теста 2',
			time: '40'
		}
	]);

	const id = localStorage.getItem('id');
	const lessonId = localStorage.getItem('lessonId');

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
		null
	);
	const open = Boolean(anchorEl);

	const handleClick = (
		event: React.MouseEvent<HTMLButtonElement>,
		question: Question
	) => {
		setAnchorEl(event.currentTarget);
		setSelectedQuestion(question);
	};

	const handleClose = () => {
		setAnchorEl(null);
		setSelectedQuestion(null);
	};

	const handleEdit = () => {
		if (selectedQuestion) {
			console.log('Редактировать', selectedQuestion);
		}
		handleClose();
	};

	const handleDelete = () => {
		if (selectedQuestion) {
			console.log('Удалить', selectedQuestion);
			setQuestions(questions.filter((q) => q.id !== selectedQuestion.id));
		}
		handleClose();
	};

	return (
		<div className={scss.test_container}>
			<div className={scss.buttons}>
				<Button size="large" className={scss.button} variant="contained">
					<div className={scss.icon}>
						<IconPlus stroke={2} />
					</div>
					<span>Добавить тест</span>
				</Button>
			</div>
			<div className={scss.container}>
				{questions.map((question) => (
					<div className={scss.test_container_second} key={question.number}>
						<div className={scss.test_container_fifth}>
							<div className={scss.test_cont}>
								<div
									className={scss.test_container_third}
									onClick={() =>
										navigate(
											`/instructor/course/${id}/materials/${lessonId}/showTest`
										)
									}
								>
									<h4>{question.number}</h4>
									<h4 className={scss.test_text}>{question.text}</h4>
								</div>
								<div>
									<button
										onClick={(event) => handleClick(event, question)}
										className={scss.button}
										aria-controls="positioned-menu"
										aria-haspopup="true"
									>
										<IconDotsVertical stroke={2} />
									</button>
								</div>
							</div>
							<div className={scss.test_container_forth}>
								<p className={scss.text_time}>Время: {question.time} минут</p>
							</div>
						</div>
					</div>
				))}
				<div className={scss.test_buttons_container}></div>
			</div>
			<Menu
				anchorEl={anchorEl}
				id="positioned-menu"
				open={open}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right'
				}}
				PaperProps={{
					style: { boxShadow: 'none', border: '1px solid gray' }
				}}
			>
				<MenuItem style={{ display: 'flex', gap: '10px' }} onClick={handleEdit}>
					<img src={editIcon} alt="Edit" />
					<p>Редактировать</p>
				</MenuItem>
				<MenuItem
					style={{ display: 'flex', gap: '10px' }}
					onClick={handleDelete}
				>
					<img src={deleteIcon} alt="Delete" />
					<p>Удалить</p>
				</MenuItem>
			</Menu>
		</div>
	);
};

export default TestInstructor;
