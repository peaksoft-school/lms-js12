import { useState, KeyboardEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, ScrollArea } from '@mantine/core';
import { IconArticle, IconBook } from '@tabler/icons-react';
import { Pagination, Stack, Tooltip } from '@mui/material';
import { useGetStudentMaterialsQuery } from '@/src/redux/api/students/materials';
import scss from './LessonsList.module.scss';
import empty from '@/src/assets/notCreated0.png';

const LessonsList = () => {
	const { coursesId } = useParams();

	const [openPart, setOpenPart] = useState(1);
	const [openPage, setOpenPage] = useState(12);
	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(12);

	const course = Number(coursesId);

	const { data } = useGetStudentMaterialsQuery(course);

	const navigate = useNavigate();

	const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
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

	return (
		<div className={scss.list_lessons}>
			<div className={scss.container}>
				<div className={scss.title_lesson}>
					<h1>Материалы</h1>
				</div>
				<ScrollArea type="always" scrollbars="xy" offsetScrollbars>
					<Box>
						<div style={{ minHeight: '70vh' }}>
							{data?.objects.length === 0 ? (
								<div className={scss.empty_page}>
									<img src={empty} alt="Empty state" />
								</div>
							) : (
								<div className={scss.card}>
									{data?.objects.map((item) => (
										<div
											className={scss.cards}
											onClick={() => {
												localStorage.setItem('taskName', String(item.title));
												setTimeout(() => {
													navigate(
														`/courses/${coursesId}/materials/${item.id}`
													);
												}, 1000);
											}}
											key={item.id}
										>
											<a href="#" className={scss.link}>
												<span className={scss.card_item}>
													<Tooltip title={item.title}>
														<p
															style={{
																width: '100%',
																maxWidth: '200px',
																textOverflow: 'ellipsis',
																overflow: 'hidden',
																whiteSpace: 'nowrap'
															}}
														>
															№ {item.title}
														</p>
													</Tooltip>
												</span>
											</a>
										</div>
									))}
								</div>
							)}
						</div>
					</Box>
				</ScrollArea>

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
								page={currentPage}
								onChange={handlePageChange}
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
		</div>
	);
};

export default LessonsList;
