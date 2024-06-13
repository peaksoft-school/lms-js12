/* eslint-disable @typescript-eslint/no-explicit-any */
import scss from './Rating.module.scss';
import { Preloader } from '@/src/utils/routes/preloader/Preloader';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useGetRatingStudentsQuery } from '@/src/redux/api/instructor/rating';
import { Button, Menu, MenuItem } from '@mui/material';
import { IconCaretDown, IconPlus, IconTrash } from '@tabler/icons-react';
import AddExam from '@/src/ui/InstructorModal/AddExam';
import {
	useDeleteExamMutation,
	useGetExamInstructorQuery
} from '@/src/redux/api/instructor/examApi';

const Rating = () => {
	const { courseId } = useParams();
	const test = Number(courseId);
	const { data: rating, isLoading } = useGetRatingStudentsQuery(test);
	const { data: exam = [] } = useGetExamInstructorQuery(test);
	const [deleteExam] = useDeleteExamMutation();
	const [openModal, setOpenModal] = useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
	const open2 = Boolean(anchorEl2);
	const [deleteExamId, setDeleteExamId] = useState<null | number>(null);
	console.log(deleteExamId);

	if (isLoading) {
		return (
			<div>
				<Preloader />
			</div>
		);
	}

	const handleOpen = () => {
		setOpenModal(true);
		handleClose();
		handleClose2();
	};
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (anchorEl) {
			handleClose();
		} else {
			setAnchorEl(event.currentTarget);
		}
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl2(event.currentTarget);
	};
	const handleClose2 = () => {
		setAnchorEl2(null);
	};

	const deleteFunc = async () => {
		await deleteExam(deleteExamId);
		handleClose();
	};

	const truncateString = (str: any, num: any) => {
		if (!str || str.trim() === '') {
			return '...';
		}
		if (str.length <= num) {
			return str;
		}
		return str.slice(0, num) + '...';
	};

	return (
		<div className={scss.rating}>
			<h1>Студенты</h1>
			<div className={scss.scroll_table}>
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<div className={scss.rating_container}>
						<table>
							<thead>
								<tr>
									<th className={scss.number} rowSpan={2}>
										№
									</th>
									<th className={scss.name} rowSpan={2}>
										Имя Фамилия
									</th>
									{rating?.studentResponses[0]?.lessonRatingResponses.map(
										(lesson) => (
											<th
												style={{
													minWidth: '170px',
													maxWidth: '170px'
												}}
												colSpan={lesson.taskRatingResponses.length}
												key={lesson.id}
											>
												<p>{lesson.title}</p>
											</th>
										)
									)}
									<th
										style={{
											minWidth: '180px',
											maxWidth: '180px'
										}}
										rowSpan={2}
									>
										<div
											style={{
												display: 'flex',
												alignItems: 'center',
												gap: '5px'
											}}
										>
											<p style={{ paddingLeft: '5px' }}>Экзамен</p>
											<Button
												variant="contained"
												size="medium"
												className={scss.button}
												onClick={handleClick}
											>
												<IconCaretDown stroke={2} />
											</Button>
										</div>
										<Menu
											id="positioned-menu"
											anchorEl={anchorEl}
											open={open}
											onClose={handleClose}
											anchorOrigin={{
												vertical: 'bottom',
												horizontal: 'right'
											}}
											transformOrigin={{
												vertical: -4,
												horizontal: 150
											}}
											PaperProps={{
												style: {
													border: 'none'
												}
											}}
										>
											<MenuItem
												style={{ display: 'flex', gap: '10px' }}
												onClick={handleOpen}
											>
												<IconPlus stroke={2} />
												Добавить столбец
											</MenuItem>
										</Menu>
									</th>
									{exam[0].exams.map((item) => (
										<th
											style={{ minWidth: '170px', maxWidth: '170px' }}
											rowSpan={2}
										>
											<div
												style={{
													display: 'flex',
													alignItems: 'center',
													gap: '5px'
												}}
											>
												<p style={{ paddingLeft: '5px', flexWrap: 'wrap' }}>
													{' '}
													{item.examTitle}
												</p>
												<Button
													variant="contained"
													size="small"
													className={scss.button}
													onClick={handleClick2}
												>
													<IconCaretDown stroke={2} />
												</Button>
											</div>
											<Menu
												id="positioned-menu"
												anchorEl={anchorEl2}
												open={open2}
												onClose={handleClose2}
												MenuListProps={{
													'aria-labelledby': 'basic-button'
												}}
												elevation={0}
												anchorOrigin={{
													vertical: 42,
													horizontal: 20
												}}
												transformOrigin={{
													vertical: 10,
													horizontal: 20
												}}
												PaperProps={{
													style: {
														boxShadow: 'none',
														border: '1px solid gray',
														width: '200px',
														height: '90px'
													}
												}}
											>
												<MenuItem
													style={{ display: 'flex', gap: '10px' }}
													onClick={handleOpen}
												>
													<IconPlus stroke={2} />
													Добавить столбец
												</MenuItem>
												<MenuItem
													style={{ display: 'flex', gap: '10px' }}
													onClick={() => {
														deleteFunc();
														setDeleteExamId(exam[0].exams[0].examId);
													}}
												>
													<IconTrash stroke={2} />
													Удалить столбец
												</MenuItem>
											</Menu>
										</th>
									))}
									<th rowSpan={2}>Итого</th>
								</tr>
								<tr>
									{rating?.studentResponses[0]?.lessonRatingResponses.map(
										(lesson) => (
											<>
												{lesson.taskRatingResponses.length === 0 ? (
													<>
														<th>---</th>
													</>
												) : (
													lesson.taskRatingResponses.map((task) => (
														<th
															style={{
																minWidth: '170px',
																maxWidth: '170px'
															}}
															key={task.id}
														>
															{truncateString(task.taskTitle, 7)}
														</th>
													))
												)}
											</>
										)
									)}
								</tr>
							</thead>
							<tbody>
								{rating?.studentResponses.map((item, index) => (
									<tr key={item.id}>
										<td>{index + 1}</td>
										<td className={scss.fullName}>
											<h4>{item.fullName}</h4>
										</td>
										{item.lessonRatingResponses.map((lesson) => (
											<>
												{lesson.taskRatingResponses.length === 0 ? (
													<>
														<td>0</td>
													</>
												) : (
													lesson.taskRatingResponses.map((task) => (
														<td key={task.id}>
															{task.answerTaskRatingResponses?.point ?? 0}
														</td>
													))
												)}
											</>
										))}
										{exam && <td>0</td>}
										{exam[0].exams.map((item) => (
											<td key={item.examId}>{0}</td>
										))}

										{rating?.studentResponses.length > 0 && (
											<td>
												{Math.floor(
													rating.studentResponses[0].completionPercentage
												)}
												%
											</td>
										)}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				<AddExam open={openModal} handleClose={() => setOpenModal(false)} />
			</div>
		</div>
	);
};

export default Rating;
