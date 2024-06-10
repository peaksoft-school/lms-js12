import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FC, useEffect } from 'react';
import scss from './Styled.module.scss';
import { useGetIdVideoLessonQuery } from '@/src/redux/api/instructor/video';

interface ModalWatchVideoProps {
	open: boolean;
	handleClose: () => void;
	saveId?: number;
}

const ModalWatchVideo: FC<ModalWatchVideoProps> = ({
	open,
	handleClose,
	saveId = 0
}) => {
	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		boxShadow: 24,
		p: 4,
		sx: {
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
			sx={{
				backgroundColor: 'rgba(0, 0, 0, 0)',
				backdropFilter: 'none',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center'
			}}
			BackdropProps={{
				style: {
					backgroundColor: 'rgba(0, 0, 0, 0)'
				}
			}}
		>
			<Box
				className={scss.main_modal_vid}
				sx={{
					...style,
					backgroundColor: 'transparent',
					boxShadow: 'none'
				}}
			>
				{isError && <p>Error fetching video.</p>}
				{isLoading && <p>Loading video...</p>}
				{data && data.linkOfVideo ? (
					<div className={scss.iframe}>
						<iframe
							style={{ borderRadius: '10px' }}
							src={`https://www.youtube.com/embed/${data.linkOfVideo}`}
							width="100%"
							height="480px"
							allowFullScreen
						></iframe>
					</div>
				) : (
					<p>No video available.</p>
				)}
			</Box>
		</Modal>
	);
};

export default ModalWatchVideo;
