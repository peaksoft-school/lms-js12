import { useGetStudentTableQuery } from '@/src/redux/api/admin/student';
import scss from './Rating.module.scss';
import { Preloader } from '@/src/ui/preloader/Preloader';
import { Link, useParams } from 'react-router-dom';
import { InputBase } from '@mui/material';
import { ScrollArea, Box } from '@mantine/core';
import { useGetTaskInstructorQuery } from '@/src/redux/api/instructor/addTask';
import { useGetMaterialsQuery } from '@/src/redux/api/instructor/materials';

const Rating = () => {
	const { data: strudents = [], isLoading } = useGetStudentTableQuery();
	const { data } = useGetMaterialsQuery();
	const { data: task = [] } = useGetTaskInstructorQuery();
	const { courseId } = useParams();

	if (isLoading) {
		return (
			<div>
				<Preloader />
			</div>
		);
	}


	const truncateText = (text: string, maxLength: number) => {
		if (text.length > maxLength) {
			return text.substring(0, maxLength) + '...';
		}
		return text;
	};

	return (
		<div className={scss.rating}>
			<h1>Студенты</h1>
			<div>
				<ScrollArea type="always" scrollbars="xy" offsetScrollbars>
					<Box>
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

											{data?.map((item) => (
												<>
													<th key={item._id} className={scss.lesson}>
														{item.title}
													</th>
												</>
											))}
											<th rowSpan={2}>Экзамен</th>

											<th rowSpan={2}>Итого</th>
										</tr>
										<tr>
											{task?.map((item) => (
												<>
													<th key={item._id} className={scss.lesson}>
														{truncateText(item.title, 10)}
													</th>
												</>
											))}
										</tr>
									</thead>
									<tbody>
										<tr className={scss.TableContainerSecond}>
											<td className={scss.number}>1</td>
											<td className={scss.TableCell}>Ракатова Нурайым</td>
											{data?.map((item) => (
												<td key={item._id}>
													<Link to={`/courses/${courseId}/rating`}>0</Link>
												</td>
											))}
											<td>
												<InputBase defaultValue={0} />
											</td>
											<td>{Math.floor((100 * 9) / data!.length)} %</td>
										</tr>
									</tbody>
								</table>
								<table className={scss.Table}>
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
											paddingTop: '10px',
											height: '40px'
										}}
									>
										{' '}
										Имя Фамилия
									</th>
									<th
										style={{
											textAlign: 'center',
											width: '4.2%',
											height: '40px'
										}}
									>
										Всего
									</th>
									{data &&
										strudents.map((item, index) => (
											<tr key={item.id} className={scss.TableContainerSecond}>
												<td
													className={scss.rating}
													style={
														index % 2
															? {
																	textAlign: 'start',
																	background: '#eff0f4',
																	height: '40px'
																}
															: {
																	textAlign: 'start'
																}
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
															: {
																	textAlign: 'start'
																}
													}
												>
													{item.firstName} {item.lastName}
												</td>
												<td
													style={
														index % 2
															? {
																	textAlign: 'end',
																	background: '#eff0f4',
																	height: '40px'
																}
															: {
																	textAlign: 'end'
																}
													}
												>
													{Math.floor((100 * 9) / data.length)} %
												</td>
											</tr>
										))}
								</table>
							</div>
						</div>
					</Box>
				</ScrollArea>
			</div>
		</div>
	);
};

export default Rating;
