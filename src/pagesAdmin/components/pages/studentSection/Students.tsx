import React, { useState, KeyboardEvent } from 'react';
import scss from './Student.module.scss';
import {
	useGetStudentTableQuery,
	usePatchCompletedMutationMutation
} from '@/src/redux/api/admin/student';
import { Preloader } from '@/src/ui/preloader/Preloader.tsx';
import FilterPhoto from '@/src/assets/svgs/adjustments-horizontal.svg';
import SearchPhoto from '@/src/assets/svgs/search.svg';
import Input from '@/src/ui/customInput/Input';
import { Button } from '@mui/material';
import ButtonExelPhoto from '@/src/assets/svgs/Vector (1).svg';
import ModalAddStudent from '@/src/ui/customModal/ModalAddStudent.tsx';
import StudentMenu from '@/src/ui/toBlock/ToBlock.tsx';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { IconDotsVertical } from '@tabler/icons-react';
import SearchModal from '@/src/ui/customModal/deleteModal/SearchModal';

interface Student {
	_id: string;
	firstName: string;
	lastName: string;
	group: string;
	TrainingFormat: string;
	phone_number: string;
	email: string;
	password: string;
	isCompleted: boolean;
}
const Students = () => {
	const { data, isLoading } = useGetStudentTableQuery();
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [openEditModal, setOpenEditModal] = useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [saveIdElement, setSaveIdElement] = useState<number | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(30);
	const [openPart, setOpenPart] = useState(1);
	const [openPage, setOpenPage] = useState(30);
	const [patchCompletedMutation] = usePatchCompletedMutationMutation();
	const [saveItem, setSaveItem] = useState<Student>();
	const [open, setOpen] = useState(false);

	if (isLoading) {
		return (
			<div>
				<Preloader />
			</div>
		);
	}

	const handleOpenSearch = () => {
		setOpen(true);
	};

	const handleCloseSearch = () => {
		setOpen(false);
	};

	const handlePageChangeC = (
		_e: React.ChangeEvent<unknown>,
		page: number
	): void => {
		setCurrentPage(page);
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const handleCloseEditModal = () => setOpenEditModal(false);
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

	const updateCompletedFunc = async () => {
		if (saveItem) {
			const updated = {
				firstName: saveItem.firstName,
				lastName: saveItem.lastName,
				email: saveItem.email,
				group: saveItem.group,
				phone_number: saveItem.phone_number,
				TrainingFormat: saveItem.TrainingFormat,
				password: saveItem.password,
				isCompleted: !saveItem.isCompleted
			};
			patchCompletedMutation({ updated, saveIdElement });
		}
	};

	return (
		<div className={scss.StudentParentContainer}>
			<div className={scss.allContainer}>
				<div className={scss.test}>
					<div className={scss.sectionLogics}>
						<div className={scss.inputWithIcon}>
							<Input
								width="100%"
								placeholder="Поиск"
								type="text"
								value={searchTerm}
								onChange={handleSearchChange}
							/>
							<div className={scss.buttons}>
								<button className={scss.button} onClick={handleOpenSearch}>
									<img src={FilterPhoto} alt="Filter" />
								</button>
								<button className={scss.button}>
									<img src={SearchPhoto} alt="Search" />
								</button>
							</div>
						</div>

						<div className={scss.Parent_second_btn}>
							<Button className={scss.ExelButton} variant="outlined">
								<img src={ButtonExelPhoto} alt="#" />
								Импорт Exel
							</Button>
							<div className={scss.Button_UI}>
								<ModalAddStudent />
							</div>
						</div>
					</div>
					<div className={scss.TitleStudent}>
						<h1>Студенты</h1>
					</div>
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<div className={scss.StudentContainer}>
							<table className={scss.Table}>
								<thead>
									<tr>
										<th className={scss.TableTh}>№</th>
										<th>Имя</th>
										<th>Фамилия</th>
										<th>Группа</th>
										<th>Формат обучения</th>
										<th>Номер телефона</th>
										<th>E-mail</th>
										<th style={{ textAlign: 'end', paddingRight: '10px' }}>
											Действия
										</th>
									</tr>
								</thead>
								<tbody>
									{data
										?.slice(
											(currentPage - 1) * rowsPerPage,
											currentPage * rowsPerPage
										)
										.map((item, index) => (
											<tr
												key={item._id}
												className={
													index % 2 === 1
														? scss.TableAlternateRow
														: '' || scss.StudentContainerSecond
												}
											>
												<td
													className={!item.isCompleted ? scss.changeClass : ''}
												>
													{index + 1 + (currentPage - 1) * rowsPerPage}
												</td>
												<td
													className={!item.isCompleted ? scss.changeClass : ''}
												>
													{item.firstName}
												</td>
												<td
													className={!item.isCompleted ? scss.changeClass : ''}
												>
													{item.lastName}
												</td>
												<td
													className={!item.isCompleted ? scss.changeClass : ''}
												>
													{item.group}
												</td>
												<td
													className={!item.isCompleted ? scss.changeClass : ''}
												>
													{item.TrainingFormat}
												</td>
												<td
													className={!item.isCompleted ? scss.changeClass : ''}
												>
													{item.phone_number}
												</td>
												<td
													className={!item.isCompleted ? scss.changeClass : ''}
												>
													{item.email}
												</td>
												<td className={scss.TableCellIcon}>
													<button
														className={scss.Button_Photo}
														onClick={(event) => {
															setAnchorEl(event.currentTarget);
															setSaveIdElement(item._id);
															setSaveItem(item);
														}}
													>
														<button
															className={scss.Button_Photo}
															onClick={() => setAnchorEl(null)}
														>
															<IconDotsVertical />
														</button>
													</button>
												</td>
											</tr>
										))}
									<StudentMenu
										anchorEl={anchorEl}
										open={Boolean(anchorEl)}
										onClose={() => setAnchorEl(null)}
										setOpenEditModal={() => setOpenEditModal(true)}
										setOpenDeleteModal={setOpenDeleteModal}
										updateCompletedFunc={updateCompletedFunc}
										handleCloseEditModal={handleCloseEditModal}
										openEditModal={openEditModal}
										item={data?.slice(
											(currentPage - 1) * rowsPerPage,
											currentPage * rowsPerPage
										)}
										saveIdElement={saveIdElement}
										openDeleteModal={openDeleteModal}
									/>
								</tbody>
							</table>
						</div>
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
					<div>
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
			<SearchModal handleClose={handleCloseSearch} open={open} />
		</div>
	);
};

export default Students;
