/* eslint-disable @typescript-eslint/no-explicit-any */
import scss from './Rating.module.scss';
import { Link, useParams } from 'react-router-dom';
import {
	useGetRatingStudentsForStudentQuery,
	useGetYourRatingStudentQuery
} from '@/src/redux/api/students/examApi-student';
import React from 'react';
import { useGetExamInstructorQuery } from '@/src/redux/api/instructor/examApi';

const Rating: React.FC = () => {
	const { coursesId } = useParams<{ coursesId: string }>();
	const test = Number(coursesId);
	const { data: students } = useGetRatingStudentsForStudentQuery(test);
	const { data } = useGetYourRatingStudentQuery(test);
	const { data: exam = [] } = useGetExamInstructorQuery(test);
	console.log(exam, 'sanjar');

	const truncateString = (str: string, num: number) => {
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
			<div>
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<div className={scss.rating_container}>
						<table className={scss.Table}>
							<thead>
								<tr>
									<th className={scss.number} rowSpan={2}>
										№
									</th>
									<th className={scss.name} rowSpan={2}>
										Имя Фамилия
									</th>
									{data?.lessonRatingResponses.map((lesson) => (
										<th
											style={{ minWidth: '170px', maxWidth: '170px' }}
											colSpan={lesson.taskRatingResponses.length}
											key={lesson.id}
										>
											<p>{lesson.title}</p>
										</th>
									))}
									{/* //! this place map exama */}

									{/* //! 1 variant */}
									{/* {exam[0].exams.map((item, index) => (
										<th key={index} rowSpan={2}>
											<p>{item.examTitle}</p>
										</th>
									))} */}

									{/* //! 2 variant */}
									{exam.map((el) =>
										el.exams.map((item) => (
											<>
												<th key={item.examId}>{item.examTitle}</th>
											</>
										))
									)}

									{/* //! this place map exama */}
									<th rowSpan={2}>Экзамен </th>
									<th rowSpan={2}>Итого </th>
								</tr>
								<tr>
									{data?.lessonRatingResponses.map((lesson) => (
										<React.Fragment key={lesson.id}>
											{lesson.taskRatingResponses.length === 0 ? (
												<th>---</th>
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
										</React.Fragment>
									))}
								</tr>
							</thead>
							<tbody>
								{data && (
									<tr key={data.id} className={scss.TableContainerSecond}>
										<td className={scss.number}>1</td>
										<td>{data.fullName}</td>
										{data.lessonRatingResponses.map((lesson) => (
											<React.Fragment key={lesson.id}>
												{lesson.taskRatingResponses.length === 0 ? (
													<td>---</td>
												) : (
													lesson.taskRatingResponses.map((task) => (
														<td key={task.id}>
															{task.answerTaskRatingResponses ? (
																<Link to={``}>
																	{task.answerTaskRatingResponses.point}
																</Link>
															) : (
																'0'
															)}
														</td>
													))
												)}
											</React.Fragment>
										))}
										<td>{data.totalScore | data.completionPercentage}</td>
										<td>{data.totalScore | data.completionPercentage} %</td>
									</tr>
								)}
							</tbody>
						</table>
						<div>
							<table className={scss.Table}>
								<thead>
									<tr>
										<th
											style={{
												textAlign: 'center',
												width: '3.1%',
												height: '40px'
											}}
										>
											ID
										</th>
										<th
											style={{
												textAlign: 'start',
												height: '40px',
												paddingLeft: '10px'
											}}
										>
											Имя Фамилия
										</th>
										<th
											style={{
												textAlign: 'center',
												width: '8.4%',
												height: '40px'
											}}
										>
											Всего
										</th>
									</tr>
								</thead>
								<tbody>
									{students?.studentsRatingResponseList.map((item, index) => (
										<>
											<tr key={item.id} className={scss.TableContainerSecond}>
												<td
													className={scss.rating}
													style={
														index % 2
															? {
																	textAlign: 'center',
																	background: '#eff0f4',
																	height: '40px'
																}
															: { textAlign: 'center' }
													}
												>
													{index + 1}
												</td>
												<td
													style={
														index % 2
															? {
																	textAlign: 'start',
																	background: '#eff0f4',
																	height: '40px'
																}
															: { textAlign: 'start' }
													}
												>
													{item.fullName}
												</td>
												<td
													style={
														index % 2
															? {
																	textAlign: 'center',
																	background: '#eff0f4',
																	height: '40px'
																}
															: { textAlign: 'center' }
													}
												>
													{item.completionPercentage}
												</td>
											</tr>
										</>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Rating;
