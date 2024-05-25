import Input from '@/src/ui/customInput/Input';
import scss from './EditTask.module.scss';
import { useRef, useState } from 'react';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import { Button } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { useNavigate, useParams } from 'react-router-dom';
import {
	useEditTaskInstructorMutation,
	useGetTaskInstructorQuery
} from '@/src/redux/api/instructor/addTask';
import { IconDownload } from '@tabler/icons-react';
import { Dayjs } from 'dayjs';

const EditTask = () => {
	const task = localStorage.getItem('task');
	const { data } = useGetTaskInstructorQuery();
	const navigate = useNavigate();
	const id = data?.find((item) => item._id === Number(task));
	const [title, setTitle] = useState<string>(id!.title);
	const [value, setValue] = useState(id!.description);
	const { courseId, lessonId } = useParams();
	const [selectedDate, setSelectedDate] = useState<Dayjs | null | undefined>(
		null
	);
	const [editTaskInstructor] = useEditTaskInstructorMutation();
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
	const fileInputRef = useRef<HTMLInputElement>(null);

	const openFilePicker = () => {
		fileInputRef.current?.click();
	};

	const addTask = async () => {
		const selectedFile = fileInputRef.current?.files?.[0];
		const newtask = {
			title,
			description: value,
			file: selectedFile,
			dedline: selectedDate
		};

		await editTaskInstructor({ newtask, task });
		navigate(`/instructor/course/${courseId}/materials/${lessonId}/lesson`);
	};

	return (
		<div className={scss.addTask}>
			<h1>Материалы</h1>
			<div className={scss.conatiner}>
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
							Загрузить файл <IconDownload stroke={2} />
						</ButtonCancel>
					</div>
					<div className={scss.input_part}>
						<Input
							type="text"
							width="100%"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							size="small"
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
						onClick={() =>
							navigate(
								`/instructor/course/${courseId}/materials/${lessonId}/lesson`
							)
						}
						width="105px"
					>
						Отмена
					</ButtonCancel>
					<Button
						variant="contained"
						style={{ padding: '10px 24px' }}
						onClick={addTask}
					>
						Добавить
					</Button>
				</div>
			</div>
		</div>
	);
};

export default EditTask;
