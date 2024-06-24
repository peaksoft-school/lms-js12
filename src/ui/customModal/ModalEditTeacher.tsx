/* eslint-disable react-hooks/exhaustive-deps */
import { Controller, useForm } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ButtonSave from '@/src/ui/customButton/ButtonSave.tsx';
import scss from './Style.module.scss';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel.tsx';
import {
	useGetTeacherQuery,
	usePatchTeacherMutation
} from '@/src/redux/api/admin/teacher';
import Input from '../customInput/Input';
import { useEffect, useState } from 'react';

interface IFormInputs {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	login: string;
	specialization: string;
	group: string;
}

interface initialData {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	login: string;
	specialization: string;
	group: string;
}

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 541,
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

const ModalEditTeacher: React.FC<modalProps> = ({
	openModalEdit,
	closeModalEdit,
	deleteById
}) => {
	const { control, handleSubmit, reset, watch } = useForm<IFormInputs>();
	const [patchTeacher] = usePatchTeacherMutation();
	const { data } = useGetTeacherQuery({ page: '1', size: '12' });
	const find = data?.instructorResponses.find((el) => el.id === deleteById);
	const [personName, setPersonName] = useState<string>('');
	const [originalData, setOriginalData] = useState<IFormInputs | null>(null);

	const onSubmit = async (data: IFormInputs) => {
		const updateTeacher = {
			...data,
			courseIds: personName
		};
		const link = {
			linkForPassword: 'http://localhost:5173/auth/newPassword'
		};
		await patchTeacher({ updateTeacher, deleteById, link });
		setPersonName('');
		closeModalEdit(false);
	};

	const fullName = find?.fullName || '';
	const nameParts = fullName.trim().split(' ');

	const firstName = nameParts[0] || '';
	const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

	useEffect(() => {
		const initialData: initialData = {
			firstName: firstName,
			lastName: lastName,
			email: find?.email || '',
			phoneNumber: find?.phoneNumber || '',
			specialization: find?.specialization || '',
			login: '',
			group: ''
		};
		reset(initialData);
		setOriginalData(initialData);
	}, [find]);

	const watchedValues = watch();

	const isButtonDisabled = () => {
		if (!originalData) return true;
		return Object.keys(watchedValues).every(
			(key) =>
				watchedValues[key as keyof IFormInputs] ===
				originalData[key as keyof IFormInputs]
		);
	};

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
						<div className={scss.comText}>
							Редактировать учителя по имени {find?.fullName}
						</div>
					</Typography>

					<Box className={scss.input_button_card}>
						<div className={scss.input}>
							<Controller
								name="firstName"
								control={control}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="text"
										width="100%"
										placeholder="First Name"
									/>
								)}
							/>
							<Controller
								name="lastName"
								control={control}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="text"
										width="100%"
										placeholder="Last Name"
									/>
								)}
							/>
							<Controller
								name="phoneNumber"
								control={control}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="text"
										width="100%"
										placeholder="Phone Number"
									/>
								)}
							/>
							<Controller
								name="email"
								control={control}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="text"
										width="100%"
										placeholder="Email"
									/>
								)}
							/>
							<Controller
								name="specialization"
								control={control}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="string"
										width="100%"
										placeholder="Специализация"
									/>
								)}
							/>
							<div
								style={{
									width: '100%',
									display: 'flex',
									justifyContent: 'flex-end',
									alignItems: 'center',
									paddingBottom: '10px',
									paddingTop: '13px',
									gap: '10px',
									paddingRight: '0px'
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
									disabled={isButtonDisabled()}
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

export default ModalEditTeacher;
