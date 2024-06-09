import { FC, useState, KeyboardEvent } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import deleteImg from '@/src/assets/svgs/delete-red.svg';
import editImg from '@/src/assets/svgs/edit.svg';
import { IconArticle, IconBook, IconDots, IconPlus } from '@tabler/icons-react';
import scss from './Course.module.scss';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import DeleteCourses from '@/src/ui/customModal/deleteModal/DeleteCourse';
import EditCourse from '@/src/ui/customModal/editCourse/EditCourse';
import CreateCourse from '@/src/ui/customModal/createCourse/CreateCurse';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGetAdminCourseQuery } from '@/src/redux/api/admin/courses';
import { Box, ScrollArea } from '@mantine/core';

const Courses: FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(8);
	const [openEditModal, setOpenEditModal] = useState(false);
	const { data } = useGetAdminCourseQuery();
	const [saveId, setSaveId] = useState<null | number>(null);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [deleteModal, setDeleteModal] = useState(false);
	const [openPart, setOpenPart] = useState(1);
	const [openPage, setOpenPage] = useState(8);
	const [openCurse, setOpen] = useState(false);
	const handleOpenCourse = () => setOpen(true);
	const handleCloseCourses = () => setOpen(false);
	console.log(rowsPerPage, 'sli');

	const navigate = useNavigate();

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

	const handlePageShowChange = (
		page: string,
		size: string,
		e: KeyboardEvent<HTMLInputElement>
	) => {
		if (e.key === 'Enter') {
		}
	};

	return (
		<div className={scss.course}>
			<div className={scss.content}>
				<div className={scss.container}>
					<div className={scss.course_button_modal}>
						<Button
							size="large"
							className={scss.button}
							onClick={handleOpenCourse}
							variant="contained"
						>
							<div className={scss.icon}>
								<IconPlus stroke={2} />
							</div>
							<span>Создать курс</span>
						</Button>
					</div>
					<h1 className={scss.title}>Курсы</h1>
					<ScrollArea
						type="always"
						scrollbars="xy"
						offsetScrollbars
						classNames={scss}
					>
						<Box>
							<div>
								<div className={scss.cards}>
									<div className={scss.card}>
										{data?.courses &&
											data.courses.map((item) => (
												<div
													key={item.id}
													className={scss.zero_block_container}
												>
													<div>
														<div
															onClick={() => {
																setTimeout(() => {
																	navigate(`/admin/courses/${item.id}/teacher`);
																}, 1000);
															}}
														>
															<div className={scss.block_photo_cards}>
																<img
																	src={`https://lms-b12.s3.eu-central-1.amazonaws.com/${item.image}`}
																	alt="images"
																/>
															</div>
															<div className={scss.block_cont}>
																<div className={scss.second_block}>
																	<p className={scss.block_title}>
																		{item.title}
																	</p>
																	<p className={scss.block_date}>
																		{item.dateOfEnd}
																	</p>
																</div>
																<div className={scss.text_card}>
																	<span className={scss.block_text}>
																		{item.description &&
																		item.description.length > 60
																			? `${item.description.substring(0, 60)}...`
																			: item.description}
																	</span>
																</div>
															</div>
														</div>
													</div>
													<div className={scss.block_button_div}>
														<div onClick={handleClick}>
															<button
																className={scss.button_dots}
																onClick={() => {
																	setSaveId(item.id);
																}}
															>
																<IconDots stroke={2} />
															</button>
														</div>
														<Menu
															anchorEl={anchorEl}
															id="basic-menu"
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
													</div>
												</div>
											))}
										<EditCourse
											open={openEditModal}
											handleClose={handleCloseEditModal}
											saveId={saveId}
										/>
									</div>
									<DeleteCourses
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
					<div className={scss.Inputs}>
						<p className={scss.text}>Перейти на страницу</p>
						<div className={scss.pagination_element}>
							<IconBook stroke={2} />
						</div>
						<input
							type="text"
							value={openPart}
							onChange={(e) => setOpenPart(+e.target.value)}
							onKeyDown={(e) =>
								handlePageShowChange(
									openPart.toString(),
									openPage.toString(),
									e
								)
							}
						/>
					</div>
					<div className={scss.stack}>
						<Stack direction="row" spacing={2}>
							<Pagination
								count={Math.ceil(data!.courses.length / rowsPerPage)}
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
							onKeyDown={(e) =>
								handlePageShowChange(
									openPart.toString(),
									openPage.toString(),
									e
								)
							}
						/>
					</div>
				</div>
			</div>
			<CreateCourse
				handleOpenCourse={handleOpenCourse}
				open={openCurse}
				handleClose={handleCloseCourses}
			/>
		</div>
	);
};

export default Courses;
