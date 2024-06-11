import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FC, useState } from 'react';
import scss from './NotificationHeader.module.scss';
import {
	useGetNotificationInstructorQuery,
	useGetOneNotificationInstructorQuery
} from '@/src/redux/api/instructor/notification';
import { useNavigate, useParams } from 'react-router-dom';
import { IconDotsVertical } from '@tabler/icons-react';

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

interface NotificationHeaderProps {
	open: boolean;
	handleClose: () => void;
}

const NotificationHeader: FC<NotificationHeaderProps> = ({
	open,
	handleClose
}) => {
	const [saveId, setSaveId] = useState<number | boolean>(false);
	const { data } = useGetNotificationInstructorQuery(true);
	const { data: getTask = [] } = useGetOneNotificationInstructorQuery(saveId);
	const navigate = useNavigate();

	const { courseId, lessonId, getTaskId } = useParams();
	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="child-modal-title"
				aria-describedby="child-modal-description"
			>
				<Box className={scss.main_modal_vid} sx={{ ...style }}>
					<div className={scss.header_modal}>
						<h1>ВАШИ УВЕДОМЛЕНИЯ</h1>
					</div>

					<div className={scss.notifications}>
						<h2>НОВЫЕ</h2>

						<div className={scss.messages_content}>
							{data?.map((item) => (
								<div
									className={scss.results}
									onClick={() => {
										setSaveId(item.notificationId);
										setTimeout(() => {
											navigate(
												`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/answer/${item.notificationTaskId}`
											);
										});
									}}
								>
									<div>
										<h1>{item.notificationTitle}</h1>
										<p>{item.notificationDescription}</p>
										<p>{item.notificationSendDate}</p>
									</div>
									<div>
										<IconDotsVertical stroke={2} />
									</div>
								</div>
							))}
						</div>
					</div>
				</Box>
			</Modal>
		</div>
	);
};

export default NotificationHeader;
