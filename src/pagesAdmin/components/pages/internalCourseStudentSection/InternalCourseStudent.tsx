import { KeyboardEvent, useEffect, useState } from 'react';
import { Pagination, Stack } from '@mui/material';
import { Preloader } from '@/src/ui/preloader/Preloader';
import { IconArticle, IconBook } from '@tabler/icons-react';
import scss from './InternalCourseStudent.module.scss';
import LockOpenStudent from '@/src/assets/svgs/lock-open.svg';
import LockBlockStudent from '@/src/assets/svgs/lock.svg';
import { Box, ScrollArea } from '@mantine/core';
import { useGetAllStudentsCourseQuery } from '@/src/redux/api/admin/courses';
import { useParams } from 'react-router-dom';
import IsBlockCourses from '@/src/ui/customModal/IsBlockCourses';

interface Pages {
	page: number;
	size: number;
	role: string;
}

const InternalCourses = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(12);
	const [openPart, setOpenPart] = useState(1);
	const [saveIdElement, setSaveIdElement] = useState<number | null>(null);
	const [openBlock, setOpenBlock] = useState(false);
	const [saveBlock, setSaveBlock] = useState(false);
	const { courseId } = useParams();
	const courses = Number(courseId);
	const pages: Pages = {
		page: currentPage,
		size: rowsPerPage,
		role: 'STUDENT'
	};

	const { data, isLoading, error } = useGetAllStudentsCourseQuery({
		courses,
		pages
	});

	useEffect(() => {
		if (!isLoading && !error && data) {
			setOpenPart(1);
			setCurrentPage(1);
		}
	}, [data, isLoading, error]);

	const handleAppend = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			const newOpenPage = parseInt(event.currentTarget.value);
			if (newOpenPage > 12) {
				setRowsPerPage(newOpenPage);
				setOpenPart(1);
				setCurrentPage(1);
			} else {
				setRowsPerPage(12);
			}
		}
	};

	if (isLoading) {
		return <Preloader />;
	}

	return (
		<div className={scss.internal_student}>
			<div className={scss.container}>
				<div className={scss.content_table}>
					<h1 className={scss.title}>Data Engineer</h1>
					<ScrollArea
						type="always"
						scrollbars="xy"
						offsetScrollbars
						classNames={scss}
					>
						<Box>
							<div>
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
													<th
														style={{ textAlign: 'end', paddingRight: '10px' }}
													>
														Действия
													</th>
												</tr>
											</thead>
											<tbody>
												{data!.getAllStudentsOfCourses &&
													data!.getAllStudentsOfCourses.map(
														(item, index: number) => (
															<tr
																key={item.id}
																className={
																	index % 2 === 1
																		? scss.table_alternate_row
																		: '' || scss.internal
																}
															>
																<td
																	className={
																		!item.isBlock ? scss.changeClass : ''
																	}
																>
																	{index + 1 + (currentPage - 1) * rowsPerPage}
																</td>

																<td
																	className={
																		!item.isBlock ? scss.changeClass : ''
																	}
																>
																	{item.fullName}
																</td>
																<td
																	className={
																		!item.isBlock ? scss.changeClass : ''
																	}
																>
																	{item.courseName}
																</td>
																<td
																	className={
																		!item.isBlock ? scss.changeClass : ''
																	}
																>
																	{item.specializationOrStudyFormat}
																</td>
																<td
																	className={
																		!item.isBlock ? scss.changeClass : ''
																	}
																>
																	{item.phoneNumber}
																</td>
																<td
																	className={
																		!item.isBlock ? scss.changeClass : ''
																	}
																>
																	{item.email}
																</td>
																<td>
																	<button
																		className={scss.button}
																		onClick={() => {
																			setOpenBlock(true);
																			setSaveIdElement(item.id);
																			setSaveBlock(item.isBlock);
																		}}
																	>
																		{item.isBlock ? (
																			<img src={LockOpenStudent} alt="#" />
																		) : (
																			<img src={LockBlockStudent} alt="#" />
																		)}
																	</button>
																</td>
															</tr>
														)
													)}
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
							}}
						/>
					</div>
					<div className={scss.stack}>
						<Stack direction="row" spacing={2}>
							<Pagination
								count={Math.ceil(
									data!.getAllStudentsOfCourses.length / rowsPerPage
								)}
								page={currentPage}
								// onChange={}
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
							value={rowsPerPage}
							onChange={(e) => setRowsPerPage(+e.target.value)}
							onKeyDown={(e) => {
								handleAppend(e);
							}}
						/>
					</div>
				</div>
			</div>
			<IsBlockCourses
				openModalBlock={openBlock}
				handleCloseModal={() => setOpenBlock(false)}
				saveIdElement={saveIdElement}
				saveBlock={saveBlock}
			/>
		</div>
	);
};

export default InternalCourses;
