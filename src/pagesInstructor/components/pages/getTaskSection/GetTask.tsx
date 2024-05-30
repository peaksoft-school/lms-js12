import { useGetTaskInstructorQuery } from '@/src/redux/api/instructor/addTask';
import scss from './GetTask.module.scss';
import { Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import PandingPage from '../PandingPage';
// import Accepted from '../acceptedSection/Accepted';
// import NotAccepted from '../notAccepted/NotAccepted';
import Late from '../lateSection/Late';
import Panding from '../pandingSection/Panding';
import Accepted from '../acceptedSection/Accepted';
import NotAccepted from '../notAcceptedSection/NotAccepted';
import NotSubmitted from '../notSubmittedSection/NotSubmitted';
import { Box, ScrollArea } from '@mantine/core';
// import NotSubmitted from '../notSubmitted/NotSubmitted';
const GetTask = () => {
	const { courseId, lessonId, getTaskId } = useParams();
	const navigate = useNavigate();
	const { data } = useGetTaskInstructorQuery();
	const [value, setValue] = useState(0);
	const { pathname } = useLocation();
	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	useEffect(() => {
		if (
			pathname ===
			`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/panding`
		) {
			setValue(0);
		} else if (
			pathname ==
			`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/accepted`
		) {
			setValue(1);
		} else if (
			pathname ==
			`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/late`
		) {
			setValue(3);
		} else if (
			pathname ===
			`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/notAccepted`
		) {
			setValue(2);
		} else if (
			pathname ===
			`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/notSubmitted`
		) {
			setValue(4);
		}
	}, [pathname]);
	const handleOpenPanding = () => {
		navigate(
			`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/panding`
		);
	};
	const handleOpenAccepted = () => {
		navigate(
			`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/accepted`
		);
	};
	const handleOpenNotAccepted = () => {
		navigate(
			`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/notAccepted`
		);
	};
	const handleOpenLate = () => {
		navigate(
			`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/late`
		);
	};
	const handleOpenNotSubmitted = () => {
		navigate(
			`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/notSubmitted`
		);
	};
	return (
		<div className={scss.get_task}>
			<div className={scss.Task}>
				{data?.map((item) => (
					<div className={scss.card}>
						<div className={scss.text}>
							<h2>{item.title}</h2>
							<h2>{item.dedline}</h2>
						</div>

						<div dangerouslySetInnerHTML={{ __html: item.description }} />
					</div>
				))}
				<ScrollArea
					scrollbars="xy"
					offsetScrollbars
					classNames={scss}
					type="always"
				>
					<Box>
						<Tabs
							value={value}
							onChange={handleChange}
							aria-label="basic tabs example"
						>
							<Tab
								label="Ожидание"
								id="simple-tab-0"
								className={scss.tab}
								aria-controls="simple-tabpanel-0"
								onClick={handleOpenPanding}
							/>
							<Tab
								label="Принято"
								id="simple-tab-1"
								className={scss.tab}
								aria-controls="simple-tabpanel-1"
								onClick={handleOpenAccepted}
							/>
							<Tab
								label="Не Принято"
								onClick={handleOpenNotAccepted}
								id="simple-tab-2"
								className={scss.tab}
								aria-controls="simple-tabpanel-2"
							/>
							<Tab
								label="Опоздание"
								className={scss.tab}
								id="simple-tab-3"
								aria-controls="simple-tabpanel-3"
								onClick={handleOpenLate}
							/>
							<Tab
								label="Не сдавшие"
								id="simple-tab-4"
								className={scss.tab}
								aria-controls="simple-tabpanel-4"
								onClick={handleOpenNotSubmitted}
							/>
						</Tabs>
					</Box>
				</ScrollArea>
				{pathname ===
					`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/panding` && (
					<>
						<Panding />
					</>
				)}
				{pathname ===
					`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/accepted` && (
					<>
						<Accepted />
					</>
				)}
				{pathname ===
					`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/notAccepted` && (
					<>
						<NotAccepted />
					</>
				)}
				{pathname ===
					`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/notSubmitted` && (
					<>
						<NotSubmitted />
					</>
				)}
				{pathname ===
					`/instructor/course/${courseId}/materials/${lessonId}/lesson/${getTaskId}/late` && (
					<>
						<Late />
					</>
				)}
			</div>
		</div>
	);
};

export default GetTask;
