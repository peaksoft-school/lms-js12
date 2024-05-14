import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FC } from 'react';
import scss from './NotificationHeader.module.scss';

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

const data = [
	{
		title: 'Название домашнего задания',
		description: 'Нурайым Мампарович оценил  вашу работу',
		number: '25.05.2022'
	},
	{
		title: 'Название домашнего задания',
		description: 'Нурайым Мампарович оценил  вашу работу',
		number: '25.05.2022'
	},
	{
		title: 'Название домашнего задания',
		description: 'Нурайым Мампарович оценил  вашу работу',
		number: '25.05.2022'
	},
	{
		title: 'Название домашнего задания',
		description: 'Нурайым Мампарович оценил  вашу работу',
		number: '25.05.2022'
	},
	{
		title: 'Название домашнего задания',
		description: 'Нурайым Мампарович оценил  вашу работу',
		number: '25.05.2022'
	},
	{
		title: 'Название домашнего задания',
		description: 'Нурайым Мампарович оценил  вашу работу',
		number: '25.05.2022'
	},
	{
		title: 'Название домашнего задания',
		description: 'Нурайым Мампарович оценил  вашу работу',
		number: '25.05.2022'
	},
	{
		title: 'Название домашнего задания',
		description: 'Нурайым Мампарович оценил  вашу работу',
		number: '25.05.2022'
	},
	{
		title: 'Название домашнего задания',
		description: 'Нурайым Мампарович оценил  вашу работу',
		number: '25.05.2022'
	},
	{
		title: 'Название домашнего задания',
		description: 'Мампар Мампарович оценил  вашу работу',
		number: '25.05.2022'
	},
	{
		title: 'Название домашнего задания',
		description: 'Мампар Мампарович оценил  вашу работу',
		number: '25.05.2022'
	},
	{
		title: 'Название домашнего задания',
		description: 'Мампар Мампарович оценил  вашу работу',
		number: '25.05.2022'
	},
	{
		title: 'Название домашнего задания',
		description: 'Мампар Мампарович оценил  вашу работу',
		number: '25.05.2022'
	},
	{
		title: 'Название домашнего задания',
		description: 'Мампар Мампарович оценил  вашу работу',
		number: '25.05.2022'
	},
	{
		title: 'Название домашнего задания',
		description: 'Мампар Мампарович оценил  вашу работу',
		number: '25.05.2022'
	},
	{
		title: 'Название домашнего задания',
		description: 'Мампар Мампарович оценил  вашу работу',
		number: '25.05.2022'
	},
	{
		title: 'Название домашнего задания',
		description: 'Мампар Мампарович оценил  вашу работу',
		number: '25.05.2022'
	}
];

const NotificationHeader: FC<NotificationHeaderProps> = ({
	open,
	handleClose
}) => {
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
							{data.map((item) => (
								<div className={scss.results}>
									<h1>{item.title}</h1>
									<p>{item.description}</p>
									<p>{item.number}</p>
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
