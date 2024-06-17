/* eslint-disable @typescript-eslint/no-unused-vars */
import scss from './InternalInstructorStudents.module.scss';
import { KeyboardEvent, useState } from 'react';
import { Button, Pagination, Stack } from '@mui/material';
import { Preloader } from '@/src/ui/preloader/Preloader';
import { IconArticle, IconBook, IconPlus } from '@tabler/icons-react';
import { Box, ScrollArea } from '@mantine/core';
import { useGetStudentsTableQuery } from '@/src/redux/api/instructor/student';
import { useParams } from 'react-router-dom';
import ModalEditStudents from '@/src/ui/customModal/ModalEditStudents';

const InternalInstructorStudents = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(12);
	const [openPart, setOpenPart] = useState(1);
	const [openPage, setOpenPage] = useState(12);
	const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
	const { courseId } = useParams();
	const { data, isLoading } = useGetStudentsTableQuery(courseId);

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

	

	return (
		<div className={scss.internal_student}>
			<div className={scss.container}>
				<div className={scss.content_table}>
					<div className={scss.delete_button_modal}>
						<Button
							size="large"
							className={scss.button}
							variant="contained"
							onClick={() => setOpenModalEdit(true)}
						>
							<div className={scss.icon}>
								<IconPlus stroke={2} />
							</div>
							<ModalEditStudents
								openModalEdit={openModalEdit}
								// closeModalEdit={() => setOpenModalEdit(false)}
							/>
							<span>Добавить группу на курса</span>
						</Button>
					</div>
					<h1 className={scss.title}>Data Engineer</h1>
					<ScrollArea type="always" scrollbars="xy" offsetScrollbars>
						<Box>
							<div>
								<div style={{ display: 'flex', justifyContent: 'center' }}>
									<div className={scss.internal_container}>
										<table className={scss.table}>
											<thead>
												<tr>
													<th style={{ textAlign: 'start' }}>№</th>
													<th>Имя</th>
													<th>Фамилия</th>
													<th>Группа</th>
													<th>Формат обучения</th>
													<th>Номер телефона</th>
													<th>E-mail</th>
												</tr>
											</thead>
											<tbody>
												{data?.getAllStudentsOfCourses &&
													data?.getAllStudentsOfCourses
														// ?.slice(
														// 	(currentPage - 1) * rowsPerPage,
														// 	currentPage * rowsPerPage
														// )
														.map((item, index) => (
															<tr
																key={item.id}
																className={
																	index % 2 === 1
																		? scss.table_alternate_row
																		: '' || scss.internal
																}
															>
																<td>
																	{index + 1 + (currentPage - 1) * rowsPerPage}
																</td>
																<td>{item.id}</td>
																<td>{item.courseName}</td>
																<td>{item.fullName}</td>
																<td>{item.specializationOrStudyFormat}</td>
																<td>{item.phoneNumber}</td>
																<td>{item.email}</td>
																<td>{item.isBlock}</td>
															</tr>
														))}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</Box>
					</ScrollArea>
				</div>
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
			</div>
		</div>
	);
};

export default InternalInstructorStudents;
