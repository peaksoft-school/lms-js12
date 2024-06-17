import React, { useState, KeyboardEvent } from 'react';
import scss from './Announcements.module.scss';
import { Button, Menu, MenuItem, Pagination, Stack } from '@mui/material';
import {
	useGetAnnouncementTableQuery,
	useShowAnnouncementMutation
} from '@/src/redux/api/admin/announcement';
import AnnouncementForm from '@/src/ui/announcementForm/AnnouncementForm';
import editIcon from '@/src/assets/svgs/edit.svg';
import deleteIcon from '@/src/assets/svgs/delete-red.svg';
import DotsHorizont from '@/src/assets/icon-Dots-Horizont';
import ModalEditAnnouncement from '@/src/ui/customModal/ModalEditAnnouncement';
import DeleteAnnouncementModal from '@/src/ui/customModal/deleteModal/DeleteAnnouncementModal';
import {
	IconArticle,
	IconBook,
	IconEye,
	IconEyeOff,
	IconPlus
} from '@tabler/icons-react';
import NotCreated from '@/src/ui/notCreated/NotCreated';

const Announcements = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
	const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
	const [deleteById, setDeleteById] = useState<number | null>(null);
	const { data } = useGetAnnouncementTableQuery();

	console.log(data, 'card');
	const [openAnnouncement, setOpenAnnouncement] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(4);
	const [openPart, setOpenPart] = useState(1);
	const [openPage, setOpenPage] = useState(4);
	const [showAnnouncement] = useShowAnnouncementMutation();

	const handleOpenAnnouncement = () => {
		setOpenAnnouncement(true);
	};
	const handleCloseAnnoucement = () => {
		setOpenAnnouncement(false);
	};

	const find = data?.announcements?.find((item) => item.id === deleteById);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handlePageChangeC = (
		_e: React.ChangeEvent<unknown>,
		page: number
	): void => {
		setCurrentPage(page);
	};
	const openPartFunc = () => {
		if (openPart >= 1) {
			setRowsPerPage(4);
			setOpenPage(4);
			setCurrentPage(openPart);
		}
	};
	const openPartPage = () => {
		if (rowsPerPage > 4) {
			setCurrentPage(1);
		}
	};
	const handleAppend = (event: KeyboardEvent<HTMLInputElement>) => {
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
	const handleShow = async (deleteById: number, isPublished: boolean) => {
		const newAnnoun = {
			isPublished: !isPublished
		};
		await showAnnouncement({ deleteById, newAnnoun });
	};

	if (data?.announcements.length === 0) {
		return (
			<NotCreated
				text="Вы пока не добавили обьявление!"
				buttontText="Добавить обьявление"
				name="Обьявление"
				buttonClick={handleOpenAnnouncement}
			/>
		);
	}
	return (
		<div className={scss.Section_announcement}>
			<div className={scss.main_container}>
				<div>
					<div className={scss.add_button_name}>
						<div className={scss.course_button_modal}>
							<Button
								size="large"
								className={scss.button}
								onClick={handleOpenAnnouncement}
								variant="contained"
							>
								<div className={scss.icon}>
									<IconPlus stroke={2} />
								</div>
								<span>Добавить обьявление</span>
							</Button>
						</div>
						<div>
							<h1>Объявление</h1>
						</div>
					</div>
					<div>
						<div className={scss.announce_box}>
							<ul className={scss.announce_card}>
								{data?.announcements.map((item) => (
									<li key={item.id} className={scss.announce_list}>
										<div className={scss.show_text}>
											{item?.isPublished === true ? (
												<>
													<p style={{ color: '#0ECE22 ', fontSize: '16px' }}>
														Видно
													</p>
												</>
											) : (
												<>
													<p style={{ color: 'red' }}>Не видно</p>
												</>
											)}
										</div>
										<div className={scss.announcement_owners}>
											<p className={scss.announcement_owner}>
												<p className={scss.announc_user}>Кем создан:</p>
												{item.owner}
											</p>
										</div>
										<p>
											<p className={scss.announce_groups}>Для кого:</p>
											{item.groupNames.join(', ')}
										</p>
										<p>
											<p className={scss.announce_content}>Текст:</p>
											{item.content}
										</p>
										<div
											style={{
												display: 'flex',
												flexDirection: 'column',
												gap: '50px'
											}}
										>
											<div className={scss.cont_date}>
												<p className={scss.announcement_publishDate}>
													{item.publishDate}
												</p>
												<p> {item.endDate}</p>
											</div>
											<div>
												<button
													className={scss.button}
													aria-controls={open ? 'basic-menu' : undefined}
													aria-haspopup="true"
													onClick={(e) => {
														handleClick(e);
														setDeleteById(item.id);
													}}
												>
													<DotsHorizont />
												</button>
											</div>
										</div>
										<Menu
											className={scss.deleteEdit}
											id="basic-menu"
											anchorEl={anchorEl}
											open={open}
											onClose={handleClose}
											MenuListProps={{ 'aria-labelledby': 'basic-button' }}
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
												style: { boxShadow: 'none', border: '1px solid gray' }
											}}
										>
											<MenuItem
												style={{
													display: 'flex',
													gap: '20px'
												}}
												className={scss.dropdown}
												onClick={() => {
													setOpenModalEdit(true);
													setAnchorEl(null);
												}}
											>
												<img src={editIcon} alt="Edit" />
												<p>Редактировать</p>
											</MenuItem>
											<MenuItem
												style={{ display: 'flex', gap: '20px' }}
												className={scss.dropdown}
												onClick={() => {
													handleShow(item.id, item.isPublished);
												}}
											>
												{find?.isPublished === true ? (
													<>
														<IconEyeOff stroke={2} />
														<p>Не показывать</p>
													</>
												) : (
													<>
														<IconEye stroke={2} />
														<p>Показывать</p>
													</>
												)}
											</MenuItem>
											<MenuItem
												style={{ display: 'flex', gap: '20px' }}
												className={scss.dropdown}
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
							<ModalEditAnnouncement
								openModalEdit={openModalEdit}
								closeModalEdit={() => setOpenModalEdit(false)}
								saveIdElement={deleteById}
							/>
							<DeleteAnnouncementModal
								openModalDelete={openModalDelete}
								closeModalDelete={setOpenModalDelete}
								saveIdElement={deleteById}
							/>
							<AnnouncementForm
								open={openAnnouncement}
								handleClose={handleCloseAnnoucement}
							/>
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
								// count={Math.ceil(data!.length / rowsPerPage)}
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
export default Announcements;