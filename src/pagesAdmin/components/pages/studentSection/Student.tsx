import FilterPhoto from '@/src/assets/svgs/adjustments-horizontal.svg';
import SearchPhoto from '@/src/assets/svgs/search.svg';
import {
	useGetStudentTableQuery
	// useIsBlockStudentMutation
} from '@/src/redux/api/admin/student';
import Input from '@/src/ui/customInput/Input';
import ExcelModal from '@/src/ui/customModal/ExcelModal';
import ModalAddStudent from '@/src/ui/customModal/ModalAddStudent.tsx';
import { Preloader } from '@/src/ui/preloader/Preloader.tsx';
import StudentMenu from '@/src/ui/toBlock/ToBlock.tsx';
import { Button } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {
	IconArticle,
	IconBook,
	IconDotsVertical,
	IconPlus,
	IconUpload
} from '@tabler/icons-react';
import React, { KeyboardEvent, MouseEvent, useState } from 'react';
import scss from './Student.module.scss';
import { Box, ScrollArea } from '@mantine/core';

interface Student {
	id: number;
	fullName: string;
	groupName: string;
	studyFormat: string;
	phoneNumber: string;
	email: string;
	isBlock: boolean;
}

const Student = () => {
	const { data, isLoading } = useGetStudentTableQuery();
	const [searchTerm, setSearchTerm] = useState<string>('');
	// const [openEditModal, setOpenEditModal] = useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [saveIdElement, setSaveIdElement] = useState<number | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(12);
	const [saveItem, setSaveItem] = useState<Student | undefined>(undefined);
	const [open, setOpen] = useState(false);
	const [openStudent, setOpenStudent] = useState<boolean>(false);
	const [openPart, setOpenPart] = useState<number | undefined>(data?.page);
	const [openPage, setOpenPage] = useState<number | undefined>(data?.size);

	const handleStudentOpen = (e: MouseEvent<HTMLButtonElement>) => {
		setOpenStudent(true);
		e.preventDefault();
	};

	const handleCloseStudent = () => {
		setOpenStudent(false);
	};

	if (isLoading) {
		return <Preloader />;
	}

	const handleOpenSearch = () => setOpen(true);
	const handleCloseSearch = () => setOpen(false);
	const handlePageChangeC = (
		_e: React.ChangeEvent<unknown>,
		page: number
	): void => setCurrentPage(page);
	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) =>
		setSearchTerm(event.target.value);

	const handleAppend = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			const newOpenPage = parseInt(event.currentTarget.value);
			if (newOpenPage > 12) {
				setRowsPerPage(newOpenPage);
				setCurrentPage(1);
			} else {
				setRowsPerPage(12);
			}
		}
	};

	// const updateCompletedFunc = async () => {
	// 	if (saveItem) {
	// 		const updated = {
	// 			isBlock: !saveItem.isBlock
	// 		};
	// 		await isBlockStudent({ updated, saveIdElement });
	// 	}
	// };

	const filteredData = data?.students.filter((student) => {
		const searchTermLower = searchTerm.toLowerCase();
		return (
			(student.fullName &&
				student.fullName.toLowerCase().includes(searchTermLower)) ||
			(student.groupName &&
				student.groupName.toLowerCase().includes(searchTermLower)) ||
			(student.studyFormat &&
				student.studyFormat.toLowerCase().includes(searchTermLower)) ||
			(student.phoneNumber &&
				student.phoneNumber.toLowerCase().includes(searchTermLower)) ||
			(student.email && student.email.toLowerCase().includes(searchTermLower))
		);
	});

	return (
		<div className={scss.student}>
			<div className={scss.container}>
				<div className={scss.content_table}>
					<div className={scss.search_input_buttons}>
						<div className={scss.search_input}>
							<Input
								size="small"
								width="100%"
								placeholder="Поиск"
								type="text"
								value={searchTerm}
								onChange={handleSearchChange}
							/>
							<div className={scss.input_buttons}>
								<button className={scss.button} onClick={handleOpenSearch}>
									<img src={FilterPhoto} alt="Filter" />
								</button>
								<button className={scss.button}>
									<img src={SearchPhoto} alt="Search" />
								</button>
							</div>
						</div>
						<div className={scss.buttons}>
							<Button
								size="large"
								onClick={handleOpenSearch}
								className={scss.button}
								variant="outlined"
							>
								<div className={scss.icon}>
									<IconUpload stroke={2} />
								</div>
								<span>Импорт Excel</span>
							</Button>
							<Button
								size="large"
								className={scss.button}
								variant="contained"
								onClick={handleStudentOpen}
							>
								<div className={scss.icon}>
									<IconPlus stroke={2} />
								</div>
								<span>Добавить студента</span>
							</Button>
						</div>
					</div>
					<h1 className={scss.title}>Студенты</h1>
					<ScrollArea
						type="always"
						scrollbars="xy"
						offsetScrollbars
						classNames={scss}
					>
						<Box>
							<div>
								<div style={{ display: 'flex', justifyContent: 'center' }}>
									<div className={scss.StudentContainer}>
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
												{filteredData
													?.slice(
														(currentPage - 1) * rowsPerPage,
														currentPage * rowsPerPage
													)
													.map((item: Student, index) => (
														<tr
															key={item.id}
															className={
																index % 2 === 1
																	? scss.TableAlternateRow
																	: '' || scss.StudentContainerSecond
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
																{item.groupName}
															</td>
															<td
																className={
																	!item.isBlock ? scss.changeClass : ''
																}
															>
																{item.studyFormat}
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
															<td className={scss.TableCellIcon}>
																<button
																	onClick={(event) => {
																		setAnchorEl(event.currentTarget);
																		setSaveIdElement(item.id);
																		setSaveItem(item);
																	}}
																>
																	<IconDotsVertical
																		style={{ cursor: 'pointer' }}
																		onClick={() => setAnchorEl(null)}
																	/>
																</button>
															</td>
														</tr>
													))}
												<StudentMenu
													anchorEl={anchorEl}
													open={Boolean(anchorEl)}
													onClose={() => setAnchorEl(null)}
													setOpenDeleteModal={setOpenDeleteModal}
													item={saveItem}
													saveIdElement={saveIdElement}
													openDeleteModal={openDeleteModal}
												/>
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
								count={Math.ceil((filteredData?.length || 0) / rowsPerPage)}
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
							}}
						/>
					</div>
				</div>
			</div>
			<ExcelModal handleClose={handleCloseSearch} open={open} />
			<ModalAddStudent open={openStudent} handleClose={handleCloseStudent} />
		</div>
	);
};

export default Student;
