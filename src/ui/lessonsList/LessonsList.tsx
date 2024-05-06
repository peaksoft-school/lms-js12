// import { IconArticle, IconBook } from '@tabler/icons-react';
import scss from './LessonsList.module.scss';
import arrowIcon from '@/src/assets/svgs/arrow-right.svg';
// import { Pagination, Stack } from '@mui/material';
// import { useState, KeyboardEvent } from 'react';
// import { useGetAnnouncementTableQuery } from '@/src/redux/api/admin/announcement';

const LessonsList = () => {
	// const { data } = useGetAnnouncementTableQuery();
	// const [openPart, setOpenPart] = useState(1);
	// const [openPage, setOpenPage] = useState(4);
	// const [currentPage, setCurrentPage] = useState(1);
	// const [rowsPerPage, setRowsPerPage] = useState(4);

	// const handlePageChangeC = (
	// 	_e: React.ChangeEvent<unknown>,
	// 	page: number
	// ): void => {
	// 	setCurrentPage(page);
	// };

	// const openPartFunc = () => {
	// 	if (openPart >= 1) {
	// 		setRowsPerPage(4);
	// 		setOpenPage(4);
	// 		setCurrentPage(openPart);
	// 	}
	// };

	// const openPartPage = () => {
	// 	if (rowsPerPage > 4) {
	// 		setCurrentPage(1);
	// 	}
	// };

	// const handleAppend = (event: KeyboardEvent<HTMLInputElement>) => {
	// 	if (event.key === 'Enter') {
	// 		const newOpenPage = parseInt(event.currentTarget.value);
	// 		if (newOpenPage > 4) {
	// 			setRowsPerPage(newOpenPage);
	// 			setOpenPart(1);
	// 			setCurrentPage(1);
	// 			openPartFunc();
	// 		} else {
	// 			setRowsPerPage(4);
	// 		}
	// 	}
	// };

	return (
		<div className={scss.List_lessons}>
			<div className={scss.top_container}>
				<div className={scss.lesson}>
					<p>
						<a className={scss.title_lesson_1} href="#">
							Мои курсы
						</a>
					</p>
					<img className={scss.img_arrow} src={arrowIcon} alt="" />
					<p>
						<a className={scss.title_lesson_2} href="#">
							Data Engineer
						</a>
					</p>
				</div>
				<div>
					<h2 className={scss.title_lesson}>Data Engineer</h2>
				</div>
			</div>
			<div className={scss.card_lesson}>
				<div className={scss.card_container}>
					<a className={scss.card_link} href="#">
						<span className={scss.card_item}>№ Название урока</span>
					</a>
				</div>
				<div className={scss.card_container}>
					<a className={scss.card_link} href="#">
						<span className={scss.card_item}>№ Название урока</span>
					</a>
				</div>
				<div className={scss.card_container}>
					<a className={scss.card_link} href="#">
						<span className={scss.card_item}>№ Название урока</span>
					</a>
				</div>
				<div className={scss.card_container}>
					<a className={scss.card_link} href="#">
						<span className={scss.card_item}>№ Название урока</span>
					</a>
				</div>

				{/* <div className={scss.pagination}>
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
				</div> */}
			</div>
		</div>
	);
};

export default LessonsList;
