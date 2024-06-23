import { FC, useState, KeyboardEvent } from 'react';
import { IconArticle, IconBook } from '@tabler/icons-react';
import scss from './Courses.module.scss';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { Box, ScrollArea } from '@mantine/core';
import { useGetStudentsCourseQuery } from '@/src/redux/api/students/courses';
import NotCreatedWithoutButton from '@/src/ui/notCreated/NotCreatedWithoutButton';

const Courses: FC = () => {
	const { data } = useGetStudentsCourseQuery();
	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(8);
	const [openPart, setOpenPart] = useState(1);
	const [openPage, setOpenPage] = useState(8);
	const [saveItem, setSaveItem] = useState('');

	const navigate = useNavigate();

	const handlePageChangeC = (
		_e: React.ChangeEvent<unknown>,
		page: number
	): void => {
		setCurrentPage(page);
	};

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

	localStorage.setItem('item', saveItem);

	return (
		<div className={scss.course}>
			<div className={scss.content}>
				<div className={scss.container}>
					{data?.courses.length === 0 ? (
						<>
							<NotCreatedWithoutButton
								text="У вас еще нет курсы !"
								name="Мои курсы"
							/>
						</>
					) : (
						<>
							<h1 className={scss.title}>Мои курсы</h1>
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
												{data?.courses.map((item) => (
													<div
														key={item.id}
														className={scss.zero_block_container}
													>
														<div
															onClick={() => {
																setSaveItem(item.title);
															}}
														>
															<div
																onClick={() => {
																	setTimeout(() => {
																		navigate(`/courses/${item.id}/materials`);
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
													</div>
												))}
											</div>
											{/* ) : null} */}
										</div>
									</div>
								</Box>
							</ScrollArea>
						</>
					)}
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
								// count={Math.ceil(data!.length / rowsPerPage)}
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
		</div>
	);
};

export default Courses;
