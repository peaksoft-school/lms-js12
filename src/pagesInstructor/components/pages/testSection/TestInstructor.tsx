/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	useDeleteTestMutation,
	useGetTestQuery
} from '@/src/redux/api/instructor/test';
import { useState } from 'react';
import scss from './TestInstructor.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import editIcon from '@/src/assets/svgs/edit.svg';
import deleteIcon from '../../../../assets/svgs/delete-red.svg';
import { IconDotsVertical, IconPlus } from '@tabler/icons-react';
import { Button, Menu, MenuItem } from '@mui/material';
import watch from '@/src/assets/watch.png';
import DeleteTest from '@/src/ui/customModal/deleteModal/DeleteTest';

interface Question {
	id: string;
	number: string;
	text: string;
	time: string;
}

const TestInstructor = () => {
	const navigate = useNavigate();
	const { courseId, lessonId, testId } = useParams();
	const { data } = useGetTestQuery(lessonId);
	const [deleteTest, setOpenDeleteTest] = useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
		null
	);
	const [saveId, setSaveId] = useState(false);
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
		navigate(
			`/instructor/course/${courseId}/materials/${lessonId}/${testId}/editTest`
		);
	};

	const OpenCreateTest = () => {
		navigate(`/instructor/course/${courseId}/materials/${lessonId}/createTest`);
	};

	const truncateText = (text, maxLength) => {
		if (text.length <= maxLength) {
			return text;
		}
		return text.substring(0, maxLength) + '...';
	};
	const handleOpenWatch = () => {
		navigate(
			`/instructor/course/${courseId}/materials/${lessonId}/${saveId}/showTest`
		);
	};
	console.log(saveId);

	return (
		<div className={scss.test_container}>
			<div className={scss.buttons}>
				<Button
					size="large"
					className={scss.button}
					variant="contained"
					onClick={OpenCreateTest}
				>
					<div className={scss.icon}>
						<IconPlus stroke={2} />
					</div>
					<span>Добавить тест</span>
				</Button>
			</div>
			<div className={scss.container}>
				{data?.testResponseForGetAll.map((question) => (
					<div className={scss.test_container_second} key={question.testId}>
						<div className={scss.test_container_fifth}>
							<div className={scss.test_cont}>
								<div
									className={scss.test_container_third}
									onClick={() => {
										setSaveId(question.testId);
										setTimeout(() => {
											navigate(
												`/instructor/course/${courseId}/materials/${lessonId}/${question.testId}/showTest`
											);
										}, 500);
									}}
								>
									<div style={{ display: 'flex', gap: '10px' }}>
										<h4>{question.testId}</h4>
										<h4 className={scss.test_text}>
											{truncateText(question.title, 40)}
										</h4>
									</div>
									<div className={scss.test_container_forth}>
										<p className={scss.text_time}>
											Время: {question.hour}ч.{question.minute} минут
										</p>
									</div>
								</div>
							</div>
							<div>
								<button
									onClick={(event) => {
										handleClick(event, data.testResponseForGetAll);
										setSaveId(question.testId);
									}}
									className={scss.button}
									aria-controls="positioned-menu"
									aria-haspopup="true"
								>
									<IconDotsVertical stroke={2} />
								</button>
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
				<MenuItem
					style={{ display: 'flex', gap: '10px' }}
					onClick={handleOpenWatch}
				>
					<img src={watch} alt="Delete" />
					<p>Просмотреть тест</p>
				</MenuItem>
				<MenuItem style={{ display: 'flex', gap: '10px' }} onClick={handleEdit}>
					<img src={editIcon} alt="Edit" />
					<p>Редактировать</p>
				</MenuItem>
				<MenuItem
					style={{ display: 'flex', gap: '10px' }}
					onClick={() => {
						setOpenDeleteTest(true);
						handleClose();
					}}
				>
					<img src={deleteIcon} alt="Delete" />
					<p>Удалить</p>
				</MenuItem>
			</Menu>

			<DeleteTest
				openModalDelete={deleteTest}
				closeModalDelete={() => setOpenDeleteTest(false)}
				deleteById={saveId}
			/>
		</div>
	);
};

export default TestInstructor;
