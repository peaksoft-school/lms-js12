import { useState } from 'react';
import ModalWatchVideo from '@/src/ui/InstructorModal/ModalWatchVideo';
import scss from './StudentVideoLesson.module.scss';
import { Button } from '@mui/material';
import { useGetVideoLessonForStudentQuery } from '@/src/redux/api/students/videoStudent';
import { useParams } from 'react-router-dom';
import { Preloader } from '@/src/ui/preloader/Preloader';

const StudentVideoLesson = () => {
	const { lessonId } = useParams();

	const { data: video = [], isLoading } =
		useGetVideoLessonForStudentQuery(lessonId);

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
				{video?.map((item) => (
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
				))}
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
