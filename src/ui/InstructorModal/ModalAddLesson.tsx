import scss from './Styled.module.scss';
import { FC } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Input from '@/src/ui/customInput/Input';
import ButtonSave from '@/src/ui/customButton/ButtonSave';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import { usePostMaterialsMutation } from '@/src/redux/api/instructor/materials';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface FormData {
	title: string;
	date: string;
}

interface AddLessonProps {
	open: boolean;
	handleClose: () => void;
}

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 541,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '12px'
};

const ModalAddLesson: FC<AddLessonProps> = ({ open, handleClose }) => {
	const { handleSubmit, reset, control } = useForm<FormData>();
	const [postMaterials] = usePostMaterialsMutation();

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		const { title, date } = data;

		if (title !== '' && date !== '') {
			const postData = {
				title: title,
				date: date
			};
			postMaterials(postData);
			reset();
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Modal
				open={open}
				onClose={handleClose}
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
						<p className={scss.com_text}>Добавить урок</p>
					</Typography>

					<Typography className={scss.input_button_card}>
						<div className={scss.input}>
							<Controller
								name="title"
								control={control}
								defaultValue=""
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="text"
										width="100%"
										placeholder="Название урока"
									/>
								)}
							/>
							<Controller
								name="date"
								control={control}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="date"
										width="100%"
										placeholder="Дата"
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
								onClick={handleClose}
								disabled={false}
								width="117px"
							>
								Отмена
							</ButtonCancel>
							<ButtonSave
								type="submit"
								width="117px"
								disabled={false}
								onClick={() => {
									console.log('asd');
									handleSubmit(onSubmit);
								}}
							>
								Создать
							</ButtonSave>
						</div>
					</Typography>
				</Box>
			</Modal>
		</form>
	);
};

export default ModalAddLesson;
