import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Modal, Box, Typography } from '@mui/material';
import Input from '@/src/ui/customInput/Input';
import ButtonSave from '@/src/ui/customButton/ButtonSave';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import scss from './Styled.module.scss';
import { FC, useState } from 'react';
import { usePostLinkMutation } from '@/src/redux/api/instructor/link';
import { useParams } from 'react-router-dom';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 541,
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
	const [loading, setLoading] = useState(false); // Add loading state

	const onSubmit: SubmitHandler<LinkProps> = async (data) => {
		setLoading(true); // Set loading to true when submission starts
		try {
			const newLink = {
				title: data.titleOfLink,
				url: data.urlOfLink
			};
			await postLinkLesson({ lessonId, newLink });
			reset();
			handleCloseLink();
		} catch (error) {
			// Handle error if needed
		} finally {
			setLoading(false); // Set loading to false after submission completes
		}
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
								rules={{ required: 'Отображаемый текст обязателен' }}
								render={({ field, fieldState: { error } }) => (
									<>
										<Input
											size="medium"
											{...field}
											type="text"
											width="100%"
											placeholder="Отображаемый текст"
										/>
										{error && (
											<span style={{ color: 'red' }}>{error.message}</span>
										)}
									</>
								)}
							/>
						</div>

						<div className={scss.input}>
							<Controller
								name="urlOfLink"
								control={control}
								defaultValue=""
								rules={{
									required: 'Ссылка обязательна',
									pattern: {
										value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
										message: 'Введите правильный URL'
									}
								}}
								render={({ field, fieldState: { error } }) => (
									<>
										<Input
											size="medium"
											{...field}
											type="text"
											width="100%"
											placeholder="Вставьте ссылку"
										/>
										{error && (
											<span style={{ color: 'red' }}>{error.message}</span>
										)}
									</>
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
								type="button"
								onClick={handleCloseLink}
								disabled={loading} 
								width="117px"
							>
								Отмена
							</ButtonCancel>
							<ButtonSave
								type="submit"
								width="117px"
								disabled={loading} 
								onClick={handleSubmit(onSubmit)}
							>
								{loading ? 'Загрузка...' : 'Добавить'} 
							</ButtonSave>
						</div>
					</Box>
				</Box>
			</Modal>
		</form>
	);
};

export default ModalAddLink;
