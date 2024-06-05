/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, useForm } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonSave from '@/src/ui/customButton/ButtonSave.tsx';
import scss from './ModalEditVideo.module.scss';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel.tsx';
import Input from '../customInput/Input';
import { useEffect } from 'react';
import {
	useGetVideoLessonQuery,
	usePatchVideoLessonMutation
} from '@/src/redux/api/instructor/video';

interface IFormInputs {
	titleOfVideo: string;
	description: string;
	linkOfVideo: string;
}

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 581,
	height: 365,
	backgroundColor: '#ffffff',
	bgColor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '12px'
};
interface modalProps {
	openModalEdit: boolean;
	closeModalEdit: (openModalEdit: boolean) => void;
	deleteById: number | null;
}
const ModalEditVideo: React.FC<modalProps> = ({
	openModalEdit,
	closeModalEdit,
	deleteById
}) => {
	const { control, handleSubmit, reset } = useForm<IFormInputs>();
	const [patchVideo] = usePatchVideoLessonMutation();
	const { data } = useGetVideoLessonQuery();
	const find = data?.find((id) => id.id === deleteById);

	const onSubmit = async (data: IFormInputs) => {
		const newVideoLesson = {
			...data
		};
		await patchVideo({ newVideoLesson, deleteById });
		closeModalEdit(false);
	};

	useEffect(() => {
		reset({
			titleOfVideo: find?.titleOfVideo,
			description: find?.description,
			linkOfVideo: find?.linkOfVideo
		});
	}, [find]);

	return (
		<form onSubmit={close} className={scss.form}>
			<Modal
				open={openModalEdit}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style} className={scss.main_modal}>
					<Typography
						className={scss.text}
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						<div className={scss.comText}>Редактировать учителя по имени</div>
					</Typography>

					<Box className={scss.input_button_card}>
						<div className={scss.input}>
							<Controller
								name="titleOfVideo"
								control={control}
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
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="text"
										width="100%"
										placeholder="Введите описание видеурока"
									/>
								)}
							/>
							<Controller
								name="linkOfVideo"
								control={control}
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

							<div className={scss.EditButtons}>
								<ButtonCancel
									type="submit"
									disabled={false}
									onClick={() => closeModalEdit(false)}
									width="117px"
								>
									Отмена
								</ButtonCancel>
								<ButtonSave
									width="117px"
									type="submit"
									disabled={false}
									onClick={handleSubmit(onSubmit)}
								>
									Отправить
								</ButtonSave>
							</div>
						</div>
					</Box>
				</Box>
			</Modal>
		</form>
	);
};

export default ModalEditVideo;
