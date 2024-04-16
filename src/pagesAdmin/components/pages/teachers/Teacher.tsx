import { FC } from 'react';
import scss from './Teachers.module.scss';
import { useGetTableQuery } from '@/src/redux/api/teacher';
import { IconDotsVertical } from '@tabler/icons-react';

const Table: FC = () => {
	const { data, isLoading } = useGetTableQuery();

	if (isLoading) {
		return <div>...Loading</div>;
	}

	return (
		<div className={scss.TableContainer}>
			<table className={scss.Table}>
				<thead>
					<tr>
						<th className={scss.TableTh}>N</th>
						<th>Имя Фамилия</th>
						<th>Специализация</th>
						<th>Номер телефона</th>
						<th>E-mail</th>
						<th>Действия</th>
					</tr>
				</thead>
				<tbody>
					{data &&
						data.map((card, index) => (
							<tr
								key={card.id}
								className={`${scss.TableContainerSecond} ${
									index % 2 === 1 ? scss.TableAlternateRow : ''
								}`}
							>
								<td className={scss.TableCell}>{card._id}</td>
								<td className={scss.TableCell}>{card.name}</td>
								<td className={scss.TableCell}>{card.groups}</td>
								<td className={scss.TableCell}>{card.phone}</td>
								<td className={scss.TableCell}>{card.gmail}</td>
								<td className={scss.TableCell}>
									<IconDotsVertical stroke={2} />
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
