import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Modal, Box, Typography } from '@mui/material';
import Input from '@/src/ui/customInput/Input';
import ButtonSave from '@/src/ui/customButton/ButtonSave';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import scss from './Styled.module.scss';
import { FC } from 'react';
import { usePostLinkMutation } from '@/src/redux/api/instructor/link';
import { useParams } from 'react-router-dom';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 541,
	height: 285,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '10px'
};

interface LinkProps {
	titleOfLink: string;
	urlOfLink: string;
}

interface LessonLinkProps {
	open: boolean;
	handleCloseLink: () => void;
}

const ModalAddLink: FC<LessonLinkProps> = ({ open, handleCloseLink }) => {
	const { control, handleSubmit, reset } = useForm<LinkProps>();
	const [postLinkLesson] = usePostLinkMutation();
	const { lessonId } = useParams();

	const onSubmit: SubmitHandler<LinkProps> = async (data) => {
		const newLink = {
			title: data.titleOfLink,
			url: data.urlOfLink
		};
		await postLinkLesson({ lessonId, newLink });
		reset();
		handleCloseLink();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Modal
				open={open}
				onClose={handleCloseLink}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style} className={scss.ModalMain}>
					<Typography
						className={scss.add_text}
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						<p className={scss.com_text}>Добавить ссылку</p>
					</Typography>

					<Box className={scss.input_button_card}>
						<div className={scss.input}>
							<Controller
								name="titleOfLink"
								control={control}
								defaultValue=""
								rules={{ required: 'text error' }}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="text"
										width="100%"
										placeholder="Отображаемый текст"
									/>
								)}
							/>
						</div>

						<div className={scss.input}>
							<Controller
								name="urlOfLink"
								control={control}
								defaultValue=""
								rules={{ required: 'url error' }}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="text"
										width="100%"
										placeholder="Вставьте ссылку"
									/>
								)}
							/>
						</div>

						<div>
							<ButtonCancel
								type="button"
								onClick={handleCloseLink}
								disabled={false}
								width="117px"
							>
								Отмена
							</ButtonCancel>
							<ButtonSave
								type="submit"
								width="117px"
								disabled={false}
								onClick={handleSubmit(onSubmit)}
							>
								Добавить
							</ButtonSave>
						</div>
					</Box>
				</Box>
			</Modal>
		</form>
	);
};

export default ModalAddLink;
