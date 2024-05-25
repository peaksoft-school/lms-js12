import { Tab, Tabs } from '@mui/material';
import scss from './LessonsStudent.module.scss';
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
import StudentVideoLessonPage from '../StudentVideoLessonPage';
import { Box, ScrollArea } from '@mantine/core';
import StudentPresentationPage from '../StudentPresentationPage';
import TestSection from '../TestSection';

const LessonsStudent = () => {
	const [value, setValue] = useState(0);
	const navigate = useNavigate();

	const { pathname } = useLocation();

	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const { courseId, lessonId } = useParams();

	const handleOpenVideo = () => {
		navigate(`/courses/${courseId}/materials/${lessonId}/video`);
	};

	const openStudentPresentation = () => {
		navigate(`/courses/${courseId}/materials/${lessonId}/presentation`);
	};
	const OpenTest = () => {
		navigate(`/courses/${courseId}/materials/${lessonId}/test`);
	};

	return (
		<div className={scss.lesson}>
			<h1>Материалы</h1>
			<div
				style={{
					background: '#fff',
					borderRadius: '10px',
					width: '100%',
					overflowY: 'scroll'
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
											onClick={openStudentPresentation}
										/>
										<Tab
											icon={<IconFile stroke={2} />}
											label="Задание"
											id="simple-tab-2"
											className={scss.tab}
											aria-controls="simple-tabpanel-2"
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
											onClick={OpenTest}
										/>
									</Tabs>
								</Box>
							</ScrollArea>
							{pathname ===
								`/courses/${courseId}/materials/${lessonId}/video` && (
								<>
									<StudentVideoLessonPage />
								</>
							)}
							{pathname ===
								`/courses/${courseId}/materials/${lessonId}/presentation` && (
								<>
									<StudentPresentationPage />
								</>
							)}
							{pathname ===
								`/courses/${courseId}/materials/${lessonId}/test` && (
								<>
									<TestSection />
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LessonsStudent;
