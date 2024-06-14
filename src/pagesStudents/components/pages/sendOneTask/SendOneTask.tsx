import { useGetTaskInstructorQuery } from '@/src/redux/api/instructor/addTask';
import scss from './SendOneTask.module.scss';
import Input from '@/src/ui/customInput/Input';
import ReactQuill from 'react-quill';
import { useState } from 'react';
import ButtonSave from '@/src/ui/customButton/ButtonSave';
import { useParams } from 'react-router-dom';

const SendOneTask = () => {
	const { lessonId } = useParams();
	const lesson = Number(lessonId);
	const { data } = useGetTaskInstructorQuery(lesson);
	const [text, setText] = useState('');
	const [homeWork, setHomeWork] = useState('');
	const [value, setValue] = useState<string>();
	const modules = {
		toolbar: [
			[[{ header: [1, 2, 3, 4, 5, 6, false] }]],

			['link', 'image', 'code-block']
		]
	};

	return (
		<div className={scss.get_task}>
			<div className={scss.Task}>
				{data?.taskResponse.map((item) => (
					<div className={scss.card}>
						<div className={scss.text}>
							<h2>{item.title}</h2>
							<h2>{item.deadline}</h2>
						</div>

						<div dangerouslySetInnerHTML={{ __html: item.description }} />
					</div>
				))}
				<div className={scss.comment}>
					<div>
						<Input
							type="text"
							value={text}
							onChange={(e) => setText(e.target.value)}
							size="small"
							placeholder="Текст домашнего задания"
							width="100%"
						/>
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
							value={homeWork}
							onChange={(e) => setHomeWork(e.target.value)}
							size="small"
							placeholder="Комментарий к заданию"
							width="100%"
						/>
						<ButtonSave
							disabled={false}
							onClick={() => {}}
							width="100%"
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
