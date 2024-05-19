import { useGetTaskInstructorQuery } from '@/src/redux/api/instructor/addTask';
import scss from './GetTask.module.scss';
import { Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import PandingPage from '../PandingPage';
// import Accepted from '../acceptedSection/Accepted';
// import NotAccepted from '../notAccepted/NotAccepted';
import Late from '../late/Late';
import Panding from '../panding/Panding';
import Accepted from '../acceptedSection/Accepted';
import NotAccepted from '../notAccepted/NotAccepted';
import NotSubmitted from '../notSubmitted/NotSubmitted';
// import NotSubmitted from '../notSubmitted/NotSubmitted';
const GetTask = () => {
	const nanvigate = useNavigate();
	const { data } = useGetTaskInstructorQuery();
	const [value, setValue] = useState(0);
	const { pathname } = useLocation();
	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};
	const id = localStorage.getItem('id');
	const lessonId = localStorage.getItem('lessonId');
	const task = localStorage.getItem('task');
	useEffect(() => {
		if (
			pathname ===
			`/instructor/course/${id}/materials/${lessonId}/lesson/${task}/panding`
		) {
			setValue(0);
		} else if (
			pathname ==
			`/instructor/course/${id}/materials/${lessonId}/lesson/${task}/accepted`
		) {
			setValue(1);
		} else if (
			pathname ==
			`/instructor/course/${id}/materials/${lessonId}/lesson/${task}/late`
		) {
			setValue(3);
		} else if (
			pathname ===
			`/instructor/course/${id}/materials/${lessonId}/lesson/${task}/notAccepted`
		) {
			setValue(2);
		} else if (
			pathname ===
			`/instructor/course/${id}/materials/${lessonId}/lesson/${task}/notSubmitted`
		) {
			setValue(4);
		}
	}, [pathname]);
	const handleOpenPanding = () => {
		nanvigate(
			`/instructor/course/${id}/materials/${lessonId}/lesson/${task}/panding`
		);
	};
	const handleOpenAccepted = () => {
		nanvigate(
			`/instructor/course/${id}/materials/${lessonId}/lesson/${task}/accepted`
		);
	};
	const handleOpenNotAccepted = () => {
		nanvigate(
			`/instructor/course/${id}/materials/${lessonId}/lesson/${task}/notAccepted`
		);
	};
	const handleOpenLate = () => {
		nanvigate(
			`/instructor/course/${id}/materials/${lessonId}/lesson/${task}/late`
		);
	};
	const handleOpenNotSubmitted = () => {
		nanvigate(
			`/instructor/course/${id}/materials/${lessonId}/lesson/${task}/notSubmitted`
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
						label="ПРИНЯТО"
						id="simple-tab-1"
						className={scss.tab}
						aria-controls="simple-tabpanel-1"
						onClick={handleOpenAccepted}
					/>
					<Tab
						label="НЕ ПРИНЯТО"
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
						label="не сдавшие"
						id="simple-tab-4"
						className={scss.tab}
						aria-controls="simple-tabpanel-4"
						onClick={handleOpenNotSubmitted}
					/>
				</Tabs>
				{pathname ===
					`/instructor/course/${id}/materials/${lessonId}/lesson/${task}/panding` && (
					<>
						<Panding />
					</>
				)}
				{pathname ===
					`/instructor/course/${id}/materials/${lessonId}/lesson/${task}/accepted` && (
					<>
						<Accepted />
					</>
				)}
				{pathname ===
					`/instructor/course/${id}/materials/${lessonId}/lesson/${task}/notAccepted` && (
					<>
						<NotAccepted />
					</>
				)}
				{pathname ===
					`/instructor/course/${id}/materials/${lessonId}/lesson/${task}/notSubmitted` && (
					<>
						<NotSubmitted />
					</>
				)}
				{pathname ===
					`/instructor/course/${id}/materials/${lessonId}/lesson/${task}/late` && (
					<>
						<Late />
					</>
				)}
			</div>
		</div>
	);
};

export default GetTask;
