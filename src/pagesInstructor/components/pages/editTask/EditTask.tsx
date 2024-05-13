import Input from '@/src/ui/customInput/Input';
import scss from './EditTask.module.scss';
import { useState } from 'react';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import { Button } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { useNavigate } from 'react-router-dom';
import {
	useEditTaskInstructorMutation,
	useGetTaskInstructorQuery
} from '@/src/redux/api/instructor/addTask';

const EditTask = () => {
	const task = localStorage.getItem('task');
	const { data } = useGetTaskInstructorQuery();
	const navigate = useNavigate();
	const id = data?.find((item) => item._id === +task);
	console.log(id?.title);
	const [title, setTitle] = useState(id?.title);
	const [value, setValue] = useState(id?.description);
	const [dedline, setDedlene] = useState(id?.dedline);
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

	const lessonId = localStorage.getItem('lessonId');
	const _id = localStorage.getItem('id');
	const addTask = async () => {
		const newtask = {
			title,
			description: value,
			dedline
		};
		await editTaskInstructor({ newtask, task });
		navigate(`/instructor/course/${_id}/materials/${lessonId}/lesson`);
	};

	return (
		<div className={scss.addTask}>
			<h1>Материалы</h1>
			<div className={scss.conatiner}>
				<div className={scss.main_task}>
					<p>Создать задание</p>
					<div className={scss.input_part}>
						<Input
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							size="small"
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
				<p>Срок сдачи:</p>
				<input
					type="date"
					value={dedline}
					onChange={(e) => setDedlene(e.target.value)}
				/>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<ButtonCancel>Отмена</ButtonCancel>
					<Button variant="contained" onClick={addTask}>
						Добавить
					</Button>
				</div>
			</div>
		</div>
	);
};

export default EditTask;
