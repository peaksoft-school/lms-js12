import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FC, useState } from 'react';
import scss from './NotificationHeader.module.scss';
import {
	useGetNotificationQuery,
	useGetNotificationTrueQuery,
	useGetViewNotificationQuery
} from '@/src/redux/api/instructor/notification';
import { useNavigate } from 'react-router-dom';
import notifications from '@/src/assets/icons/Group 1772.png';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	bgcolor: 'background.paper',
	boxShadow: 24,

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
	const navigate = useNavigate();

	const [isVewe, setIsVewe] = useState<boolean | number>(false);
	const { data } = useGetNotificationQuery();
	const { data: trueData } = useGetNotificationTrueQuery();

	const { data: notification } = useGetViewNotificationQuery(isVewe);

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

					{data?.length === 0 ? (
						<div className={scss.notifications_div}>
							<img
								className={scss.img_notifications}
								src={notifications}
								alt=""
							/>
						</div>
					) : (
						<>
							<div className={scss.notifications}>
								<h2>НОВЫЕ</h2>

								<div className={scss.messages_content}>
									{data?.map((item) => (
										<div className={scss.results}>
											{item.isView === false && (
												<div
													onClick={() => {
														setIsVewe(item?.notificationId);

														setTimeout(() => {
															navigate(
																`/instructor/course/${item.courseId}/materials/${item.lessonId}/lesson/${item.taskId}/answer/${item.answerTaskId}`
															);
														}, 100);
													}}
												>
													<h1>{item.notificationTitle}</h1>
													<p>{item.notificationDescription}</p>
													<p>{item.notificationSendDate}</p>
												</div>
											)}
										</div>
									))}
								</div>
							</div>
							<div className={scss.notifications}>
								<h2>Просмотренные</h2>

								<div className={scss.messages_content}>
									{trueData?.map((item) => (
										<div className={scss.results2}>
											{item.isView === true && (
												<div>
													<h1>{item.notificationTitle}</h1>
													<p>{item.notificationDescription}</p>
													<p>{item.notificationSendDate}</p>
												</div>
											)}
										</div>
									))}
								</div>
							</div>
						</>
					)}
				</Box>
			</Modal>
		</div>
	);
};

export default NotificationHeader;
