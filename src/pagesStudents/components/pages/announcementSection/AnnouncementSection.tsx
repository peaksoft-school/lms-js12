import { useState } from 'react';
import scss from './AnnouncementSection.module.scss';
import { Pagination, Stack } from '@mui/material';
import { useGetAnnouncementStudentQuery } from '@/src/redux/api/students/announcement';
import { IconArticle, IconBook } from '@tabler/icons-react';

const AnnouncementSection = () => {
	const [openPart, setOpenPart] = useState(1);
	const [openPage, setOpenPage] = useState(4);
	const [rowsPerPage, setRowsPerPage] = useState(4);
	const [currentPage, setCurrentPage] = useState(1);

	const { data } = useGetAnnouncementStudentQuery();

	const handlePageChange = (_e, newPage) => {
		setCurrentPage(newPage);
	};

	const openPartFunc = () => {
		if (openPart >= 1) {
			setRowsPerPage(4);
			setOpenPage(4);
			setCurrentPage(openPart);
		}
	};

	const handleAppend = (event) => {
		if (event.key === 'Enter') {
			const newOpenPage = parseInt(event.currentTarget.value);
			if (newOpenPage > 4) {
				setRowsPerPage(newOpenPage);
				setOpenPart(1);
				setCurrentPage(1);
				openPartFunc();
			} else {
				setRowsPerPage(4);
			}
		}
	};

	return (
		<div className={scss.Section_announcement}>
			<h1>Объявление</h1>
			<div className={scss.announce_card}>
				{data?.announcements.map((item) => (
					<li key={item.announcementId} className={scss.announce_list}>
						<div className={scss.announcement_owners}>
							<p className={scss.announcement_owner}>
								<span className={scss.announc_user}>Кем создан:</span>
								{item.author}
							</p>
						</div>
						<p className={scss.announce_contents}>
							<span className={scss.announce_content}>Текст:</span>
							{item.content}
						</p>
					</li>
				))}
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
						onKeyDown={handleAppend}
					/>
				</div>
				<div className={scss.stack}>
					<Stack direction="row" spacing={2}>
						<Pagination
							count={Math.ceil((data?.announcements.length ?? 0) / rowsPerPage)}
							page={currentPage}
							onChange={handlePageChange}
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
						onKeyDown={handleAppend}
					/>
				</div>
			</div>
		</div>
	);
};

export default AnnouncementSection;
