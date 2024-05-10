import { Button, MenuItem } from '@mui/material';
import scss from './Presentation.module.scss';
import Menu from '@mui/material/Menu';
import { IconDotsVertical, IconPlus } from '@tabler/icons-react';
import ModalAddPresentation from '@/src/ui/InstructorModal/ModalAddPresentation';
import { useState } from 'react';
import deleteImg from '@/src/assets/svgs/delete-red.svg';
import editImg from '@/src/assets/svgs/edit.svg';
import EditPresentation from '@/src/ui/InstructorModal/EditPresentation';
import { useGetPrezentationQuery } from '@/src/redux/api/instructor/presentation';
import DeletePresentation from '@/src/ui/InstructorModal/delete/DelelePresentationl';
import ModalPresentation from '@/src/ui/InstructorModal/ModalPresentation';
const Presentation = () => {
	const [open1, setOpen] = useState<boolean>(false);
	const [openEdit, setOpenEdit] = useState<boolean>(false);
	const { data } = useGetPrezentationQuery();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [openDelete, setOpenDelete] = useState<boolean>(false);
	const [saveIdElement, setSaveIdElement] = useState<null | number>(null);
	const [openPresentation, setOpenPresentation] = useState(false);

	setOpenPresentation(false);
	const openPresentationFunc = () => {
		setOpenPresentation(true);
	};
	const closePresentation = () => {};

	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleCloseDrop = () => {
		setAnchorEl(null);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};
	const handleCloseEdit = () => {
		setOpenEdit(false);
	};
	const handleOpenEdit = () => {
		setOpenEdit(true);
	};
	const openDeleteFunc = () => {
		setOpenDelete(true);
	};
	const closeDeleteFunc = () => {
		setOpenDelete(false);
	};

	return (
		<div className={scss.presentation}>
			<div
				style={{
					marginBottom: '20px',
					display: 'flex',
					justifyContent: 'flex-end'
				}}
			>
				<Button
					size="large"
					className={scss.button}
					variant="contained"
					onClick={handleOpen}
				>
					<div className={scss.icon}>
						<IconPlus stroke={2} />
					</div>
					<span>Добавить презентацию</span>
				</Button>
			</div>
			<div className={scss.card}>
				{data?.map((item) => {
					return (
						<div key={item._id} className={scss.card_part}>
							<div className={scss.img} onClick={openPresentationFunc}>
								<img
									src="https://cdn7.slideserve.com/12496071/react-js-app-development-services-n.jpg"
									alt=""
								/>
							</div>
							<div className={scss.text}>
								<div>
									<h3>{item.title}</h3>
									<p>{item.discription}</p>
								</div>
							</div>
							<div className={scss.dot} onClick={handleClick}>
								<button
									onClick={() => {
										setSaveIdElement(item._id);
									}}
								>
									<IconDotsVertical />
								</button>
							</div>
						</div>
					);
				})}
				{
					<Menu
						id="positioned-menu"
						anchorEl={anchorEl}
						open={open}
						onClose={handleCloseDrop}
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
							style={{ display: 'flex', gap: '10px' }}
							onClick={() => {
								handleOpenEdit();
								handleCloseDrop();
							}}
						>
							<img src={editImg} alt="#" />
							Редактировать
						</MenuItem>
						<MenuItem
							style={{ display: 'flex', gap: '10px' }}
							onClick={() => {
								openDeleteFunc();
								handleClose();
							}}
						>
							<img src={deleteImg} alt="#" />
							Удалить
						</MenuItem>
					</Menu>
				}
			</div>
			<ModalAddPresentation handleClose={handleClose} open={open1} />
			<EditPresentation
				open={openEdit}
				handleClose={handleCloseEdit}
				saveIdElement={saveIdElement}
			/>
			<DeletePresentation
				openModalDelete={openDelete}
				closeModalDelete={closeDeleteFunc}
				saveIdElement={saveIdElement}
			/>
			<ModalPresentation
				open={openPresentation}
				handleClose={closePresentation}
			/>
		</div>
	);
};

export default Presentation;
