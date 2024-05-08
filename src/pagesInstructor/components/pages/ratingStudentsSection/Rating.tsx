import { useGetStudentTableQuery } from '@/src/redux/api/admin/student';
import scss from './Rating.module.scss';
import { Preloader } from '@/src/ui/preloader/Preloader';
import { useGetLessonQuery } from '@/src/redux/api/lesson';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Rating = () => {
	const { data: strudents = [], isLoading } = useGetStudentTableQuery();
	const { data } = useGetLessonQuery();
	// const naviagete = useNavigate();
	const [raiting, setRaiting] = useState(0);

	if (isLoading) {
		return (
			<div>
				<Preloader />
			</div>
		);
	}

	const id = localStorage.getItem('id');

	return (
		<div className={scss.rating}>
			<h1>Студенты</h1>
			<div
				style={{
					height: '577px',
					background: '#eff0f4'
				}}
			>
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
									<th rowSpan={2}>Итого</th>
								</tr>
								<tr>
									{data?.map((item) => (
										<>
											<th key={item._id} className={scss.lesson}>
												{item.title}
											</th>
										</>
									))}
								</tr>
							</thead>
							<tbody>
								{data &&
									strudents.map((item, index) => (
										<tr key={item.id} className={scss.TableContainerSecond}>
											<td className={scss.number}>{index + 1}</td>
											<td className={scss.TableCell}>
												{item.firstName} {item.lastName}
											</td>
											{data?.map((item) => (
												<td key={item._id}>
													<Link to={`/instructor/course/${id}/materials`}>
														{raiting}
													</Link>
												</td>
											))}
											<td>{(100 * 9) / data.length} %</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Rating;
