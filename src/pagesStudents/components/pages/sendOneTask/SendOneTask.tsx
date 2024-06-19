/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetTaskInstructorQuery } from '@/src/redux/api/instructor/addTask';
import scss from './SendOneTask.module.scss';
import Input from '@/src/ui/customInput/Input';
import ReactQuill from 'react-quill';
import { useRef, useState } from 'react';
import ButtonSave from '@/src/ui/customButton/ButtonSave';
import { useParams } from 'react-router-dom';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import { useCreateGroupFileMutation } from '@/src/redux/api/admin/groups';
import { usePostStudentTaskMutation } from '@/src/redux/api/students/sendTask';
import { IconDownload } from '@tabler/icons-react';

const SendOneTask = () => {
	const [postStudentTask] = usePostStudentTaskMutation();
	const { lessonId, getTaskId } = useParams();
	const lesson = Number(lessonId);
	const { data } = useGetTaskInstructorQuery(lesson);
	const [text, setText] = useState('');
	const [homeWork, setHomeWork] = useState('');
	const [value, setValue] = useState<string>('');
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [saveSelect, setSelectedFile] = useState<string | null>(null);
	const [description, setDescription] = useState('');
	const [createGroupFile] = useCreateGroupFileMutation();
	const modules = {
		toolbar: [
			[{ header: [1, 2, 3, 4, 5, 6, false] }],
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

	const handleFileSelect = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const files = event.target.files;
		if (files && files[0]) {
			const file = files[0];
			console.log(file);
			const formData = new FormData();
			formData.append('file', file);
			formData.append('description', description);
			try {
				const response: any = await createGroupFile(formData);
				const parsedData = JSON.parse(response.data);
				const fileName = parsedData.fileName;
				setSelectedFile(fileName);
				setDescription(description);
			} catch (error) {
				console.error('Error uploading file:', error);
			}
		}
	};
	const getTask = Number(getTaskId);

	const addTask = async () => {
		try {
			const newTask = {
				text: value,
				file: saveSelect,
				comment: homeWork
			};

			const response = await postStudentTask({ newTask, getTask });

			if (!response) {
				throw new Error('Invalid response from server');
			}
		} catch (error) {
			console.error('Error creating task:', error);
		}
	};

	return (
		<div className={scss.get_task}>
			<div className={scss.work}>
				{data?.taskResponse.map((item) => (
					<div className={scss.card}>
						<div className={scss.text}>
							<h2>{item.title}</h2>
							<h2>{item.deadline}</h2>
						</div>
						<div
							className={scss.inner_html}
							dangerouslySetInnerHTML={{ __html: item.description }}
						/>
					</div>
				))}
				<div className={scss.content}>
					<div className={scss.save_file}>
						<input
							type="file"
							ref={fileInputRef}
							style={{ display: 'none' }}
							onChange={handleFileSelect}
						/>
						<ButtonCancel
							disabled={false}
							width="207px"
							onClick={() => fileInputRef.current?.click()}
							type="button"
						>
							<span style={{ paddingLeft: '10px' }}> Загрузить файл</span>
							<IconDownload stroke={2} />
						</ButtonCancel>
					</div>
					<div>
						<ReactQuill
							theme="snow"
							value={value}
							onChange={(newValue) => setValue(newValue)}
							modules={modules}
							placeholder="Текст домашнего задания"
						/>
					</div>
					<div className={scss.saveInput_button}>
						<Input
							type="text"
							value={text}
							onChange={(e) => setText(e.target.value)}
							size="small"
							placeholder="Текст домашнего задания"
							width="100%"
						/>
						<Input
							type="text"
							value={homeWork}
							onChange={(e) => setHomeWork(e.target.value)}
							size="small"
							placeholder="Комментарий к заданию"
							width="100%"
						/>
					</div>
					<div
						style={{
							display: 'flex',
							justifyContent: 'end',
							paddingBottom: '30px'
						}}
					>
						<ButtonSave
							disabled={false}
							onClick={addTask}
							width="117px"
							type="button"
						>
							Отправить
						</ButtonSave>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SendOneTask;
