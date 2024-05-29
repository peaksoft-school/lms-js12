import { KeyboardEvent, useEffect, useState } from 'react';
import { Pagination, Stack } from '@mui/material';
import { usePatchCompletedMutationMutation } from '@/src/redux/api/admin/student';
import { Preloader } from '@/src/ui/preloader/Preloader';
import { IconArticle, IconBook } from '@tabler/icons-react';
import scss from './InternalCourseStudent.module.scss';
import LockOpenStudent from '@/src/assets/svgs/lock-open.svg';
import LockBlockStudent from '@/src/assets/svgs/lock.svg';
import { Box, ScrollArea } from '@mantine/core';
import { useGetAllStudentsCourseQuery } from '@/src/redux/api/admin/courses';
import { useParams } from 'react-router-dom';

interface Student {
	id: number;
	fullName: string;
	courseName: string;
	specializationOrStudyFormat: string;
	phoneNumber: string;
	email: string;
	isCompleted: boolean;
}
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
	const [saveItem, setSaveItem] = useState<Student | null>(null);
	const [patchCompletedMutation] = usePatchCompletedMutationMutation();
	const { courseId } = useParams();
	const pages: Pages = {
		page: currentPage,
		size: rowsPerPage,
		role: 'STUDENT'
	};

	const { data, isLoading, error } = useGetAllStudentsCourseQuery({
		courseId,
		pages
	});
	console.log(data?.getAllStudentsOfCourses, 'isArray');

	useEffect(() => {
		if (!isLoading && !error && data) {
			setOpenPart(1);
			setCurrentPage(1);
		}
	}, [data, isLoading, error]);

	const updateCompletedFunc = async (
		id: number | null,
		item: Student | null
	) => {
		if (id !== null && item !== null) {
			const updated = {
				fullName: item.fullName,
				email: item.email,
				courseName: item.courseName,
				phoneNumber: item.phoneNumber,
				specializationOrStudyFormat: item.specializationOrStudyFormat,
				// password: item.password,
				isCompleted: !item.isCompleted
			};
			await patchCompletedMutation({ updated, saveIdElement: id });
		}
	};

	const handlePageChange = (_e: React.ChangeEvent<unknown>, page: number) => {
		setCurrentPage(page);
		if (saveItem !== null && saveIdElement !== null) {
			updateCompletedFunc(saveIdElement, saveItem);
		}
	};

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
													data!.getAllStudentsOfCourses
														// ?.slice(
														// 	(currentPage - 1) * rowsPerPage,
														// 	currentPage * rowsPerPage
														// )
														.map((item, index: number) => (
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
																		!item.isCompleted ? scss.changeClass : ''
																	}
																>
																	{index + 1 + (currentPage - 1) * rowsPerPage}
																</td>

																<td
																	className={
																		!item.isCompleted ? scss.changeClass : ''
																	}
																>
																	{item.fullName}
																</td>
																<td
																	className={
																		!item.isCompleted ? scss.changeClass : ''
																	}
																>
																	{item.courseName}
																</td>
																<td
																	className={
																		!item.isCompleted ? scss.changeClass : ''
																	}
																>
																	{item.specializationOrStudyFormat}
																</td>
																<td
																	className={
																		!item.isCompleted ? scss.changeClass : ''
																	}
																>
																	{item.phoneNumber}
																</td>
																<td
																	className={
																		!item.isCompleted ? scss.changeClass : ''
																	}
																>
																	{item.email}
																</td>
																<td>
																	<button
																		className={scss.button}
																		onClick={() => {
																			setSaveIdElement(item.id);
																			setSaveItem(item);
																			updateCompletedFunc(item.id, item);
																		}}
																	>
																		{item.isCompleted ? (
																			<img src={LockOpenStudent} alt="#" />
																		) : (
																			<img src={LockBlockStudent} alt="#" />
																		)}
																	</button>
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
								onChange={handlePageChange}
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
		</div>
	);
};

export default InternalCourses;
