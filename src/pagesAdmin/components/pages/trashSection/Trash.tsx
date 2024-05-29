import { FC, useState, KeyboardEvent } from 'react';
import scss from './Trash.module.scss';
import trash from '@/src/assets/svgs/trash (1).svg';
import refrash from '@/src/assets/svgs/refresh.svg';
import {
	useDeleteTrashMutation,
	useGetTrashQuery,
	useUpdatedTrashMutation
} from '@/src/redux/api/admin/trash';
import { Preloader } from '../../../../ui/preloader/Preloader';
import { Pagination, Stack } from '@mui/material';
import { IconArticle, IconBook } from '@tabler/icons-react';
import { Box, ScrollArea } from '@mantine/core';

const Trash: FC = () => {
	const { data, isLoading } = useGetTrashQuery();
	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(12);
	const [openPart, setOpenPart] = useState(1);
	const [openPage, setOpenPage] = useState(12);
	const [UpdatedTrash] = useUpdatedTrashMutation();
	const [DeleteTrash] = useDeleteTrashMutation();

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
			setRowsPerPage(12);
			setOpenPage(12);
			setCurrentPage(openPart);
		}
	};

	const openPartPage = () => {
		if (rowsPerPage > 12) {
			setCurrentPage(1);
		}
	};

	const handleAppend = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			const newOpenPage = parseInt(event.currentTarget.value);
			if (newOpenPage > 12) {
				setRowsPerPage(newOpenPage);
				setOpenPart(1);
				setCurrentPage(1);
				openPartFunc();
			} else {
				setRowsPerPage(12);
			}
		}
	};

	const updatedTrashFunc = async (id: number) => {
		await UpdatedTrash(id);
	};
	const DeleteTrashFunc = async (id: number) => {
		await DeleteTrash(id);
	};
	return (
		<div className={scss.trash_parent}>
			<div className={scss.container}>
				<h1>Корзина</h1>
				<ScrollArea
					type="always"
					scrollbars="xy"
					offsetScrollbars
					classNames={scss}
				>
					<Box>
						<div style={{ minHeight: '64vh' }}>
							<div className={scss.table_container}>
								<div className={scss.text}>
									<p>
										Элементы в корзине автоматически удаляются через 7 дней с
										момента добавления!
									</p>
								</div>

								<div className={scss.trash}>
									<table className={scss.table}>
										<thead>
											<tr>
												<th>Название</th>
												<th className={scss.date}>Дата удаления</th>
												<th className={scss.last_th}>Действие</th>
											</tr>
										</thead>
										<tbody>
											{data?.trashResponses
												// ?.slice(
												// 	(currentPage - 1) * rowsPerPage,
												// 	currentPage * rowsPerPage
												// )
												.map((card, index) => (
													<tr
														className={
															index % 2 === 1
																? scss.table_alternate_row
																: '' || scss.table_container_second
														}
													>
														<td style={{ paddingLeft: '20px' }}>{card.name}</td>
														<td
															style={{ textAlign: 'end', paddingRight: '70px' }}
														>
															{card.date}
														</td>
														<td>
															<div
																style={{
																	display: 'flex',
																	alignItems: 'end',
																	justifyContent: 'end',
																	gap: '20px',
																	paddingRight: '50px',
																	cursor: 'pointer'
																}}
															>
																<button
																	style={{ border: 'none', background: 'none' }}
																	onClick={() => updatedTrashFunc(card.id)}
																>
																	<img src={refrash} alt="#" />
																</button>
																<button
																	style={{ border: 'none', background: 'none' }}
																	onClick={() => DeleteTrashFunc(card.id)}
																>
																	<img src={trash} alt="#" />
																</button>
															</div>
														</td>
													</tr>
												))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</Box>
				</ScrollArea>
				<div className={scss.pagination}>
					<div className={scss.Inputs}>
						<p className={scss.text}>Перейти на страницу</p>
						<div className={scss.pagination_element}>
							<IconBook stroke={2} />
						</div>
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
					<div className={scss.stack}>
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
						<p className={scss.text}>Показать</p>
						<div className={scss.pagination_element}>
							<IconArticle stroke={2} />
						</div>
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
