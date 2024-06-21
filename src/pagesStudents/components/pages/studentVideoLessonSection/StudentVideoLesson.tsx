import { useState } from 'react';
import { Button } from '@mui/material';
import { useGetVideoLessonForStudentQuery } from '@/src/redux/api/students/videoStudent';
import { useParams } from 'react-router-dom';
import { Preloader } from '@/src/ui/preloader/Preloader';
import ModalWatchVideo from '@/src/ui/InstructorModal/ModalWatchVideo';
import scss from './StudentVideoLesson.module.scss';
import empty from '@/src/assets/notCreated0.png';

const StudentVideoLesson = () => {
	const { lessonId } = useParams();
	const lesson = Number(lessonId);

	const { data: video = [], isLoading } =
		useGetVideoLessonForStudentQuery(lesson);

	const [openWatch, setWatchOpen] = useState(false);
	const [openVideoId, setOpenVideoId] = useState<undefined | number>(undefined);

	const handleOpenWatch = (id: number) => {
		setWatchOpen(true);
		setOpenVideoId(id);
	};

	const handleCloseWatch = () => {
		setWatchOpen(false);
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
			<div className={scss.video}>
				{video.length === 0 ? (
					<div className={scss.empty_page}>
						<img src={empty} alt="No videos available" />
					</div>
				) : (
					video.map((item) => (
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
								</div>
							</div>
						</div>
					))
				)}
			</div>
			<ModalWatchVideo
				saveId={openVideoId}
				open={openWatch}
				handleClose={handleCloseWatch}
			/>
		</div>
	);
};

export default StudentVideoLesson;
