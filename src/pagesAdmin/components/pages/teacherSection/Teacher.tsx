import React, { useState, MouseEvent, KeyboardEvent } from 'react';
import scss from './Teacher.module.scss';
import { useGetTeacherQuery } from '@/src/redux/api/admin/teacher';
import {
	IconArticle,
	IconBook,
	IconDotsVertical,
	IconPlus
} from '@tabler/icons-react';
import editIcon from '@/src/assets/svgs/edit.svg';
import deleteIcon from '../../../../assets/svgs/delete-red.svg';
import { Menu, MenuItem } from '@mui/material';
import DeleteTeacherModal from '@/src/ui/customModal/deleteModal/DeleteTeacherModal';
import ModalEditTeacher from '@/src/ui/customModal/ModalEditTeacher';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Preloader } from '@/src/utils/routes/preloader/Preloader';
import Button from '@mui/material/Button';
import ModalAddTeacher from '@/src/ui/customModal/ModalAddTeacher.tsx';
import { Box, ScrollArea } from '@mantine/core';

const Teacher = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
	const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
	const [deleteById, setDeleteById] = useState<number | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(12);
	const [openPage, setOpenPage] = useState<number | string>(12);
	const { data, isLoading } = useGetTeacherQuery();
	const [openPart, setOpenPart] = useState(1);
	const [openTeacher, setTeacherOpen] = useState<boolean>(false);

	const handleTeacherOpen = (e: MouseEvent<HTMLButtonElement>) => {
		setTeacherOpen(true);
		e.preventDefault();
	};

	const handleTeacherClose = () => {
		setTeacherOpen(false);
	};

	if (isLoading) {
		return (
			<div>
				<Preloader />
			</div>
		);
	}

	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
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
	const handlePageChangeC = (
		_e: React.ChangeEvent<unknown>,
		page: number
	): void => {
		setCurrentPage(page);
	};

	const handleClose = () => {
		setAnchorEl(null);
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
					<div className={scss.button_title_elements}>
						<Button
							size="large"
							className={scss.button}
							onClick={handleTeacherOpen}
							variant="contained"
						>
							<div className={scss.icon}>
								<IconPlus stroke={2} />
							</div>
							<span>Добавить учителя</span>
						</Button>
					</div>
					<h1 className={scss.title}>Учителя</h1>
					<ScrollArea
						scrollbars="xy"
						type="always"
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
													<th
														style={{ textAlign: 'end', paddingRight: '10px' }}
													>
														Действия
													</th>
												</tr>
											</thead>
											<tbody>
												{data?.instructorResponses &&
													data.instructorResponses
														.slice(
															(currentPage - 1) * rowsPerPage,
															currentPage * rowsPerPage
														)
														.map((item, index) => (
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
																	{item.specialization}
																</td>
																<td className={scss.TableCell}>
																	{item.phoneNumber}
																</td>
																<td className={scss.TableCell}>{item.email}</td>
																<td className={scss.TableCellIcon}>
																	<button
																		className={scss.button}
																		aria-controls={
																			open ? 'basic-menu' : undefined
																		}
																		aria-haspopup="true"
																		onClick={(e) => {
																			handleClick(e);
																			setDeleteById(item.id!);
																		}}
																	>
																		<IconDotsVertical stroke={2} />
																	</button>
																	<Menu
																		id="basic-menu"
																		anchorEl={anchorEl}
																		open={open}
																		onClose={handleClose}
																		MenuListProps={{
																			'aria-labelledby': 'basic-button'
																		}}
																		elevation={0}
																		anchorOrigin={{
																			vertical: 'bottom',
																			horizontal: 'right'
																		}}
																		transformOrigin={{
																			vertical: 'top',
																			horizontal: 'right'
																		}}
																		PaperProps={{
																			style: {
																				boxShadow: 'none',
																				border: '1px solid gray'
																			}
																		}}
																	>
																		<MenuItem
																			style={{ display: 'flex', gap: '10px' }}
																			onClick={() => {
																				setOpenModalEdit(true);
																				setAnchorEl(null);
																			}}
																		>
																			<img src={editIcon} alt="Edit" />
																			<p>Редактировать</p>
																		</MenuItem>
																		<MenuItem
																			style={{ display: 'flex', gap: '10px' }}
																			onClick={() => {
																				setOpenModalDelete(true);
																				setAnchorEl(null);
																			}}
																		>
																			<img src={deleteIcon} alt="Delete" />
																			<p>Удалить</p>
																		</MenuItem>
																	</Menu>
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
								count={Math.ceil(
									data!.instructorResponses.length / rowsPerPage
								)}
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
			<ModalAddTeacher open={openTeacher} handleClose={handleTeacherClose} />
		</div>
	);
};

export default Teacher;
