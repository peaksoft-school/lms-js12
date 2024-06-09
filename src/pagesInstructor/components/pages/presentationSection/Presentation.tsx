import { Button, MenuItem } from '@mui/material';
import scss from './Presentation.module.scss';
import Menu from '@mui/material/Menu';
import { IconDotsVertical, IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import deleteImg from '@/src/assets/svgs/delete-red.svg';
import editImg from '@/src/assets/svgs/edit.svg';
import { useGetPresentationQuery } from '@/src/redux/api/instructor/presentation';
import EditPresentation from '@/src/ui/InstructorModal/EditPresentation';
import DeletePresentation from '@/src/ui/InstructorModal/deleteModal/DelelePresentationl';
import ModalPresentation from '@/src/ui/InstructorModal/ModalPresentation';
import ModalAddPresentation from '@/src/ui/InstructorModal/ModalAddPresentation';
import { useParams } from 'react-router-dom';

const Presentation = () => {
	const [open1, setOpen1] = useState<boolean>(false);
	const [openEdit, setOpenEdit] = useState<boolean>(false);
	const { lessonId } = useParams();
	const test = Number(lessonId);
	const { data } = useGetPresentationQuery(test);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [openDelete, setOpenDelete] = useState<boolean>(false);
	const [saveIdElement, setSaveIdElement] = useState<null | number>(null);
	const [openPresentation, setOpenPresentation] = useState<boolean>(false);
	const [presentationModal, setPresentationModal] = useState<null | number>(
		null
	);

	const openPresentationFunc = (id: number) => {
		setPresentationModal(id);
		setOpenPresentation(true);
	};
	const closePresentation = () => {
		setOpenPresentation(false);
	};

	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleCloseDrop = () => {
		setAnchorEl(null);
	};

	const handleClose = () => {
		setOpen1(false);
	};

	const handleOpen = () => {
		setOpen1(true);
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
					display: 'flex',
					paddingInline: '20px',
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
				{data?.map((item) => (
					<div key={item.id} className={scss.content}>
						<div className={scss.cards}>
							<div className={scss.photo}>
								<iframe
									style={{ height: '200px' }}
									className={scss.iframe}
									src={`https://lms-b12.s3.eu-central-1.amazonaws.com/${item.file}`}
									frameBorder="0"
								></iframe>
								<div className={scss.button_watch}>
									<Button
										sx={{
											borderRadius: '8px',
											textTransform: 'capitalize',
											background: '#0000ff7f',
											'&:hover': {
												background: '#0000ffb2'
											}
										}}
										size="medium"
										variant="contained"
										onClick={() => openPresentationFunc(item.id)}
									>
										Смотреть
									</Button>
								</div>
							</div>
							<div className={scss.title}>
								<div className={scss.text}>
									<h1>{item.title}</h1>
									<p>{item.description}</p>
								</div>
								<div className={scss.dots}>
									<div onClick={handleClick}>
										<button
											onClick={() => {
												setSaveIdElement(item.id);
											}}
											className={scss.button}
											aria-controls={open ? 'basic-menu' : undefined}
											aria-haspopup="true"
										>
											<IconDotsVertical stroke={2} />
										</button>
									</div>
									<Menu
										anchorEl={anchorEl}
										id="positioned-menu"
										open={open}
										onClose={handleCloseDrop}
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
											style={{ display: 'flex', gap: '10px' }}
											onClick={() => {
												handleOpenEdit();
												handleCloseDrop();
											}}
										>
											<img src={editImg} alt="Edit" />
											<p>Редактировать</p>
										</MenuItem>
										<MenuItem
											style={{ display: 'flex', gap: '10px' }}
											onClick={() => {
												openDeleteFunc();
												handleCloseDrop();
											}}
										>
											<img src={deleteImg} alt="Delete" />
											<p>Удалить</p>
										</MenuItem>
									</Menu>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
			<ModalAddPresentation handleClose={handleClose} open={open1} />
			<EditPresentation
				open={openEdit}
				handleClose={handleCloseEdit}
				presentationId={saveIdElement}
			/>
			<DeletePresentation
				openModalDelete={openDelete}
				closeModalDelete={closeDeleteFunc}
				saveIdElement={saveIdElement}
			/>
			<ModalPresentation
				saveId={presentationModal}
				open={openPresentation}
				handleClose={closePresentation}
			/>
		</div>
	);
};

export default Presentation;
