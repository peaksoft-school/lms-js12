import { FC, useState, KeyboardEvent, MouseEvent } from 'react';
import scss from './Materials.module.scss';
import deleteIcon from '@/src/assets/svgs/delete-red.svg';
import { Button, Menu, MenuItem, Pagination, Stack } from '@mui/material';
import {
	IconArticle,
	IconBook,
	IconDotsVertical,
	IconEqual,
	IconPlus
} from '@tabler/icons-react';
import editIcon from '@/src/assets/svgs/edit.svg';
import ModalAddLesson from '@/src/ui/InstructorModal/ModalAddLesson';
import { useGetMaterialsQuery } from '@/src/redux/api/instructor/materials';
import { Preloader } from '@/src/ui/preloader/Preloader';
import DeleteMaterial from '@/src/ui/customModal/deleteModal/DeleteMaterial';
import ModalMaterialEdit from '@/src/ui/customModal/ModalMaterialEdit';

const Materials: FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(12);
	const [openPart, setOpenPart] = useState(1);
	const [openPage, setOpenPage] = useState(12);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [openModalDelete, setOpenModalDelete] = useState(false);
	const [deleteById, setDeleteById] = useState<number | null>(null);
	const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);

	const { data, isLoading } = useGetMaterialsQuery();
	const [openAddMaterial, setOpenAddMaterial] = useState<boolean>(false);

	const handleMaterialClose = () => {
		setOpenAddMaterial(false);
	};

	const handleCloseModal = () => {
		setOpenModalDelete(false);
	};

	if (isLoading) {
		return (
			<div>
				<Preloader />
			</div>
		);
	}

	const open = Boolean(anchorEl);

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handlePageChangeC = (
		_e: React.ChangeEvent<unknown>,
		page: number
	): void => {
		setCurrentPage(page);
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

	const handleAddLesson = (e: MouseEvent<HTMLButtonElement>) => {
		setOpenAddMaterial(true);
		e.preventDefault();
	};

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	return (
		<div className={scss.material}>
			<div className={scss.container}>
				<div className={scss.button_title_elements}>
					<Button
						size="large"
						className={scss.button}
						onClick={handleAddLesson}
						variant="contained"
					>
						<div className={scss.icon}>
							<IconPlus stroke={2} />
						</div>
						<span>Создать урок</span>
					</Button>
				</div>
				<h1>Материалы</h1>
				<div style={{ height: '577px', background: '#eff0f4' }}>
					<div className={scss.table_container}>
						<div className={scss.material_content}>
							<table className={scss.table}>
								<thead>
									<tr>
										<th>Название урока</th>
										<th className={scss.date}>Дата публикации</th>
										<th className={scss.last_th}>Действие</th>
									</tr>
								</thead>
								<tbody>
									{data
										?.slice(
											(currentPage - 1) * rowsPerPage,
											currentPage * rowsPerPage
										)
										.map((card, index) => (
											<tr
												className={
													index % 2 === 1
														? scss.table_alternate_row
														: '' || scss.table_container_second
												}
											>
												<td
													style={{
														paddingLeft: '20px',
														paddingTop: '12px',
														display: 'flex',
														gap: '10px',
														alignItems: 'center'
													}}
												>
													<IconEqual stroke={2} />
													{card.title}
												</td>
												<td style={{ textAlign: 'end', paddingRight: '70px' }}>
													{card.date}
												</td>
												<td className={scss.TableCellIcon}>
													<button
														className={scss.button}
														aria-controls={open ? 'basic-menu' : undefined}
														aria-haspopup="true"
														onClick={(e) => {
															handleClick(e);
															setDeleteById(card._id);
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

							<ModalMaterialEdit
								openModalEdit={openModalEdit}
								closeModalEdit={() => setOpenModalEdit(false)}
								deleteById={deleteById}
							/>

							<DeleteMaterial
								open={openModalDelete}
								handleCloseModal={handleCloseModal}
								deleteById={deleteById}
							/>
						</div>
					</div>
				</div>
				<div className={scss.pagination}>
					<div className={scss.Inputs}>
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
								count={Math.ceil(data!.length / rowsPerPage)}
								page={currentPage}
								onChange={handlePageChangeC}
								shape="rounded"
								variant="outlined"
							/>
						</Stack>
					</div>
					<div className={scss.Inputs}>
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
			<ModalAddLesson
				open={openAddMaterial}
				handleClose={handleMaterialClose}
			/>
		</div>
	);
};

export default Materials;
