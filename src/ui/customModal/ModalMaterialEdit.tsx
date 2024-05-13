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

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 581,
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

interface EditProps {
	title: string;
	date: string;
}

const ModalMaterialEdit: FC<modalProps> = ({
	openModalEdit,
	closeModalEdit,
	deleteById
}) => {
	const [patchMaterial] = usePatchMaterialMutation();
	const { data } = useGetMaterialsQuery();
	const find = data?.find((id) => id._id === deleteById);
	const { control, handleSubmit, reset } = useForm<EditProps>();

	const onSubmit = async (data: EditProps) => {
		const updateMaterial = {
			...data
		};
		console.log(updateMaterial, deleteById);
		await patchMaterial({ updateMaterial, deleteById });
	};

	console.log(deleteById);

	useEffect(() => {
		reset({
			title: find?.title,
			date: find?.date
		});
	}, [find]);

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
							{find?.date}
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
								name="date"
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
								width="117px"
								type="submit"
								disabled={false}
								onClick={handleSubmit(onSubmit)}
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
