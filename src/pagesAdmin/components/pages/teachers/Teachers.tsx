import React, { useState } from 'react';
import scss from './Teachers.module.scss';
import { useGetTeacherQuery } from '@/src/redux/api/admin/teacher';
import ModalAddTeacher from '@/src/ui/customModal/ModalAddTeacher';
import { IconDotsVertical } from '@tabler/icons-react';
import editIcon from '@/src/assets/svgs/edit.svg';
import deleteIcon from '@/src/assets/svgs/delete-red.svg';
import { Menu, MenuItem } from '@mui/material';
import DeleteTeacherModal from '@/src/ui/customModal/deleteModal/DeleteTeacherModal';
import ModalEditTeacher from '@/src/ui/customModal/ModalEditTeacher';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Preloader } from '@/src/ui/preloader/Preloader';

const Teachers = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
	const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
	const [deleteById, setDeleteById] = useState<number | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [openPage, setOpenPage] = useState<number | string>(15);
	const [rowsPerPage, setRowsPerPage] = useState(15);
	const { data, isLoading } = useGetTeacherQuery();
	const [openPart, setOpenPart] = useState(1);

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
			setRowsPerPage(15);
			setOpenPage(15);
			setCurrentPage(openPart);
		}
	};

	const openPartPage = () => {
		if (rowsPerPage > 15) {
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

	const handleAppend = (event: any) => {
		if (event.key === 'Enter') {
			const newOpenPage = parseInt(event.target.value);
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
		<div className={scss.mainTable}>
			<div className={scss.HeaderContainer}>
				<h1>Учителя</h1>
				<ModalAddTeacher />
			</div>

			<div className={scss.TableContainer}>
				<table className={scss.Table}>
					<thead>
						<tr>
							<th className={scss.TableTh}>№</th>
							<th>Имя Фамилия</th>
							<th>Специализация</th>
							<th>Номер телефона</th>
							<th>E-mail</th>
							<th>группы</th>
							<th>Действия</th>
						</tr>
					</thead>
					<tbody>
						{data &&
							data
								.slice(
									(currentPage - 1) * rowsPerPage,
									currentPage * rowsPerPage
								)
								.map((item, index) => (
									<tr
										key={item._id}
										className={
											index % 2 === 1
												? scss.TableAlternateRow
												: '' || scss.TableContainerSecond
										}
									>
										<td className={scss.TableCellNumber}>
											{index + 1 + (currentPage - 1) * rowsPerPage}
										</td>
										<td className={scss.TableCell}>
											{item.firstName} {item.lastName}
										</td>
										<td className={scss.TableCell}>{item.specialization}</td>
										<td className={scss.TableCell}>{item.phoneNumber}</td>
										<td className={scss.TableCell}>{item.email}</td>
										<td className={scss.TableCell}>{item.group}</td>
										<td className={scss.TableCell}>
											<button
												className={scss.button}
												aria-controls={open ? 'basic-menu' : undefined}
												aria-haspopup="true"
												onClick={(e) => {
													handleClick(e);
													setDeleteById(item._id!);
												}}
											>
												<IconDotsVertical stroke={2} />
											</button>
											<Menu
												className={scss.deleteEdit}
												id="basic-menu"
												anchorEl={anchorEl}
												open={open}
												onClose={handleClose}
												MenuListProps={{ 'aria-labelledby': 'basic-button' }}
												elevation={0}
												anchorOrigin={{
													vertical: 'bottom',
													horizontal: 'right'
												}}
												transformOrigin={{
													vertical: 'top',
													horizontal: 'right'
												}}
											>
												<MenuItem
													style={{ display: 'flex', gap: '20px' }}
													className={scss.dropdown}
													onClick={() => {
														setOpenModalEdit(true);
														setAnchorEl(null);
													}}
												>
													<img src={editIcon} alt="Edit" />
													<p>Редактировать</p>
												</MenuItem>
												<MenuItem
													style={{ display: 'flex', gap: '20px' }}
													className={scss.dropdown}
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
			<DeleteTeacherModal
				openModalDelete={openModalDelete}
				closeModalDelete={setOpenModalDelete}
				deleteById={deleteById}
			/>

			<div className={scss.PaginationContainerParent}>
				{/* //! 1 */}
				<div className={scss.PaginationInput}>
					<div className={scss.callInput}>
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
					<Stack direction="row" spacing={2}>
						{/* //! 2 */}

						<Pagination
							count={Math.ceil(data!.length / rowsPerPage)}
							page={currentPage}
							onChange={handlePageChangeC}
							shape="rounded"
							variant="outlined"
						/>
					</Stack>
					{/* //! 3 */}
					<div className={scss.callInput}>
						<p>Показать</p>
						<input
							type="text"
							value={openPage}
							onChange={(e) => setOpenPage(e.target.value)}
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

export default Teachers;
