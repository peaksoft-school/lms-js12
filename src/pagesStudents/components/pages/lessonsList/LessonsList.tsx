import scss from './LessonsList.module.scss';
import arrowIcon from '@/src/assets/svgs/arrow-right.svg';
import { Pagination, Stack } from '@mui/material';
import { useState, KeyboardEvent } from 'react';
import { useGetMaterialsQuery } from '@/src/redux/api/instructor/materials';
import { useNavigate } from 'react-router-dom';

const LessonsList = () => {
	const [openPart, setOpenPart] = useState(1);
	const [openPage, setOpenPage] = useState(12);
	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(12);
	const { data: data = [] } = useGetMaterialsQuery();

	const navigate = useNavigate();

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

	const id = localStorage.getItem('id');

	return (
		<div className={scss.list_lessons}>
			<div className={scss.container}>
				<div className={scss.lesson}></div>
				<div>
					<h1 className={scss.title_lesson}>{localStorage.getItem('item')}</h1>
				</div>

				<div
					style={{
						height: '560px',
						overflowY: 'scroll',
						scrollbarWidth: 'thin',
						scrollbarColor: '#3772ff #fff'
					}}
				>
					<div className={scss.card}>
						{data
							?.slice(
								(currentPage - 1) * rowsPerPage,
								currentPage * rowsPerPage
							)
							.map((item) => (
								<div
									className={scss.cards}
									onClick={() => {
										localStorage.setItem('lessonId', String(item._id));
										localStorage.setItem('taskName', String(item.title));
										setTimeout(() => {
											navigate(`/courses/${id}/materials/${item._id}`);
										}, 1000);
									}}
									key={item._id}
								>
									<a href="#" className={scss.link}>
										<span className={scss.card_item}>№ {item.title}</span>
									</a>
								</div>
							))}
					</div>
				</div>

				<div className={scss.pagination}>
					<div className={scss.callInput}>
						<p>Перейти на страницу</p>
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
					<div className={scss.callInput}>
						<p>Показать</p>
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
