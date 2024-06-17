import scss from './Test.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetStudentTestQuery } from '@/src/redux/api/students/test';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

const Test = () => {
	const navigate = useNavigate();
	const { coursesId, lessonId } = useParams();
	const lesson = Number(lessonId);
	const [isMobile, setIsMobile] = useState(true);
	useEffect(() => {
		const changeIsMobile = () => {
			if (window.innerWidth < 1200) {
				setIsMobile(true);
			} else {
				setIsMobile(false);
			}
		};

		changeIsMobile();
		window.addEventListener('resize', changeIsMobile);

		return () => {
			window.removeEventListener('resize', changeIsMobile);
		};
	}, []);
	const { data } = useGetStudentTestQuery(lesson);
	const truncateText = (text: string, maxLength: number) => {
		if (text.length <= maxLength) {
			return text;
		}
		return `${text.substring(0, maxLength)}...`;
	};

	return (
		<div className={scss.test_container}>
			<div className={scss.container}>
				{data?.testResponseForGetAll.map((question, index) => (
					<div className={scss.test_container_second}>
						<div className={scss.test_container_fifth}>
							<div className={scss.test_container_third}>
								<h4>{index + 1}</h4>
								<h4 className={scss.test_text}>
									{isMobile ? (
										<>{truncateText(question.title, 20)}</>
									) : (
										<>{truncateText(question.title, 40)}</>
									)}
								</h4>
							</div>
							<div className={scss.test_container_forth}>
								<p className={scss.text_time}>
									Время: {question.hour}:{question.minute} минут
								</p>
							</div>
						</div>
						<div className={scss.test_buttons_container}>
							<Button
								variant="contained"
								onClick={() =>
									navigate(
										`/courses/${coursesId}/materials/${lessonId}/${question.testId}/showTest`
									)
								}
							>
								{' '}
								Начать тест
							</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Test;
