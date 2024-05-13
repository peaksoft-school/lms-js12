import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FC } from 'react';
import scss from './Styled.module.scss';

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

interface ModalWatchVideoProps {
	open: boolean;
	handleClose: () => void;
}

const ModalWatchVideo: FC<ModalWatchVideoProps> = ({ open, handleClose }) => {
	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="child-modal-title"
				aria-describedby="child-modal-description"
			>
				<Box className={scss.main_modal_vid} sx={{ ...style }}></Box>
			</Modal>
		</div>
	);
};

export default ModalWatchVideo;
