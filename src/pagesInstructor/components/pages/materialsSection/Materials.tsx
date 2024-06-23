import { FC, useState, useEffect } from 'react';
import scss from './Materials.module.scss';
import deleteIcon from '@/src/assets/svgs/delete-red.svg';
import empty from '@/src/assets/notCreated0.png';
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
import {
	DragDropContext,
	Droppable,
	Draggable,
	DropResult
} from '@hello-pangea/dnd';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Box, ScrollArea } from '@mantine/core';

interface TodoProps {
	id: number;
	title: string;
	createdAt: string;
}

const Materials: FC = () => {
	const { courseId, lessonId } = useParams();
	const [currentPage, setCurrentPage] = useState(1);
	const [openPart, setOpenPart] = useState(1);
	const [openPage, setOpenPage] = useState(12);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [openModalDelete, setOpenModalDelete] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [deleteById, setDeleteById] = useState<number | null>(null);
	const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
	const course = Number(courseId);
	const { data, isLoading } = useGetMaterialsQuery(course);
	const [todos, setTodos] = useState<TodoProps[]>([]);
	const navigate = useNavigate();
	const handleOpen = () => setOpenModal(true);

	useEffect(() => {
		if (todos.length > 0) {
			localStorage.setItem('todos', JSON.stringify(todos));
		}
	}, [todos]);

	const handleDragEnd = (result: DropResult) => {
		if (!result.destination) return;
		const startIndex = result.source.index;
		const endIndex = result.destination.index;
		const copyTodos = [...todos];
		const [reorderTodo] = copyTodos.splice(startIndex, 1);
		copyTodos.splice(endIndex, 0, reorderTodo);
		setTodos(copyTodos);
	};
	const { pathname } = useLocation();

	if (!courseId) {
		return <div>Error: Course ID is missing!</div>;
	}

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

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const item = localStorage.getItem('item');

	return (
		<div className={scss.material}>
			<div className={scss.container}>
				<DragDropContext onDragEnd={handleDragEnd}>
					<div style={{ minHeight: '76vh' }}>
						<div className={scss.button_title_elements}>
							<Button
								size="large"
								className={scss.button}
								onClick={() => setOpenModal(true)}
								variant="contained"
							>
								<div className={scss.icon}>
									<IconPlus stroke={2} />
								</div>
								<span>Создать урок</span>
							</Button>
						</div>
						<h1 className={scss.title}>{item}</h1>
						<ScrollArea
							type="always"
							scrollbars="xy"
							offsetScrollbars
							classNames={scss}
						>
							<Box>
								{data?.lessonResponses?.length === 0 ? (
									<div className={scss.empty_page}>
										<img src={empty} alt="" />
									</div>
								) : (
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
												<Droppable droppableId="todos">
													{(droppableProvider) => (
														<tbody
															ref={droppableProvider.innerRef}
															{...droppableProvider.droppableProps}
														>
															{data?.lessonResponses &&
																data?.lessonResponses.map((todo, index) => (
																	<Draggable
																		index={index}
																		key={todo.id}
																		draggableId={`${todo.id}`}
																	>
																		{(draggableProvider) => (
																			<tr
																				onClick={() =>
																					localStorage.setItem(
																						'taskName',
																						todo.title
																					)
																				}
																				className={
																					index % 2 === 1
																						? scss.table_alternate_row
																						: '' || scss.table_container_second
																				}
																				ref={draggableProvider.innerRef}
																				{...draggableProvider.draggableProps}
																				{...draggableProvider.dragHandleProps}
																			>
																				<td
																					onClick={() => {
																						setTimeout(() => {
																							navigate(
																								`/instructor/course/${courseId}/materials/${todo.id}/video`
																							);
																						}, 1000);
																					}}
																					style={{
																						paddingLeft: '20px',
																						paddingTop: '12px',
																						display: 'flex',
																						gap: '10px',
																						alignItems: 'center',
																						cursor: 'pointer'
																					}}
																				>
																					<IconEqual stroke={2} />
																					{todo.title}
																				</td>
																				<td
																					onClick={() => {
																						setTimeout(() => {
																							navigate(
																								`/instructor/course/${courseId}/materials/${todo.id}`
																							);
																						}, 500);
																					}}
																					style={{
																						textAlign: 'end',
																						paddingRight: '70px',
																						cursor: 'pointer'
																					}}
																				>
																					{todo.createdAt}
																				</td>
																				<td className={scss.TableCellIcon}>
																					<button
																						className={scss.button}
																						aria-controls={
																							open ? 'basic-menu' : undefined
																						}
																						aria-haspopup="true"
																						onClick={(e) => {
																							handleClick(e);
																							setDeleteById(todo.id);
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
																							style={{
																								display: 'flex',
																								gap: '10px'
																							}}
																							onClick={() => {
																								setOpenModalEdit(true);
																								setAnchorEl(null);
																							}}
																						>
																							<img src={editIcon} alt="Edit" />
																							<p>Редактировать</p>
																						</MenuItem>
																						<MenuItem
																							style={{
																								display: 'flex',
																								gap: '10px'
																							}}
																							onClick={() => {
																								setOpenModalDelete(true);
																								setAnchorEl(null);
																							}}
																						>
																							<img
																								src={deleteIcon}
																								alt="Delete"
																							/>
																							<p>Удалить</p>
																						</MenuItem>
																					</Menu>
																				</td>
																			</tr>
																		)}
																	</Draggable>
																))}
														</tbody>
													)}
												</Droppable>
											</table>
											<ModalMaterialEdit
												openModalEdit={openModalEdit}
												closeModalEdit={() => setOpenModalEdit(false)}
												deleteById={deleteById}
											/>
											<DeleteMaterial
												open={openModalDelete}
												handleCloseModal={() => setOpenModalDelete(false)}
												deleteById={deleteById}
											/>
										</div>
									</div>
								)}
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
							/>
						</div>
						<div className={scss.stack}>
							<Stack direction="row" spacing={2}>
								<Pagination
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
							/>
						</div>
					</div>
				</DragDropContext>
			</div>
			<ModalAddLesson
				open={openModal}
				handleOpen={handleOpen}
				handleClose={() => setOpenModal(false)}
			/>
			<ModalMaterialEdit
				openModalEdit={openModalEdit}
				closeModalEdit={() => setOpenModalEdit(false)}
				deleteById={deleteById}
			/>
		</div>
	);
};

export default Materials;
