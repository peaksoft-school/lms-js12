import { Button, Tab, Tabs } from '@mui/material';
import scss from './Lesson.module.scss';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	IconAB2,
	IconBrandYoutubeKids,
	IconDeviceDesktop,
	IconFile,
	IconLink,
	IconPlus
} from '@tabler/icons-react';
// import ModalAddVideoLesson from '@/src/ui/InstructorModal/ModalAddVideoLesson';
import Presentation from '../presentationSection/Presentation';

const Lesson = () => {
	const [value, setValue] = useState(0);
	const [open, setOpen] = useState<boolean>(false);
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const item = localStorage.getItem('lessonId');
	const id = localStorage.getItem('id');
	const openInstructorPresentation = () => {
		navigate(`/instructor/course/${id}/materials/${item}/presentation`);
	};
	return (
		<div className={scss.lesson}>
			<h1>Материалы</h1>
			<div
				style={{
					paddingInline: '20px',
					marginBottom: '20px',
					display: 'flex',
					justifyContent: 'flex-end'
				}}
			>
				<Button
					size="large"
					className={scss.button}
					variant="contained"
					onClick={handleOpen}
				>
					<div className={scss.icon}>
						<IconPlus stroke={2} />
					</div>
					<span>Добавить студента</span>
				</Button>
			</div>

			<div
				style={{
					background: '#fff',
					height: '735px',
					borderRadius: '10px',
					overflowY: 'scroll',
					scrollbarColor: '#3772ff #fff'
				}}
			>
				<div className={scss.content}>
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
						/>
						<Tab
							icon={<IconDeviceDesktop stroke={2} />}
							label="Презентация"
							id="simple-tab-1"
							onClick={openInstructorPresentation}
							className={scss.tab}
							aria-controls="simple-tabpanel-1"
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
						/>
					</Tabs>
				</div>
			{pathname ===
				`/instructor/course/${id}/materials/${item}/presentation` && (
				<>
					<Presentation />
				</>
			)}
			</div>
		</div>
	);
};

export default Lesson;
