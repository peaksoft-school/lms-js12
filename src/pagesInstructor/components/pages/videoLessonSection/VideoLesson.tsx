<<<<<<< HEAD


=======
>>>>>>> 572161c024e35298438f6d3244f0c897aebf600c
import { useGetVideoLessonQuery } from '@/src/redux/api/instructor/video';
import scss from './VideoLesson.module.scss';
import { Button, Menu, MenuItem } from '@mui/material';
import ModalAddVideoLesson from '@/src/ui/InstructorModal/ModalAddVideoLesson';
import { useState } from 'react';
import { IconDotsVertical, IconPlus } from '@tabler/icons-react';
import editIcon from '@/src/assets/svgs/edit.svg';
import deleteIcon from '../../../../assets/svgs/delete-red.svg';
import ModalWatchVideo from '@/src/ui/InstructorModal/ModalWatchVideo';
import ModalEditVideo from '@/src/ui/InstructorModal/ModalEditVideo';
import DeleteVideoLesson from '@/src/ui/customModal/deleteModal/DeleteVideoLesson';
import { useParams } from 'react-router-dom';
import { Preloader } from '@/src/utils/routes/preloader/Preloader';

const VideoLesson = () => {
	const { lessonId } = useParams();
	const test = Number(lessonId);
	const { data, isLoading } = useGetVideoLessonQuery(test);
	const [openEditVideo, setOpenEditVideo] = useState(false);
	const [openWatch, setWatchOpen] = useState(false);
	const [openAdd, setOpenAdd] = useState(false);
	const [saveId, setSaveId] = useState<number | null>(null);
	const [deleteModal, setDeleteModal] = useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [openVideoId, setOpenVideoId] = useState<null | number>(null);

	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleOpenVideo = () => {
		setOpenAdd(true);
	};
	const handleCloseVideo = () => {
		setOpenAdd(false);
	};

	const handleVideoEdit = () => {
		setOpenEditVideo(false);
	};

	const handleOpenWatch = (id: number) => {
		setWatchOpen(true);
		setOpenVideoId(id);
	};

	const handleCloseWatch = () => {
		setWatchOpen(false);
		setOpenVideoId(null);
	};

	if (isLoading) {
		return (
			<div>
				<Preloader />
			</div>
		);
	}

	return (
		<div className={scss.VideoLesson}>
			<div
				style={{
					paddingInline: '20px',
					display: 'flex',
					justifyContent: 'flex-end'
				}}
			>
				<Button
					size="large"
					className={scss.button}
					variant="contained"
					onClick={handleOpenVideo}
				>
					<div className={scss.icon}>
						<IconPlus stroke={2} />
					</div>
					<span>Добавить видеоурок</span>
				</Button>
			</div>
			<div className={scss.video}>
				{data?.map((item) => (
					<div className={scss.content} key={item.id}>
						<div className={scss.cards}>
							<div className={scss.photo}>
								<img
									src={`https://img.youtube.com/vi/${item.linkOfVideo.split('&')[0]}/0.jpg`}
									alt={item.titleOfVideo}
								/>
								<div
									onClick={() => handleOpenWatch(item.id)}
									className={scss.button_watch}
								>
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
									>
										Смотреть
									</Button>
								</div>
							</div>
							<div className={scss.title}>
								<div className={scss.text}>
									<h1>{item.titleOfVideo}</h1>
									<p>{item.description}</p>
								</div>
								<div className={scss.dots}>
									<div onClick={handleClick}>
										<button
											onClick={() => {
												setSaveId(item.id);
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
										onClose={handleClose}
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
												setOpenEditVideo(true);
												handleClose();
											}}
										>
											<img src={editIcon} alt="Edit" />
											<p>Редактировать</p>
										</MenuItem>
										<MenuItem
											style={{ display: 'flex', gap: '10px' }}
											onClick={() => {
												setDeleteModal(true);
												setAnchorEl(null);
											}}
										>
											<img src={deleteIcon} alt="Delete" />
											<p>Удалить</p>
										</MenuItem>
									</Menu>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
			<ModalAddVideoLesson open={openAdd} handleCloseVideo={handleCloseVideo} />
			<ModalWatchVideo
				saveId={openVideoId!}
				open={openWatch}
				handleClose={handleCloseWatch}
			/>
			<ModalEditVideo
				saveIdElement={saveId}
				openModalEdit={openEditVideo}
				closeModalEdit={handleVideoEdit}
			/>
			<DeleteVideoLesson
				openModalDelete={deleteModal}
				handleCloseModal={() => setDeleteModal(false)}
				saveIdElement={saveId}
			/>
		</div>
	);
};

export default VideoLesson;
