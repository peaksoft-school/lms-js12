import { FC, useState, KeyboardEvent } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import deleteImg from '@/src/assets/svgs/delete-red.svg';
import editImg from '@/src/assets/svgs/edit.svg';
import { IconArticle, IconBook, IconDots, IconPlus } from '@tabler/icons-react';
import scss from './Group.module.scss';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useGetGroupQuery } from '@/src/redux/api/admin/groups';
import CreateGroup from '@/src/ui/customModal/createGroup/CreateGroup';
import EditGroup from '@/src/ui/customModal/editGroup/EditGroup';
import DeleteGroupModal from '@/src/ui/customModal/deleteModal/DeleteGroups';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Box, ScrollArea } from '@mantine/core';

const Groups: FC = () => {
	const [openEditModal, setOpenEditModal] = useState(false);
	const { data } = useGetGroupQuery();
	const [saveId, setSaveId] = useState<null | number>(null);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [deleteModal, setDeleteModal] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(8);
	const [openPart, setOpenPart] = useState(1);
	const [openPage, setOpenPage] = useState(8);
	const [openGroups, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleCloseCourses = () => setOpen(false);

	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handlePageChangeC = (
		_e: React.ChangeEvent<unknown>,
		page: number
	): void => {
		setCurrentPage(page);
	};

	const handleCloseEditModal = () => setOpenEditModal(false);
	const openPartFunc = () => {
		if (openPart >= 1) {
			setRowsPerPage(8);
			setOpenPage(8);
			setCurrentPage(openPart);
		}
	};
	const openPartPage = () => {
		if (rowsPerPage > 8) {
			setCurrentPage(1);
		}
	};

	const handleAppend = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			const newOpenPage = parseInt(event.currentTarget.value);
			if (newOpenPage > 8) {
				setRowsPerPage(newOpenPage);
				setOpenPart(1);
				setCurrentPage(1);
				openPartFunc();
			} else {
				setRowsPerPage(8);
			}
		}
	};

	return (
		<div className={scss.group}>
			<div className={scss.content}>
				<div className={scss.container}>
					<div className={scss.course_button_modal}>
						<Button
							type="button"
							size="large"
							className={scss.button}
							onClick={handleOpen}
							variant="contained"
						>
							<div className={scss.icon}>
								<IconPlus stroke={2} />
							</div>
							<span>Создать группу</span>
						</Button>
					</div>

					<h1 className={scss.title}>Группы</h1>

					<ScrollArea
						type="always"
						scrollbars="xy"
						offsetScrollbars
						classNames={scss}
					>
						<Box>
							<div>
								<div className={scss.cards}>
									{data && Array.isArray(data) && data.length > 0 ? (
										<div className={scss.card}>
											{data
												.slice(
													(currentPage - 1) * rowsPerPage,
													currentPage * rowsPerPage
												)
												.map((item) => (
													<div
														key={item.id}
														className={scss.zero_block_container}
													>
														<Link to={`/admin/group/${item.id}`}>
															<div className={scss.block_photo_cards}>
																<img src={item.img} alt="images" />
															</div>
															<div className={scss.block_cont}>
																<div className={scss.second_block_container}>
																	<p className={scss.block_title}>
																		{item.title}
																	</p>
																	<p className={scss.block_date}>{item.date}</p>
																</div>
																<div className={scss.text_card}>
																	<span className={scss.block_text}>
																		{item.text && item.text.length > 60
																			? `${item.text.substring(0, 60)}...`
																			: item.text}
																	</span>
																</div>
															</div>
														</Link>

														<div className={scss.block_button_div}>
															<div onClick={handleClick}>
																<button
																	className={scss.block_button_dots}
																	onClick={() => {
																		setSaveId(item.id);
																	}}
																>
																	<IconDots stroke={2} />
																</button>
															</div>
															{
																<Menu
																	anchorEl={anchorEl}
																	id="positioned-menu"
																	open={open}
																	onClose={handleClose}
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
																			setOpenEditModal(true);
																			handleClose();
																		}}
																	>
																		<img src={editImg} alt="#" />
																		Редактировать
																	</MenuItem>
																	<MenuItem
																		style={{ display: 'flex', gap: '10px' }}
																		onClick={() => {
																			setDeleteModal(true);
																			handleClose();
																		}}
																	>
																		<img src={deleteImg} alt="#" />
																		Удалить
																	</MenuItem>
																</Menu>
															}
														</div>
													</div>
												))}
											<EditGroup
												open={openEditModal}
												handleClose={handleCloseEditModal}
												saveId={saveId}
											/>
										</div>
									) : null}
									<DeleteGroupModal
										openModalDelete={deleteModal}
										closeModalDelete={() => setDeleteModal(false)}
										deleteById={saveId}
									/>
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
								count={Math.ceil(data!.length / rowsPerPage)}
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

			<CreateGroup
				handleOpen={handleOpen}
				open={openGroups}
				handleClose={handleCloseCourses}
			/>
		</div>
	);
};

export default Groups;
