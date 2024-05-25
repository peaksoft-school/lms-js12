import Input from '@/src/ui/customInput/Input';
import scss from './AddTask.module.scss';
import { useRef, useState } from 'react';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import { Button } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useCreateTaskInstructorMutation } from '@/src/redux/api/instructor/addTask';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useNavigate } from 'react-router-dom';
import { IconDownload } from '@tabler/icons-react';
import { Dayjs } from 'dayjs';
import { Box, ScrollArea } from '@mantine/core';
const AddTask = () => {
	const [title, setTitle] = useState('');
	const [selectedDate, setSelectedDate] = useState<Dayjs | null | undefined>(
		null
	);
	const [value, setValue] = useState('');
	const [createTaskInstructor] = useCreateTaskInstructorMutation();
	const navigate = useNavigate();

	const fileInputRef = useRef<HTMLInputElement>(null);

	const openFilePicker = () => {
		fileInputRef.current?.click();
	};
	const modules = {
		toolbar: [
			[[{ header: [1, 2, 3, 4, 5, 6, false] }]],
			[{ font: [] }],
			[{ size: [] }],
			[
				'bold',
				'italic',
				'underline',
				'strike',
				'blockquote',
				'link',
				'image',
				'code-block'
			],
			[
				{ list: 'ordered' },
				{ list: 'bullet' },
				{ indent: '-1' },
				{ indent: '+1' }
			],
			[{ color: [] }, { background: [] }]
		]
	};

	const addTask = async () => {
		const selectedFile = fileInputRef.current?.files?.[0];
		console.log(selectedFile);

		const newtask = {
			title,
			description: value,
			file: selectedFile,
			dedline: selectedDate
		};

		await createTaskInstructor(newtask);
		setValue('');
		setTitle('');
		setSelectedDate(null);
	};

	// const addTask = async () => {
	// 	const newtask = {
	// 		file: fileInputRef,
	// 		title,
	// 		description: value,
	// 		dedline: selectedDate
	// 	};
	// 	await createTaskInstructor(newtask);
	// 	setValue('');
	// 	setTitle('');
	// 	setSelectedDate(null);
	// };
	const lessonId = localStorage.getItem('lessonId');
	const _id = localStorage.getItem('id');

	return (
		<div className={scss.addTask}>
			<h1>Материалы</h1>
			<ScrollArea
				type="always"
				scrollbars="y"
				offsetScrollbars
				classNames={scss}
			>
				<Box>
					<div className={scss.container}>
						<div className={scss.main_task}>
							<p style={{ color: '#1f6ed4' }}>Создать задание</p>
							<div className={scss.save_file}>
								<input
									type="file"
									ref={fileInputRef}
									style={{ display: 'none' }}
									onChange={() => {}}
								/>
								<ButtonCancel
									disabled={false}
									width="207px"
									onClick={openFilePicker}
									type="button"
								>
									<span> Загрузить файл</span> <IconDownload stroke={2} />
								</ButtonCancel>
							</div>
							<div className={scss.input_part}>
								<Input
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									size="small"
									type="text"
									width="100%"
									placeholder="Название задания"
								/>
							</div>
							<div className={scss.secon_part}>
								<div className={scss.second_part}>
									<div className={scss.editor}>
										<ReactQuill
											theme="snow"
											value={value}
											onChange={(newValue) => setValue(newValue)}
											className={scss.editorInput}
											modules={modules}
										/>
										{value.includes('<img') && (
											<div className={scss.button}>
												<Button
													className={scss.btn}
													onClick={() => setValue('')}
												>
													Удалить
												</Button>
											</div>
										)}
										{value.includes('<a') && (
											<div className={scss.link}>
												<Button
													className={scss.btn}
													onClick={() => setValue('')}
												>
													x
												</Button>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className={scss.calendar}>
						<div className={scss.dataInput}>
							<p>Срок сдачи:</p>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DemoContainer components={['DateTimePicker']}>
									<DateTimePicker
										label="Выберите дату и время"
										value={selectedDate}
										onChange={(newDate) => setSelectedDate(newDate)}
									/>
								</DemoContainer>
							</LocalizationProvider>
						</div>

						<div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
							<ButtonCancel
								type="button"
								disabled={false}
								width="105px"
								onClick={() =>
									navigate(
										`/instructor/course/${_id}/materials/${lessonId}/lesson`
									)
								}
							>
								Отмена
							</ButtonCancel>
							<Button
								variant="contained"
								style={{ padding: '10px 24px', borderRadius: '8px' }}
								onClick={addTask}
							>
								Добавить
							</Button>
						</div>
					</div>
				</Box>
			</ScrollArea>
		</div>
	);
};

export default AddTask;
