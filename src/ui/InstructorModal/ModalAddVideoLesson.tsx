import scss from './Styled.module.scss';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Input from '@/src/ui/customInput/Input';
import ButtonSave from '@/src/ui/customButton/ButtonSave';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import { FC } from 'react';
import { usePostVideoLessonMutation } from '@/src/redux/api/instructor/video';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 541,
	height: 357,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '10px'
};

interface VideoProps {
	link: string;
	title: string;
	description: string;
}

interface LessonVideoProps {
	open: boolean;
	handleCloseVideo: () => void;
}

const ModalAddVideoLesson: FC<LessonVideoProps> = ({
	open,
	handleCloseVideo
}) => {
	const { control, handleSubmit, reset } = useForm<VideoProps>();
	const [postVideoLesson] = usePostVideoLessonMutation();

	const onSubmit: SubmitHandler<VideoProps> = (data) => {
		// const { title, description, link } = data;
		const postData = {
			title: data.title,
			description: data.description,
			link: data.link
		};
		postVideoLesson(postData);
		reset();
		handleCloseVideo();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Modal
				open={open}
				onClose={handleCloseVideo}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style} className={scss.ModalMain}>
					<Typography
						className={scss.text}
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						<p className={scss.com_text}>Добавить видеоурок</p>
					</Typography>
					<Box className={scss.input_button_card}>
						<div className={scss.input}>
							<Controller
								name="title"
								control={control}
								defaultValue=""
								rules={{ required: 'Введите название видеоурока' }}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="text"
										width="100%"
										placeholder="Введите название видеоурока"
									/>
								)}
							/>

							<Controller
								name="description"
								control={control}
								defaultValue=""
								rules={{ required: 'Введите описание видеоурока' }}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="text"
										width="100%"
										placeholder="Введите описание видеоурока"
									/>
								)}
							/>

							<Controller
								name="link"
								control={control}
								defaultValue=""
								rules={{ required: 'Вставьте ссылку на видеоурок' }}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="url"
										width="100%"
										placeholder="Вставьте ссылку на видеоурок"
									/>
								)}
							/>
						</div>

						<div
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'flex-end',
								alignItems: 'center',
								paddingBottom: '10px',
								paddingTop: '13px',
								gap: '10px'
							}}
						>
							<ButtonCancel
								type="submit"
								disabled={false}
								onClick={handleCloseVideo}
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

export default ModalAddVideoLesson;
