import scss from './Rating.module.scss';
import { Preloader } from '@/src/utils/routes/preloader/Preloader';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import AddExam from '@/src/ui/InstructorModal/AddExam';
import { useGetRatingStudentsQuery } from '@/src/redux/api/instructor/rating';

const Rating = () => {
	const [openModal, setOpenModal] = useState(false);
	const { courseId } = useParams();
	const test = Number(courseId);
	const { data, isLoading } = useGetRatingStudentsQuery(test);

	if (isLoading) {
		return (
			<div>
				<Preloader />
			</div>
		);
	}

	const truncateString = (str, num) => {
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
									{data?.studentResponses[0]?.lessonRatingResponses.map(
										(lesson) => (
											<th
												style={{
													minWidth: '20rem',
													maxWidth: '20rem'
												}}
												colSpan={lesson.taskRatingResponses.length}
												key={lesson.id}
											>
												<p>{lesson.title}</p>
											</th>
										)
									)}
								</tr>
								<tr>
									{data?.studentResponses[0]?.lessonRatingResponses.map(
										(lesson) => (
											<>
												{lesson.taskRatingResponses.map((task) => (
													<th key={task.id}>
														{truncateString(task.taskTitle, 10)}
													</th>
												))}
											</>
										)
									)}
								</tr>
							</thead>
							<tbody>
								{data?.studentResponses.map((item, index) => (
									<tr key={item.id}>
										<td>{index + 1}</td>
										<td className={scss.fullName}>
											<h4>{item.fullName}</h4>
										</td>
										{data?.studentResponses.map((item) => (
											<td key={item.id}>
												<p

												// to={`/instructor/course/${courseId}/materials`}
												>
													{item.lessonRatingResponses.map((item) => (
														<>
															{item?.taskRatingResponses?.map((el) => (
																<tr key={el.answerTaskRatingResponses?.id}>
																	{el.answerTaskRatingResponses?.point}
																</tr>
															))}
														</>
													))}
												</p>
											</td>
										))}
										{/* <td>
													<InputBase defaultValue={0} />
												</td> */}

										{/* {data?.studentResponses.map(() => (
													<td>
														<InputBase defaultValue={0} />
													</td>
												))}
												<td>{Math.floor((100 * 9) / data.length)} %</td> */}
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
