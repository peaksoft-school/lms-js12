import { useGetVideoLessonQuery } from '@/src/redux/api/instructor/video';
import { Preloader } from '@/src/ui/preloader/Preloader';
import { useState } from 'react';
import ModalWatchVideo from '@/src/ui/InstructorModal/ModalWatchVideo';
import scss from './StudentVideoLesson.module.scss';
import { Button } from '@mui/material';

const StudentVideoLesson = () => {
	const { data, isLoading } = useGetVideoLessonQuery();
	const [openWatch, setWatchOpen] = useState(false);

	const handleOpenWatch = () => {
		setWatchOpen(true);
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
				{data?.map((item) => (
					<div className={scss.content} key={item._id}>
						<div className={scss.cards}>
							<div className={scss.photo}>
								<img
									src={`https://img.youtube.com/vi/${item.link}/mqdefault.jpg`}
									alt=""
								/>
								<div onClick={handleOpenWatch} className={scss.button_watch}>
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
										onClick={handleOpenWatch}
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
							</div>
						</div>
					</div>
				))}
			</div>
			<ModalWatchVideo open={openWatch} handleClose={handleCloseWatch} />
		</div>
	);
};

export default StudentVideoLesson;
