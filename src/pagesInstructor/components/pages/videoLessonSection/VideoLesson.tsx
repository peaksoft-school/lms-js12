import { useGetVideoLessonQuery } from '@/src/redux/api/instructor/video';
import scss from './VideoLesson.module.scss';
import { Preloader } from '@/src/ui/preloader/Preloader';
import { Button } from '@mui/material';
import ModalAddVideoLesson from '@/src/ui/InstructorModal/ModalAddVideoLesson';
import { useState } from 'react';
import watch from '@/src/assets/svgs/Polygon 62.svg';
import { IconPlus } from '@tabler/icons-react';

const VideoLesson = () => {
	const { data, isLoading } = useGetVideoLessonQuery();
	const [open, setOpen] = useState<boolean>(false);

	if (isLoading) {
		return (
			<div>
				<Preloader />
			</div>
		);
	}

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

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
					onClick={handleOpen}
				>
					<div className={scss.icon}>
						<IconPlus stroke={2} />
					</div>
					<span>Добавить видеоурок</span>
				</Button>
			</div>
			<div className={scss.video}>
				{data?.map((item) => (
					<div className={scss.content} key={item._id}>
						<div className={scss.cards}>
							<div className={scss.photo}>
								<img
									src={`https://img.youtube.com/vi/${item.link}/mqdefault.jpg`}
									alt=""
								/>
								<div className={scss.button_watch}>
									<img className={scss.play_video} src={watch} alt="" />
								</div>
							</div>
							<div className={scss.title}>
								<h1>{item.title}</h1>
								<p>{item.description}</p>
							</div>
						</div>
					</div>
				))}
			</div>
			<ModalAddVideoLesson open={open} handleClose={handleClose} />
		</div>
	);
};

export default VideoLesson;
