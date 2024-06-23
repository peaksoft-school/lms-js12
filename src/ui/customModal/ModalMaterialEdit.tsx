import { FC, useEffect, useState } from 'react';
import { Modal, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import {
	useGetMaterialsQuery,
	usePatchMaterialMutation
} from '@/src/redux/api/instructor/materials';
import ButtonCancel from '../customButton/ButtonCancel';
import ButtonSave from '../customButton/ButtonSave';
import Input from '../customInput/Input';
import scss from './Style.module.scss';
import { message } from 'antd'; // Импорт message из Ant Design

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
	const { control, handleSubmit, reset, formState } = useForm<EditProps>({
		mode: 'onChange'
	});
	const { isDirty } = formState;

	const [initialValues, setInitialValues] = useState<EditProps>({
		title: '',
		createdAt: ''
	});
	const [loading, setLoading] = useState(false);

	const onSubmit = async (data: EditProps) => {
		const currentDate = new Date();
		const selectedDate = new Date(data.createdAt);

		if (selectedDate < currentDate) {
			message.error('Вы не можете выбрать прошедшую дату.'); // Использование message.error для отображения ошибки
			return;
		}

		setLoading(true);
		if (deleteById !== null) {
			const updateMaterial = {
				title: data.title,
				createdAt: data.createdAt
			};
			try {
				await patchMaterial({ updateMaterial, deleteById }).then(() => {
					refetch();
					closeModalEdit(false);
					message.success('Данные успешно изменены'); // Сообщение об успешном изменении данных
				});
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		}
	};

	const find = data?.lessonResponses.find((lesson) => lesson.id === deleteById);

	useEffect(() => {
		if (find) {
			setInitialValues({
				title: find.title,
				createdAt: find.createdAt
			});
			reset({
				title: find.title,
				createdAt: find.createdAt
			});
		}
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
							Редактировать урок {find?.title} {find?.createdAt}
						</div>
					</Typography>

					<Box className={scss.input_button_card}>
						<div className={scss.input}>
							<Controller
								name="title"
								control={control}
								defaultValue={initialValues.title}
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
								defaultValue={initialValues.createdAt}
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
								disabled={loading}
								onClick={() => closeModalEdit(false)}
								width="117px"
							>
								Отмена
							</ButtonCancel>
							<ButtonSave
								onClick={handleSubmit(onSubmit)}
								width="117px"
								type="submit"
								disabled={!openModalEdit || !isDirty || loading}
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
