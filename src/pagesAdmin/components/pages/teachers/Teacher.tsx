import React, { FC, useState } from 'react';
import scss from './Teachers.module.scss';
import { useGetTeacherQuery } from '@/src/redux/api/teacher';
import ModalAddTeacher from '@/src/ui/customModal/ModalAddTeacher';
import { IconDotsVertical } from '@tabler/icons-react';
import edit from '@/src/assets/svgs/edit.svg';
import deleteIcon from '@/src/assets/svgs/delete-red.svg';
import { Menu, MenuItem } from '@mui/material';
import DeleteTeacherModal from '@/src/ui/customModal/deleteModal/DeleteTeacherModal';
import ModalEditTeacher from '@/src/ui/customModal/ModalEditTeacher';

const Table: FC = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
	const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
	const [deleteById, setDeleteById] = useState<number | null>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const { data, isLoading } = useGetTeacherQuery();

	if (isLoading) {
		return <div>...Loading</div>;
	}

	return (
		<>
			<div className={scss.modal}>
				<ModalAddTeacher />
			</div>
			<div className={scss.TableContainer}>
				<table className={scss.Table}>
					<thead>
						<tr>
							<th className={scss.TableTh}>N</th>
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
							data.map((item, index) => (
								<React.Fragment key={item._id}>
									<tr
										className={`${scss.TableContainerSecond} ${
											index % 2 === 1 ? scss.TableAlternateRow : ''
										}`}
									>
										<td className={scss.TableCell}>{item._id}</td>
										<td className={scss.TableCell}>
											{item.firstName} {item.lastName}
										</td>
										<td className={scss.TableCell}>{item.specialization}</td>
										<td className={scss.TableCell}>{item.phoneNumber}</td>
										<td className={scss.TableCell}>{item.email}</td>
										<td className={scss.TableCell}>{item.group}</td>
										<td className={scss.TableCell}>
											<button
												id="basic-button"
												aria-controls={open ? 'basic-menu' : undefined}
												aria-haspopup="true"
												aria-expanded={open ? 'true' : undefined}
												onClick={(e) => {
													handleClick(e);
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
											>
												<MenuItem
													className={scss.dropdown}
													onClick={() => {
														handleClose();
														setDeleteById(item._id!);
														setOpenModalEdit(true);
													}}
												>
													<img src={edit} alt="" />
													<p>Редактировать</p>
												</MenuItem>
												<MenuItem
													className={scss.dropdown}
													onClick={() => {
														handleClose();
														setDeleteById(item._id!);
														setOpenModalDelete(true);
													}}
												>
													<img src={deleteIcon} alt="" />
													<p>Удалить</p>
												</MenuItem>
											</Menu>
										</td>
									</tr>
								</React.Fragment>
							))}
					</tbody>
				</table>
				<ModalEditTeacher
					openModalEdit={openModalEdit}
					closeModalEdit={setOpenModalEdit}
					deleteById={deleteById}
				/>
			</div>
			<DeleteTeacherModal
				openModalDelete={openModalDelete}
				closeModalDelete={setOpenModalDelete}
				deleteById={deleteById}
			/>
		</>
	);
};

export default Table;
