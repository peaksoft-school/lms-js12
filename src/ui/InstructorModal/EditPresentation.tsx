import scss from './Styled.module.scss';
import { FC, useEffect, useRef, useState } from 'react';
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
	useCreatePresentationFileMutation,
	useEditPresentationMutation,
	useGetPresentationQuery
} from '@/src/redux/api/instructor/presentation';
import { useCreateGroupFileMutation } from '@/src/redux/api/admin/groups';

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
	const { data } = useGetPresentationQuery();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [selectedFile, setSelectedFile] = useState<string>(null);
	const [editPresentation] = useEditPresentationMutation();
	const [createPresentationFile] = useCreatePresentationFileMutation();

	const openFilePicker = () => {
		fileInputRef.current?.click();
	};

	// const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	const file = event.target.files?.[0] || null;
	// 	if (file) {
	// 		const reader = new FileReader();
	// 		// setHidePhoto(true);

	// 		reader.onload = async (e) => {
	// 			if (e.target) {
	// 				const imageUrl = e.target.result as string;
	// 				setSelectedFile(imageUrl);
	// 				const fileObj = {
	// 					fileName: file.name,
	// 					urlFile: imageUrl
	// 				};
	// 				// console.log(fileObj);

	// 				await createPresentationFile(fileObj);
	// 				setSelectedFile(file.name);
	// 				// console.log(imageUrl);
	// 			}
	// 		};

	// 		reader.readAsDataURL(file);
	// 	}
	// };

	const handleFileSelect = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const files = event.target.files;
		if (files && files[0]) {
			const file = files[0];
			const newFileUrls: string[] = [];
			const formData = new FormData();
			formData.append('file', file);
			try {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const response: any = await createPresentationFile(formData as any);
				const test = JSON.parse(response.data);
				newFileUrls.push(test.object);
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				setSelectedFile(newFileUrls as any);
			} catch (error) {
				console.error('Error uploading file:', error);
			}
		}
	};

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		if (selectedFile && saveIdElement !== null) {
			const newPresentation = {
				title: data.title,
				file: selectedFile,
				description: data.description
			};
			await editPresentation({ newPresentation, saveIdElement });
			reset();
			handleClose();
		}
	};

	// const finder = data?.find((item) => item.id === saveIdElement);

	useEffect(() => {
		console.log('Data:', data);
		const finder = data?.find((item) => item.id === saveIdElement);
		console.log('Finder:', finder);
		if (finder) {
			reset({
				title: finder.title,
				file: finder.file,
				description: finder.description
			});
		}
	}, [saveIdElement, data, reset]);

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
						<p className={scss.com_text}>Редактировать презентацию</p>
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
								name="description"
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
									<div className={scss.review}>
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
											value={selectedFile ? selectedFile : ''}
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
