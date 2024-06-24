import scss from './InternalStudents.module.scss';
import { KeyboardEvent, useState } from 'react';
import { Pagination, Stack } from '@mui/material';
import { Preloader } from '@/src/ui/preloader/Preloader';
import { IconArticle, IconBook } from '@tabler/icons-react';
import { Box, ScrollArea } from '@mantine/core';
import { useGetGroupStudentQuery } from '@/src/redux/api/admin/groups';
import { useParams } from 'react-router-dom';
import NotCreatedWithoutButton from '@/src/ui/notCreated/NotCreatedWithoutButton';

const InternalStudents = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(12);
	const [openPart, setOpenPart] = useState(1);
	const [openPage, setOpenPage] = useState(12);
	const { groupId } = useParams();
	const group = Number(groupId);
	const { data, isLoading } = useGetGroupStudentQuery(group);

	if (isLoading) {
		return (
			<div>
				<Preloader />
			</div>
		);
	}
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
	const handlePageChangeC = (
		_e: React.ChangeEvent<unknown>,
		page: number
	): void => {
		setCurrentPage(page);
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

	const item = localStorage.getItem('item');
	const itemText = String(item);

	return (
		<div className={scss.internal_student}>
			<div className={scss.container}>
				<div className={scss.content_table}>
					{data?.students.length !== 0 ? (
						<>
							<h1 className={scss.title}>{item}</h1>
						</>
					) : null}
					<ScrollArea
						type="always"
						scrollbars="xy"
						offsetScrollbars
						classNames={scss}
					>
						<Box>
							<div>
								{data?.students.length === 0 ? (
									<>
										<NotCreatedWithoutButton
											name={itemText}
											text="Вы пока не добавили студентов"
										/>
									</>
								) : (
									<>
										<div style={{ display: 'flex', justifyContent: 'center' }}>
											<div className={scss.internal_container}>
												<table className={scss.table}>
													<thead>
														<tr>
															<th style={{ textAlign: 'start' }}>№</th>
															<th>Имя Фамилия</th>
															<th>Группа</th>
															<th>Формат обучения</th>
															<th>Номер телефона</th>
															<th>E-mail</th>
														</tr>
													</thead>
													<tbody>
														{data?.students &&
															data?.students.map((item, index) => (
																<tr
																	key={item.id}
																	className={
																		index % 2 === 1
																			? scss.table_alternate_row
																			: '' || scss.internal
																	}
																>
																	<td>
																		{index +
																			1 +
																			(currentPage - 1) * rowsPerPage}
																	</td>
																	<td>{item.fullName}</td>

																	<td>{item.groupName}</td>
																	<td>{item.studyFormat}</td>
																	<td>{item.phoneNumber}</td>
																	<td>{item.email}</td>
																</tr>
															))}
													</tbody>
												</table>
											</div>
										</div>
									</>
								)}
							</div>
						</Box>
					</ScrollArea>
				</div>
				{data?.students.length !== 0 ? (
					<>
						<div className={scss.pagination}>
							<div className={scss.inputs}>
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
										// count={Math.ceil(data!.length / rowsPerPage)}
										page={currentPage}
										onChange={handlePageChangeC}
										shape="rounded"
										variant="outlined"
									/>
								</Stack>
							</div>
							<div className={scss.inputs}>
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
					</>
				) : null}
			</div>
		</div>
	);
};
export default InternalStudents;
