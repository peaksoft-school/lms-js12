/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import scss from './Styled.module.scss';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '60%',
	backgroundColor: '#ffffff',
	bgColor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '12px'
};
interface TeacherAddProps {
	open: boolean;
	handleClose: () => void;
}

const ModalPresentation: FC<TeacherAddProps> = ({ open, handleClose }) => {
	return (
		<form>

				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style} className={scss.main_modal}>
						<Box className={scss.input_button_card}></Box>
					</Box>
				</Modal>

		</form>
	);
};

export default ModalPresentation;
