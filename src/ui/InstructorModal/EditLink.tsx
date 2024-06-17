/* eslint-disable react-hooks/exhaustive-deps */
import scss from './Styled.module.scss';
import { FC, useEffect } from 'react';
import {
	useForm,
	Controller,
	SubmitHandler,
	FieldValues
} from 'react-hook-form';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Input from '@/src/ui/customInput/Input';
import ButtonSave from '@/src/ui/customButton/ButtonSave';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import {
	useEditLinkMutation,
	useGetLinkQuery
} from '@/src/redux/api/instructor/link';
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

interface PresentationProps1 {
	open: boolean;
	handleClose: () => void;
	resultId: number | boolean;
}

const EditLink: FC<PresentationProps1> = ({ open, handleClose, resultId }) => {
	const { control, handleSubmit, reset } = useForm();
	const { lessonId } = useParams();
	const lesson = Number(lessonId);
	const { data, isFetching } = useGetLinkQuery(lesson);

	const [editLink] = useEditLinkMutation();

	const finder = data?.linkResponses.find((item) => item.id === resultId);

	useEffect(() => {
		reset({
			title: finder?.title,
			url: finder?.url
		});
	}, [finder]);
	const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
		if (resultId === undefined) {
			console.error('resultId is undefined');
			return;
		}
		const { title, url } = formData;
		await editLink({
			linkId: resultId,
			newData: { title, url }
		});
		reset();
		handleClose();
	};

	if (isFetching) return null;

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
						className={scss.add_text}
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						<p className={scss.com_text}>Редактировать ссылку</p>
					</Typography>

					<Box className={scss.input_button_card}>
						<div className={scss.input}>
							<Controller
								name="title"
								control={control}
								defaultValue={finder ? finder.title : ''}
								rules={{ required: 'Введите название' }}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="text"
										width="100%"
										placeholder="Введите название"
									/>
								)}
							/>
						</div>

						<div className={scss.input}>
							<Controller
								name="url"
								control={control}
								defaultValue={finder ? finder.url : ''}
								rules={{ required: 'Введите ссылку' }}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="text"
										width="100%"
										placeholder="Введите ссылку"
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
								onClick={handleClose}
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
								Сохранить
							</ButtonSave>
						</div>
					</Box>
				</Box>
			</Modal>
		</form>
	);
};

export default EditLink;
