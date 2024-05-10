import scss from './Styled.module.scss';
import { FC, useEffect, useRef, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Input from '@/src/ui/customInput/Input';
import ButtonSave from '@/src/ui/customButton/ButtonSave';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import {
	useEditPresentationMutation,
	useGetPrezentationQuery
} from '@/src/redux/api/instructor/presentation';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 541,
	height: 368,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '10px'
};
interface PresentationProps {
	title: string;
	presentation: string;
	discription: string;
}

interface PresentationProps1 {
	open: boolean;
	handleClose: () => void;
	saveIdElement: number | null;
}

const EditPresentation: FC<PresentationProps1> = ({
	open,
	handleClose,
	saveIdElement
}) => {
	const { control, handleSubmit, reset } = useForm();
	const { data } = useGetPrezentationQuery();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [editPresentation] = useEditPresentationMutation();

	const openFilePicker = () => {
		fileInputRef.current.click();
	};

	const handleFileSelect = (event) => {
		const file = event.target.files[0];
		setSelectedFile(file);
	};

	const onSubmit: SubmitHandler<PresentationProps> = async (data) => {
		const newPresentation = {
			title: data.title,
			presentation: selectedFile,
			discription: data.discription
		};
		console.log(saveIdElement);

		await editPresentation({ newPresentation, saveIdElement });
	};
	const finder = data?.find((item) => item._id===saveIdElement);

	useEffect(() => {
		reset({
			title: finder?.title,
			presentation: finder?.presentation,
			discription: finder?.discription
		});
	}, [finder]);
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
						<p className={scss.com_text}>Добавить презентацию</p>
					</Typography>

					<Box className={scss.input_button_card}>
						<div className={scss.input}>
							<Controller
								name="title"
								control={control}
								defaultValue=""
								rules={{ required: 'Введите название презентации' }}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="text"
										width="100%"
										placeholder="Введите название презентации"
									/>
								)}
							/>

							<Controller
								name="discription"
								control={control}
								defaultValue=""
								rules={{ required: 'Введите описание презентации' }}
								render={({ field }) => (
									<Input
										size="medium"
										{...field}
										type="text"
										width="100%"
										placeholder="Введите описание презентации"
									/>
								)}
							/>
						</div>

						<div className={scss.button_review}>
							<Controller
								name="presentation"
								control={control}
								defaultValue=""
								rules={{ required: 'Выберите файл в формате ppt' }}
								render={({ field }) => (
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											width: '100%'
										}}
									>
										<input
											type="file"
											accept=".ppt, .pptx"
											onChange={(e) => {
												handleFileSelect(e);
												field.onChange(e);
											}}
											ref={fileInputRef}
											style={{ display: 'none' }}
										/>
										<input
											type="text"
											value={selectedFile ? selectedFile.name : ''}
											readOnly
											placeholder="Выберите файл в формате ppt"
											className={scss.input}
										/>
										<ButtonCancel
											type="button"
											disabled={false}
											onClick={openFilePicker}
											width="117px"
										>
											Обзор...
										</ButtonCancel>
									</div>
								)}
							/>
						</div>
						<div className={scss.button_add}>
							<ButtonCancel
								type="button"
								disabled={false}
								onClick={handleClose}
								width="117px"
							>
								Отмена
							</ButtonCancel>
							<ButtonSave
								onClick={handleSubmit(onSubmit)}
								type="submit"
								width="117px"
								disabled={false}
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

export default EditPresentation;
