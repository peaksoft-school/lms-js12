import React, { useState } from 'react';
import scss from './Announcements.module.scss';
import { Menu, MenuItem } from '@mui/material';
import { Preloader } from '@/src/ui/preloader/Preloader';
import { useGetAnnouncementTableQuery } from '@/src/redux/api/admin/announcement';
import AnnouncementForm from '@/src/ui/announcementForm/AnnouncementForm';
import editIcon from '@/src/assets/svgs/edit.svg';
import deleteIcon from '@/src/assets/svgs/delete-red.svg';
import DotsHorizont from '@/src/assets/icon-Dots-Horizont';

const Announcements = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
	const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
	const [deleteById, setDeleteById] = useState<number | null>(null);

	const { data: announcements = [], isLoading } =
		useGetAnnouncementTableQuery();

	if (isLoading) {
		return (
			<div>
				<Preloader />
			</div>
		);
	}

	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className={scss.SectionAnnounce}>
			<div className={scss.topContainer}>
				<h1>Объявление</h1>
				<AnnouncementForm />
			</div>
			<div className={scss.announceBox}>
				<ul className={scss.announceCard}>
					{announcements.map((item) => (
						<li key={item._id} className={scss.announceList}>
							{item.announcement}
							{item.group}

							<button
								className={scss.button}
								aria-controls={open ? 'basic-menu' : undefined}
								aria-haspopup="true"
								onClick={(e) => {
									handleClick(e);
									setDeleteById(item._id!);
								}}
							>
								<DotsHorizont />
							</button>

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
							>
								<MenuItem
									style={{ display: 'flex', gap: '20px' }}
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
			</div>
		</div>
	);
};

export default Announcements;
