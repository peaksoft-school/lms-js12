import React, { useState, KeyboardEvent } from 'react';
import scss from './CoursesTeacher.module.scss';
import deleteIcon from '../../../../assets/svgs/delete-red.svg';
import DeleteTeacherModal from '@/src/ui/customModal/deleteModal/DeleteTeacherModal';
import ModalEditTeacher from '@/src/ui/customModal/ModalEditTeacher';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Preloader } from '@/src/ui/preloader/Preloader';
import Button from '@mui/material/Button';
import AppointTeacher from '@/src/ui/customModal/appoint/AppointTeacher';
import { Box, ScrollArea } from '@mantine/core';
import { IconArticle, IconBook, IconPlus } from '@tabler/icons-react';
import { useGetAllInstructorCourseQuery } from '@/src/redux/api/admin/courses';
import { useParams } from 'react-router-dom';

// interface Teacher {
// 	id: number;
// 	fullName: string;
// 	courseName: string;
// 	specializationOrStudyFormat: string;
// 	phoneNumber: string;
// 	email: string;
// 	isCompleted: boolean;
// }
const CoursesTeacher = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
	const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
	const [deleteById, setDeleteById] = useState<number | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [openPage, setOpenPage] = useState<number | string>(12);
	const [rowsPerPage, setRowsPerPage] = useState(12);
	const { courseId } = useParams();

	const pages = {
		page: currentPage,
		size: rowsPerPage,
		role: 'INSTRUCTOR'
	};

	console.log(pages);

	const { data, isLoading } = useGetAllInstructorCourseQuery({
		courseId,
		pages
	});

	const [openPart, setOpenPart] = useState(1);

	const [openAddTeacher, setOpenAddTeacher] = useState(false);

	const handleOpenAppoint = () => {
		setOpenAddTeacher(true);
	};

	const handleCloseAppoint = () => {
		setOpenAddTeacher(false);
	};

	if (isLoading) {
		return (
			<div>
				<Preloader />
			</div>
		);
	}

	const open = Boolean(anchorEl);

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
		<div className={scss.teacher}>
			<div className={scss.container}>
				<div className={scss.content_table}>
					<div className={scss.buttons}>
						<Button
							size="large"
							className={scss.button}
							variant="contained"
							onClick={handleOpenAppoint}
						>
							<div className={scss.icon}>
								<IconPlus stroke={2} />
							</div>
							<span>Назначить учителя/лей</span>
						</Button>
					</div>
					<h1 className={scss.title}>Учителя</h1>
					<ScrollArea
						type="always"
						scrollbars="xy"
						offsetScrollbars
						classNames={scss}
					>
						<Box>
							<div>
								<div style={{ display: 'flex', justifyContent: 'center' }}>
									<div className={scss.TeacherContainer}>
										<table className={scss.Table}>
											<thead>
												<tr>
													<th style={{ textAlign: 'start' }}>№</th>
													<th>Имя Фамилия</th>

													<th>Специализация</th>
													<th>Номер телефона</th>
													<th>E-mail</th>
													<th>Группа</th>
													<th
														style={{ textAlign: 'end', paddingRight: '10px' }}
													>
														Действия
													</th>
												</tr>
											</thead>
											<tbody>
												{data?.getAllInstructorsOfCourses
													// data
													// 	.slice(
													// 		(currentPage - 1) * rowsPerPage,
													// 		currentPage * rowsPerPage
													// 	)
													.map((item, index: number) => (
														<tr
															key={item.id}
															className={
																index % 2 === 1
																	? scss.TableAlternateRow
																	: '' || scss.TableContainerSecond
															}
														>
															<td>
																{index + 1 + (currentPage - 1) * rowsPerPage}
															</td>

															<td className={scss.TableCell}>
																{item.fullName}
															</td>
															<td className={scss.TableCell}>
																{item.specializationOrStudyFormat}
															</td>
															<td className={scss.TableCell}>
																{item.phoneNumber}
															</td>
															<td className={scss.TableCell}>{item.email}</td>
															<td className={scss.TableCell}>
																{item.courseName}
															</td>
															<td className={scss.TableCellIcon}>
																<button
																	className={scss.button}
																	aria-controls={
																		open ? 'basic-menu' : undefined
																	}
																	aria-haspopup="true"
																	onClick={() => {
																		setOpenModalDelete(true);
																		setAnchorEl(null);
																		setDeleteById(item.id!);
																	}}
																>
																	<img src={deleteIcon} alt="Delete" />
																</button>
															</td>
														</tr>
													))}
											</tbody>
										</table>

										<ModalEditTeacher
											openModalEdit={openModalEdit}
											closeModalEdit={() => setOpenModalEdit(false)}
											deleteById={deleteById}
										/>
									</div>
								</div>
							</div>
						</Box>
					</ScrollArea>
					<DeleteTeacherModal
						openModalDelete={openModalDelete}
						closeModalDelete={setOpenModalDelete}
						deleteById={deleteById}
					/>
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
								// count={Math.ceil(
								// 	data!.getAllInstructorsOfCourses.length / rowsPerPage
								// )}
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
			<AppointTeacher open={openAddTeacher} handleClose={handleCloseAppoint} />
		</div>
	);
};

export default CoursesTeacher;
