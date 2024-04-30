import scss from './InternalStudents.module.scss';
import { KeyboardEvent, useState } from 'react';
import { Pagination, Stack } from '@mui/material';
import { useGetStudentTableQuery } from '@/src/redux/api/admin/student';
import { Preloader } from '@/src/ui/preloader/Preloader';
import { IconArticle, IconBook } from '@tabler/icons-react';

interface Student {
	_id: number;
	firstName: string;
	lastName: string;
	group: string;
	TrainingFormat: string;
	phone_number: string;
	email: string;
	password: string;
	isCompleted: boolean;
}

const InternalStudents = () => {
	// const { groupId } = useParams();
	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(12);
	const [openPart, setOpenPart] = useState(1);
	const [openPage, setOpenPage] = useState(12);
	const { data, isLoading } = useGetStudentTableQuery();

	if (isLoading) {
		return (
			<div>
				<Preloader />
			</div>
		);
	}

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

	const handlePageChangeC = (
		_e: React.ChangeEvent<unknown>,
		page: number
	): void => {
		setCurrentPage(page);
	};

	const handleAppend = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			const newOpenPage = parseInt(event.currentTarget.value);
			if (newOpenPage > 15) {
				setRowsPerPage(newOpenPage);
				setOpenPart(1);
				setCurrentPage(1);
				openPartFunc();
			} else {
				setRowsPerPage(15);
			}
		}
	};

	return (
		<div className={scss.internal_student}>
			<div className={scss.container}>
				<div className={scss.content_table}>
					<h1 className={scss.title}>Data Engineer</h1>
					<div
						style={{
							height: '577px',
							background: '#eff0f4'
						}}
					>
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<div className={scss.internal_container}>
								<table className={scss.table}>
									<thead>
										<tr>
											<th style={{ textAlign: 'start' }}>№</th>
											<th>Имя</th>
											<th>Фамилия</th>
											<th>Группа</th>
											<th>Формат обучения</th>
											<th>Номер телефона</th>
											<th>E-mail</th>
										</tr>
									</thead>
									<tbody>
										{data

											?.slice(
												(currentPage - 1) * rowsPerPage,
												currentPage * rowsPerPage
											)
											.map((item: Student, index) => (
												<tr
													key={item._id}
													className={
														index % 2 === 1
															? scss.table_alternate_row
															: '' || scss.internal
													}
												>
													<td>{index + 1 + (currentPage - 1) * rowsPerPage}</td>

													<td>{item.firstName}</td>
													<td>{item.lastName}</td>
													<td>{item.group}</td>
													<td>{item.TrainingFormat}</td>
													<td>{item.phone_number}</td>
													<td>{item.email}</td>
												</tr>
											))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
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
		</div>
	);
};

export default InternalStudents;
