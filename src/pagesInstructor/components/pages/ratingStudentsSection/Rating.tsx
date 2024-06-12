import { useGetStudentTableQuery } from '@/src/redux/api/admin/student';
import scss from './Rating.module.scss';
import { Preloader } from '@/src/ui/preloader/Preloader';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Button, Menu, MenuItem, InputBase } from '@mui/material';
import { ScrollArea, Box } from '@mantine/core';
import { IconCaretDown, IconPlus } from '@tabler/icons-react';
import { useGetTaskInstructorQuery } from '@/src/redux/api/instructor/addTask';
import deleteImg from '@/src/assets/svgs/delete-red.svg';
import { useGetMaterialsQuery } from '@/src/redux/api/instructor/materials';
import AddExem from '@/src/ui/InstructorModal/AddExem';
import {
	useDeleteExemInstructorMutation,
	useGetExemInstructorQuery
} from '@/src/redux/api/instructor/exem';

const Rating = () => {
	const { courseId } = useParams();
	const { data: strudents = [], isLoading } = useGetStudentTableQuery();
	const { data } = useGetMaterialsQuery();
	const { data: task = [] } = useGetTaskInstructorQuery();
	const { data: exem = [] } = useGetExemInstructorQuery();
	const [openModal, setOpenModal] = useState(false);
	const [deleteExemInstructor] = useDeleteExemInstructorMutation();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
	
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleOpen = () => {
		setOpenModal(true);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl2(event.currentTarget);
	};
	const handleClose2 = () => {
		setAnchorEl2(null);
	};

	if (isLoading) {
		return (
			<div>
				<Preloader />
			</div>
		);
	}

	const truncateText = (text: string, maxLength: number) => {
		if (text.length > maxLength) {
			return text.substring(0, maxLength) + '...';
		}
		return text;
	};

	const deleteFunc = async (id: number) => {
		await deleteExemInstructor(id);
	};
	return (
		<div className={scss.rating}>
			<h1>Студенты</h1>
			<div className={scss.scroll_table}>
				<ScrollArea type="always" scrollbars="xy" offsetScrollbars>
					<Box>
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<div className={scss.rating_container}>
								<table className={scss.Table}>
									<thead>
										<tr>
											<th className={scss.number} rowSpan={2}>
												№
											</th>
											<th className={scss.name} rowSpan={2}>
												Имя Фамилия
											</th>

											{data?.map((item) => (
												<>
													<th key={item._id} className={scss.lesson}>
														{item.title}
													</th>
												</>
											))}
											<th rowSpan={2}>
												Экзамен
												<Button
													variant="contained"
													size="small"
													className={scss.button}
													onClick={handleClick}
												>
													<IconCaretDown stroke={2} />
													<Menu
														id="positioned-menu"
														anchorEl={anchorEl}
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
																border: 'none'
															}
														}}
													>
														<MenuItem
															style={{ display: 'flex', gap: '10px' }}
															onClick={handleOpen}
														>
															<IconPlus stroke={2} />
															Добавить столбец
														</MenuItem>
													</Menu>
												</Button>
											</th>
											{exem.map((el) => (
												<th rowSpan={2}>
													<div key={el._id}>
														<div>{el.title}</div>
														<Button
															variant="contained"
															size="small"
															className={scss.button}
															onClick={handleClick2}
														>
															<IconCaretDown stroke={2} />
														</Button>
														<Menu
															id="positioned-menu"
															anchorEl={anchorEl}
															open={open2}
															onClose={handleClose2}
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
																	border: 'none'
																}
															}}
														>
															<MenuItem
																style={{ display: 'flex', gap: '10px' }}
																onClick={handleOpen}
															>
																<IconPlus stroke={2} />
																Добавить столбец
															</MenuItem>
															<MenuItem
																style={{ display: 'flex', gap: '10px' }}
																onClick={() => deleteFunc(el._id)}
															>
																<img src={deleteImg} alt="" />
																Удалить столбец
															</MenuItem>
														</Menu>
														<p>{el.date}</p>
													</div>
												</th>
											))}
											<th rowSpan={2}>Итого</th>
										</tr>
										<tr>
											{task?.map((item) => (
												<>
													<th key={item._id} className={scss.lesson}>
														{truncateText(item.title, 10)}
													</th>
												</>
											))}
										</tr>
									</thead>
									<tbody>
										{data &&
											strudents.map((item, index) => (
												<tr key={item.id} className={scss.TableContainerSecond}>
													<td className={scss.number}>{index + 1}</td>
													<td className={scss.TableCell}>
														{item.firstName} {item.lastName}
													</td>
													{data?.map((item) => (
														<td key={item._id}>
															<Link
																to={`/instructor/course/${courseId}/materials`}
															>
																0
															</Link>
														</td>
													))}
													<td>
														<InputBase defaultValue={0} />
													</td>

													{exem.map(() => (
														<td>
															<InputBase defaultValue={0} />
														</td>
													))}
													<td>{Math.floor((100 * 9) / data.length)} %</td>
												</tr>
											))}
									</tbody>
								</table>
							</div>
						</div>
					</Box>
				</ScrollArea>
				<AddExem open={openModal} handleClose={() => setOpenModal(false)} />
			</div>
		</div>
	);
};

export default Rating;
