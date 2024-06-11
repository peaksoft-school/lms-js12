import {
	useGetMaterialsQuery,
	usePatchMaterialMutation
} from '@/src/redux/api/instructor/materials';
import { Modal, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import scss from './Style.module.scss';
import { Controller, useForm } from 'react-hook-form';
import ButtonCancel from '../customButton/ButtonCancel';
import ButtonSave from '../customButton/ButtonSave';
import Input from '../customInput/Input';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 581,
	backgroundColor: '#fff',
	bgColor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '12px'
};

interface ModalProps {
	openModalEdit: boolean;
	closeModalEdit: (openModalEdit: boolean) => void;
	deleteById: number | null;
}

interface EditProps {
	title: string;
	createdAt: string;
}

const ModalMaterialEdit: FC<ModalProps> = ({
	openModalEdit,
	closeModalEdit,
	deleteById
}) => {
	const [patchMaterial] = usePatchMaterialMutation();
	const { courseId } = useParams<{ courseId: string }>();
	const { data, refetch } = useGetMaterialsQuery(Number(courseId));
	const { control, handleSubmit, reset } = useForm<EditProps>();

	const onSubmit = async (data: EditProps) => {
		if (deleteById !== null) {
			const updateMaterial = {
				title: data.title,
				createdAt: data.createdAt
			};
			await patchMaterial({ updateMaterial, deleteById }).then(() => {
				refetch();
				closeModalEdit(false);
			});
			
		}
	};

	const find = data?.lessonResponses.find((lesson) => lesson.id === deleteById);

	useEffect(() => {
		reset({
			title: find?.title || '',
			createdAt: find?.createdAt || ''
		});
	}, [find, reset]);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={scss.form}>
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
						<div>
							Редактировать урок {find?.title}
							{find?.createdAt}
						</div>
					</Typography>

					<Box className={scss.input_button_card}>
						<div className={scss.input}>
							<Controller
								name="title"
								control={control}
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
								name="createdAt"
								control={control}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="date"
										width="100%"
										placeholder="дд.мм.гг"
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
								type="button"
								disabled={false}
								onClick={() => closeModalEdit(false)}
								width="117px"
							>
								Отмена
							</ButtonCancel>
							<ButtonSave
								onClick={handleSubmit(onSubmit)}
								width="117px"
								type="submit"
								disabled={false}
							>
								Отправить
							</ButtonSave>
						</div>
					</Box>
				</Box>
			</Modal>
		</form>
	);
};

export default ModalMaterialEdit;
