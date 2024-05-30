import { FC, useEffect } from 'react';
import { Modal, Box, Typography } from '@mui/material';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import ButtonSave from '@/src/ui/customButton/ButtonSave.tsx';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel.tsx';
import scss from './StudentStyle.module.scss';
import {
	useGetStudentTableQuery,
	usePatchStudentTableMutation
} from '@/src/redux/api/admin/student';
import * as React from 'react';
import Input from '../customInput/Input';

interface PostStudentProps {
	firstName: string;
	lastName: string;
	group: string;
	TrainingFormat: string;
	phone_number: string;
	email: string;
	password: string;
	isCompleted: boolean;
}

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 581,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '12px'
};

interface EditModalProps {
	handleClose: () => void;
	open: boolean;
	saveIdElement: number | null;
}
const ModalEditStudent: FC<EditModalProps> = ({
	handleClose,
	open,
	saveIdElement
}) => {
	const { handleSubmit, control, reset } = useForm<PostStudentProps>();
	const [patchStudentTable] = usePatchStudentTableMutation();
	const { data: students = [] } = useGetStudentTableQuery();
	const [personName, setPersonName] = React.useState<string[]>([]);
	const [formatName, setFormatName] = React.useState<string[]>([]);

	const finder = students?.students.find(
		(id: { id: number | null }) => id.id === saveIdElement
	);
	useEffect(() => {
		if (finder) {
			setFormatName(
				Array.isArray(finder.TrainingFormat) ? finder.TrainingFormat : []
			);
			setPersonName(Array.isArray(finder.group) ? finder.group : []);
		}
	}, [finder]);

	const onSubmit: SubmitHandler<PostStudentProps> = async (data) => {
		const editStudent = {
			...data,
			isCompleted: false,
			TrainingFormat: formatName,
			group: personName
		};
		await patchStudentTable({
			editStudent,
			saveIdElement
		});
		handleClose();
	};

	useEffect(() => {
		reset({
			firstName: finder?.firstName,
			lastName: finder?.lastName,
			group: finder?.group,
			TrainingFormat: finder?.TrainingFormat,
			phone_number: finder?.phone_number,
			email: finder?.email,
			password: finder?.password
		});
	}, [finder]);

	return (
		<form>
			<Modal
				open={open}
				onClose={handleClose}
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
						<p className={scss.comText}>Редактировать</p>
					</Typography>

					<Box className={scss.input_button_card}>
						<form
							style={{ width: '100%', maxWidth: '470px' }}
							onSubmit={handleSubmit(onSubmit)}
						>
							<div className={scss.input}>
								<Controller
									name="firstName"
									control={control}
									render={({ field }) => (
										<Input
											size="medium"
											{...field}
											width="100%"
											type="text"
											placeholder="First Name"
										/>
									)}
								/>{' '}
								<Controller
									name="lastName"
									control={control}
									render={({ field }) => (
										<Input
											size="medium"
											width="100%"
											{...field}
											type="text"
											placeholder="Last Name"
										/>
									)}
								/>
								<Controller
									name="phone_number"
									control={control}
									render={({ field }) => (
										<Input
											size="medium"
											{...field}
											type="number"
											width="100%"
											placeholder="Phone Number"
										/>
									)}
								/>{' '}
								<Controller
									name="email"
									control={control}
									render={({ field }) => (
										<Input
											size="medium"
											{...field}
											width="100%"
											type="email"
											placeholder="Email"
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
									Отправить
								</ButtonSave>
							</div>
						</form>
					</Box>
				</Box>
			</Modal>
		</form>
	);
};

export default ModalEditStudent;
