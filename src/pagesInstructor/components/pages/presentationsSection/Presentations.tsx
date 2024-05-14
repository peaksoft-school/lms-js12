import { FC, useState, useEffect } from 'react';
import scss from './Presentations.module.scss';
import deleteIcon from '@/src/assets/svgs/delete-red.svg';
import { Button, Menu, MenuItem, Pagination, Stack } from '@mui/material';
import {
	IconArticle,
	IconBook,
	IconDotsVertical,
	IconPlus
} from '@tabler/icons-react';
import editIcon from '@/src/assets/svgs/edit.svg';
import { Preloader } from '@/src/ui/preloader/Preloader';
import DeleteMaterial from '@/src/ui/customModal/deleteModal/DeleteMaterial';
import ModalMaterialEdit from '@/src/ui/customModal/ModalMaterialEdit';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useNavigate } from 'react-router-dom';
import { useGetPresentationsQuery } from '@/src/redux/api/instructor/presentations';
import ModalAddPresentation from '@/src/ui/InstructorModal/ModalAddPresentation';
import DotsHorizont from '@/src/assets/icon-Dots-Horizont';
interface TodoProps {
	title: string;
	_id: number;
	description: string;
	file: string;
}
const Presentations: FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(12);
	const [openPart, setOpenPart] = useState(1);
	const [openPage, setOpenPage] = useState(12);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [openModalDelete, setOpenModalDelete] = useState(false);
	const [deleteById, setDeleteById] = useState<number | null>(null);
	const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
	const { data, isLoading } = useGetPresentationsQuery();
	const [todos, setTodos] = useState<TodoProps[]>([]);
	const [saveIdSrorege, setSaveIdStorege] = useState<string>('');

	useEffect(() => {
		if (data) {
			setTodos(data);
		}
	}, [data]);

	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
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

	const handleAppend = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			const newOpenPage = parseInt(event.currentTarget.value);
			if (newOpenPage > 12) {
				setRowsPerPage(newOpenPage);
				setOpenPart(1);
				setCurrentPage(1);
			} else {
				setRowsPerPage(12);
			}
		}
	};

	const handleAddPresentation = (e: React.MouseEvent<HTMLButtonElement>) => {
		setOpenModalEdit(true);
		e.preventDefault();
	};

	localStorage.setItem('lessonId', saveIdSrorege);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	return (
		<div className={scss.material}>
			<div className={scss.container}>
				<DragDropContext onDragEnd={handleDragEnd}>
					<div className={scss.button_title_elements}>
						<Button
							size="large"
							className={scss.button}
							onClick={handleAddPresentation}
							variant="contained"
						>
							<div className={scss.icon}>
								<IconPlus stroke={2} />
							</div>
							<span>Добавить презентацию</span>
						</Button>
					</div>
					<div style={{ height: '577px', background: '#bec0c7' }}>
						<div className={scss.table_container}>
							<div className={scss.material_content}>
								<ul>
									{todos
										.slice(
											(currentPage - 1) * rowsPerPage,
											currentPage * rowsPerPage
										)
										.map((todo, item) => (
											<li key={item.id}>
												<h1>item.title</h1>
												<p>item.description</p>
												<p>item.file</p>
												<button
													className={scss.button}
													aria-controls={open ? 'basic-menu' : undefined}
													aria-haspopup="true"
													onClick={(e) => {
														handleClick(e);
														setDeleteById(todo._id);
													}}
												>
													<DotsHorizont />
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
											</li>
										))}
								</ul>
								<ModalMaterialEdit
									openModalEdit={openModalEdit}
									closeModalEdit={() => setOpenModalEdit(false)}
									deleteById={deleteById}
								/>
								<DeleteMaterial
									open={openModalDelete}
									handleCloseModal={handleClose}
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
								onKeyDown={(e) => handleAppend(e)}
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
								onKeyDown={(e) => handleAppend(e)}
							/>
						</div>
					</div>
				</DragDropContext>
			</div>
			<ModalAddPresentation
				open={openModalEdit}
				handleClose={() => setOpenModalEdit(false)}
			/>
		</div>
	);
};

export default Presentations;
