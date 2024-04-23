import { FC, useState } from 'react';
import scss from './Groups.module.scss';
import { useGetGroupQuery } from '@/src/redux/api/admin/groups';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import deleteImg from '@/src/assets/svgs/delete-red.svg';
import editImg from '@/src/assets/svgs/edit.svg';
import CreateGroup from '../customModal/CreateGroup';
import { IconDots } from '@tabler/icons-react';
import EditGroup from '../customModal/EditGroup';
import DeleteGroups from '../customModal/deleteGroupModal/DeleteGroups';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Groups: FC = () => {
	const [openEditModal, setOpenEditModal] = useState(false);
	const { data } = useGetGroupQuery();
	const [saveId, setSaveId] = useState<null | number>(null);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [deleteModal, setDeleteModal] = useState(false);
	// ! state pagination
	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(8);
	const [openPart, setOpenPart] = useState(1);
	const [openPage, setOpenPage] = useState(8);

	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	// ! Pagination
	const handlePageChangeC = (
		e: React.ChangeEvent<unknown>,
		page: number
	): void => {
		setCurrentPage(page);
	};

	const handleCloseEditModal = () => setOpenEditModal(false);
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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleAppend = (event: any) => {
		if (event.key === 'Enter') {
			const newOpenPage = parseInt(event.target.value);
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

	return (
		<div className={scss.ContainerGroupsParent}>
			<div className={scss.ParentTitleContainer}>
				<h1>Группы</h1>
				<CreateGroup />
			</div>
			<div className={scss.ContainerCardsParent}>
				{data && Array.isArray(data) && data.length > 0 ? (
					<div className={scss.Cards}>
						{data
							.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
							.map((item) => (
								<div key={item._id} className={scss.zeroBlockContainer}>
									<div className={scss.BlockContainerImage}>
										<img
											className={scss.BlockImage}
											src={item.img}
											alt="images"
										/>
									</div>
									<div className={scss.BlockCont}>
										<div className={scss.secondBlockContainer}>
											<p className={scss.BlockTitle}>{item.title}</p>
											<p className={scss.BlockDate}>{item.date}</p>
										</div>
										<div className={scss.text_card}>
											<span className={scss.BlockText}>
												{item.text && item.text.length > 60
													? `${item.text.substring(0, 60)}...`
													: item.text}
											</span>
										</div>
									</div>
									<div className={scss.BlockButtonDiv}>
										<div onClick={handleClick}>
											<button
												className={scss.BlockButtonDotts}
												onClick={() => {
													setSaveId(item._id);
												}}
											>
												<IconDots stroke={2} />
											</button>
										</div>
										{
											<Menu
												id="positioned-menu"
												anchorEl={anchorEl}
												open={open}
												onClose={handleClose}
												anchorOrigin={{
													vertical: 'top',
													horizontal: 'left'
												}}
												transformOrigin={{
													vertical: 'top',
													horizontal: 'left'
												}}
											>
												<MenuItem
													onClick={() => {
														setOpenEditModal(true);
														handleClose();
													}}
												>
													<img src={editImg} />
													Редактировать
												</MenuItem>
												<MenuItem
													onClick={() => {
														setDeleteModal(true);
														handleClose();
													}}
												>
													<img src={deleteImg} />
													Удалить
												</MenuItem>
											</Menu>
										}
									</div>
								</div>
							))}
						<EditGroup
							open={openEditModal}
							handleClose={handleCloseEditModal}
							saveId={saveId}
						/>
					</div>
				) : null}
				<div className={scss.PaginationContainerParent}>
					<div className={scss.Inputs}>
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
					<div>
						<Stack direction="row" spacing={2}>
							<Pagination
								count={Math.ceil((data?.length ?? 0) / rowsPerPage)}
								page={currentPage}
								onChange={handlePageChangeC}
								shape="rounded"
								variant="outlined"
							/>
						</Stack>
					</div>
					<div className={scss.Inputs}>
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
				<DeleteGroups
					openModalDelete={deleteModal}
					closeModalDelete={() => setDeleteModal(false)}
					deleteById={saveId}
				/>
			</div>
		</div>
	);
};

export default Groups;
