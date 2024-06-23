import scss from './InternalInstructorStudents.module.scss';
import { useState } from 'react';
import { Button, Pagination, Stack } from '@mui/material';
import { Preloader } from '@/src/ui/preloader/Preloader';
import { IconPlus, IconArticle, IconBook } from '@tabler/icons-react';
import { Box, ScrollArea } from '@mantine/core';
import { useGetStudentsTableQuery } from '@/src/redux/api/instructor/studentAddCourse';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ModalAddStudentToGroups from '@/src/ui/customModal/ModalAddStudentToGroups';

const InternalInstructorStudents = () => {
	const { courseId } = useParams();
	const course = Number(courseId);
	const [openPart, setOpenPart] = useState(1);
	const [openPage, setOpenPage] = useState(12);
	const [openModalEdit, setOpenModalEdit] = useState(false);
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

	const handleInputValue = (value: number) => {
		const valueString = value.toString();
		searchParams.set('page', valueString === '0' ? '1' : valueString);
		setSearchParams(searchParams);
		navigate(
			`/instructor/course/${courseId}/student/page/?${searchParams.toString()}`
		);
	};

	const handleInputValuePaginationSize = (value: number) => {
		const valueSize = value.toString();
		searchParams.set('size', valueSize);
		setSearchParams(searchParams);
		navigate(
			`/instructor/course/${courseId}/student/page/?${searchParams.toString()}`
		);
	};

	const { data, isLoading } = useGetStudentsTableQuery({
		course,
		page: searchParams.toString(),
		size: searchParams.toString()
	});
	if (isLoading) {
		return (
			<div>
				<Preloader />
			</div>
		);
	}

	return (
		<div className={scss.internal_student}>
			<div className={scss.container}>
				<div className={scss.content_table}>
					<div className={scss.delete_button_modal}>
						<Button
							size="large"
							className={scss.button}
							variant="contained"
							onClick={() => setOpenModalEdit(true)}
						>
							<div className={scss.icon}>
								<IconPlus stroke={2} />
							</div>
							<ModalAddStudentToGroups
								openModalEdit={openModalEdit}
								handleClose={setOpenModalEdit}
							/>
							<span>Добавить группу на курса</span>
						</Button>
					</div>
					<h1 className={scss.title}>Студенты</h1>
					<ScrollArea type="always" scrollbars="xy" offsetScrollbars>
						<Box>
							<div>
								<div style={{ display: 'flex', justifyContent: 'center' }}>
									<div className={scss.internal_container}>
										<table className={scss.table}>
											<thead>
												<tr>
													<th style={{ textAlign: 'start' }}>№</th>
													<th>Имя Фамилия</th>
													<th>Группа</th>
													<th>Формат обучения</th>
													<th>Номер телефона</th>
													<th>E-mail</th>
												</tr>
											</thead>
											<tbody>
												{data?.getAllStudentsOfCourses &&
													data.getAllStudentsOfCourses.map((item, index) => (
														<tr
															key={item.id}
															className={
																index % 2 === 1 ? scss.table_alternate_row : ''
															}
														>
															<td>{index + 1}</td>
															<td>{item.fullName}</td>
															<td>{item.courseName}</td>
															<td>{item.specializationOrStudyFormat}</td>
															<td>{item.phoneNumber}</td>
															<td>{item.email}</td>
														</tr>
													))}
											</tbody>
										</table>
									</div>
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
							onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
								if (e.key === 'Enter') {
									handleInputValue(openPart);
								}
							}}
						/>
					</div>
					<div className={scss.stack}>
						<Stack direction="row" spacing={2}>
							<Pagination page={openPage} shape="rounded" variant="outlined" />
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
							onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
								if (e.key === 'Enter') {
									handleInputValuePaginationSize(openPage);
								}
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InternalInstructorStudents;
