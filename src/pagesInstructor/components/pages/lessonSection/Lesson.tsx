import { Box, Tab, Tabs } from '@mui/material';
import scss from './Lesson.module.scss';
import { useState } from 'react';
import {
	IconAB2,
	IconBrandYoutubeKids,
	IconDeviceDesktop,
	IconFile,
	IconLink
} from '@tabler/icons-react';
import 'keen-slider/keen-slider.min.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import VideoLessonPage from '../VideoLessonPage';

import PresentationPage from '../PresentationPage';
import { ScrollArea } from '@mantine/core';
import CrateTask from '../createTaskSection/CrateTask';
import GetTask from '../getTaskSection/GetTask';
import Test from '../testSection/TestInstructor';

const Lesson = () => {
	const [value, setValue] = useState(0);
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const { courseId, lessonId, getTaskId } = useParams();

	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const openInstructorPresentation = () => {
		navigate(
			`/instructor/course/${courseId}/materials/${lessonId}/presentation`
		);
	};

	const handleOpenVideo = () => {
		navigate(`/instructor/course/${courseId}/materials/${lessonId}/video`);
	};
	const openLesson = () => {
		navigate(`/instructor/course/${courseId}/materials/${lessonId}/lesson`);
	};

	const handleOpenTest = () => {
		navigate(`/instructor/course/${courseId}/materials/${lessonId}/test`);
	};
	

	return (
		<div className={scss.lesson}>
			<h1>Материалы</h1>
			<div
				style={{
					background: '#fff',
					borderRadius: '10px',
					width: '100%'
					// overflowY: 'scroll'
				}}
			>
				<div
					style={{
						display: 'flex',
						justifyContent: 'flex-start'
					}}
				>
					<div className={scss.container}>
						<div className={scss.content}>
							<ScrollArea type="always" offsetScrollbars classNames={scss}>
								<Box>
									<Tabs
										value={value}
										onChange={handleChange}
										aria-label="basic tabs example"
									>
										<Tab
											icon={<IconBrandYoutubeKids stroke={2} />}
											label="Видеоурок"
											id="simple-tab-0"
											className={scss.tab}
											aria-controls="simple-tabpanel-0"
											onClick={handleOpenVideo}
										/>
										<Tab
											icon={<IconDeviceDesktop stroke={2} />}
											label="Презентация"
											id="simple-tab-1"
											className={scss.tab}
											aria-controls="simple-tabpanel-1"
											onClick={openInstructorPresentation}
										/>
										<Tab
											icon={<IconFile stroke={2} />}
											label="Задание"
											id="simple-tab-2"
											className={scss.tab}
											aria-controls="simple-tabpanel-2"
											onClick={openLesson}
										/>
										<Tab
											icon={<IconLink stroke={2} />}
											label="Ссылка"
											className={scss.tab}
											id="simple-tab-3"
											aria-controls="simple-tabpanel-3"
										/>
										<Tab
											icon={<IconAB2 stroke={2} />}
											label="Тест"
											id="simple-tab-4"
											className={scss.tab}
											aria-controls="simple-tabpanel-4"
											onClick={handleOpenTest}
										/>
									</Tabs>
								</Box>
							</ScrollArea>
							{pathname ===
								`/instructor/course/${courseId}/materials/${lessonId}/video` && (
								<>
									<VideoLessonPage />
								</>
							)}
							{pathname ===
								`/instructor/course/${courseId}/materials/${lessonId}/presentation` && (
								<>
									<PresentationPage />
								</>
							)}
							{pathname ===
								`/instructor/course/${courseId}/materials/${lessonId}/lesson` && (
								<>
									<CrateTask />
								</>
							)}

							{pathname ===
								`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/panding` && (
								<>
									<GetTask />
								</>
							)}
							{pathname ===
								`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/accepted` && (
								<>
									<GetTask />
								</>
							)}
							{pathname ===
								`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/notAccepted` && (
								<>
									<GetTask />
								</>
							)}
							{pathname ===
								`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/late` && (
								<>
									<GetTask />
								</>
							)}
							{pathname ===
								`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/notSubmitted` && (
								<>
									<GetTask />
								</>
							)}
							{pathname ===
								`/instructor/course/${courseId}/materials/${lessonId}/test` && (
								<>
									<Test />
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Lesson;
