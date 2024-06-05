import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FC, useEffect } from 'react';
import scss from './Styled.module.scss';
import { useGetIdVideoLessonQuery } from '@/src/redux/api/instructor/video';
import ReactPlayer from 'react-player/youtube';

interface ModalWatchVideoProps {
	open: boolean;
	handleClose: () => void;
	saveId: number | null;
}

const ModalWatchVideo: FC<ModalWatchVideoProps> = ({
	open,
	handleClose,
	saveId
}) => {
	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		bgcolor: 'background.paper',
		boxShadow: 24,
		p: 4,
		sx: {
			bgcolor: 'background.paper',
			padding: '0px'
		}
	};

	const { data, isLoading, isError } = useGetIdVideoLessonQuery(saveId ?? 0);

	useEffect(() => {
		if (saveId) {
			console.log(`Fetching video with ID: ${saveId}`);
		} else {
			console.log('No saveId provided');
		}
	}, [saveId]);

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="child-modal-title"
			aria-describedby="child-modal-description"
		>
			<Box className={scss.main_modal_vid} sx={{ ...style }}>
				{isError && <p>Error fetching video.</p>}
				{isLoading && <p>Loading video...</p>}
				{data && data.linkOfVideo ? (
					<div>
						<ReactPlayer
							url={`https://www.youtube.com/embed/${data.linkOfVideo}`}
							width="100%"
							height="500px"
						/>
					</div>
				) : (
					<p>No video available.</p>
				)}
			</Box>
		</Modal>
	);
};

export default ModalWatchVideo;
