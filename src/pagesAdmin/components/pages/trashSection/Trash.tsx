import { FC, useState, KeyboardEvent } from 'react';
import scss from './Trash.module.scss';
import trash from '@/src/assets/svgs/trash (1).svg';
import refrash from '@/src/assets/svgs/refresh.svg';
import { useGetTrashQuery } from '@/src/redux/api/admin/trash';
import { Preloader } from '../../../../ui/preloader/Preloader';
import { Pagination, Stack } from '@mui/material';

const Trash: FC = () => {
	const { data, isLoading } = useGetTrashQuery();
	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(15);
	const [openPart, setOpenPart] = useState(1);
	const [openPage, setOpenPage] = useState(15);

	if (isLoading) {
		return (
			<div>
				<Preloader />
			</div>
		);
	}

	const handlePageChangeC = (
		_e: React.ChangeEvent<unknown>,
		page: number	
	): void => {
		setCurrentPage(page);
	};

	const openPartFunc = () => {
		if (openPart >= 1) {
			setRowsPerPage(30);
			setOpenPage(30);
			setCurrentPage(openPart);
		}
	};

	const openPartPage = () => {
		if (rowsPerPage > 15) {
			setCurrentPage(1);
		}
	};

	const handleAppend = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			const newOpenPage = parseInt(event.currentTarget.value);
			if (newOpenPage > 15) {
				setRowsPerPage(newOpenPage);
				setOpenPart(1);
				setCurrentPage(1);
				openPartFunc();
			} else {
				setRowsPerPage(15);
			}
		}
	};
	return (
		<div className={scss.trash_parent}>
			<div className={scss.container}>
				<h1>Корзина</h1>
				<div className={scss.table_container}>
					<div className={scss.table_automatically_deleted}>
						<p>
							{' '}
							Элементы в корзине автоматически удаляются через 7 дней с момента
							добавления!
						</p>
					</div>
					<div className={scss.Trash}>
						<table className={scss.Table}>
							<thead>
								<tr>
									<th>Name</th>
									<th className={scss.date}>Date of delete</th>
									<th className={scss.last_th}>Actions</th>
								</tr>
							</thead>
							<tbody>
								{data &&
									data.map((card, index) => (
										<tr
											className={
												index % 2 === 1
													? scss.table_alternate_row
													: '' || scss.table_container_second
											}
										>
											<td className={scss.TableCell_main}>{card.name}</td>
											<td className={scss.table_cell}>{card.date}</td>
											<td className={scss.last_td}>
												<div className={scss.icon}>
													<div>
														<img src={refrash} alt="" />
													</div>
													<div>
														<img src={trash} alt="" />
													</div>
												</div>
											</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>
				</div>
				<div className={scss.PaginationContainerParent}>
					<div className={scss.Inputs}>
						<p>Перейти на страницу</p>
						<input
							type="text"
							value={openPart}
							onChange={(e) => setOpenPart(+e.target.value)}
							onKeyDown={(e) => {
								handleAppend(e);
								openPartFunc();
							}}
						/>
					</div>
					<div className={scss.PaginationCard}>
						<Stack direction="row" spacing={2}>
							<Pagination
								count={Math.ceil(data!.length / rowsPerPage)}
								page={currentPage}
								onChange={handlePageChangeC}
								shape="rounded"
								variant="outlined"
							/>
						</Stack>
					</div>
					<div className={scss.Inputs}>
						<p>Показать</p>
						<input
							type="text"
							value={openPage}
							onChange={(e) => setOpenPage(+e.target.value)}
							onKeyDown={(e) => {
								handleAppend(e);
								openPartPage();
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Trash;
