import { useGetStudentTableQuery } from '@/src/redux/api/admin/student';
import scss from './Rating.module.scss';
import { Preloader } from '@/src/ui/preloader/Preloader';

const Rating = () => {
	const { data, isLoading } = useGetStudentTableQuery();

	if (isLoading) {
		return (
			<div>
				<Preloader />
			</div>
		);
	}

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
									<th>№</th>
									<th>Имя Фамилия</th>
								</tr>
							</thead>
							<tbody>
								{data &&
									data.map((item) => (
										<tr key={item.id} className={scss.TableContainerSecond}>
											<td className={scss.TableCell}>
												{item.firstName} {item.lastName}
											</td>
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

