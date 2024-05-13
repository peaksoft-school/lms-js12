import { Tab, Tabs } from '@mui/material';
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
import { useLocation, useNavigate } from 'react-router-dom';
import VideoLessonPage from '../VideoLessonPage';
import { useKeenSlider } from 'keen-slider/react';

const Lesson = () => {
	const [value, setValue] = useState(0);
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const id = localStorage.getItem('id');
	const item = localStorage.getItem('lessonId');

	const handleOpenVideo = () => {
		navigate(`/instructor/course/${id}/materials/${item}/video`);
	};
	const [ref] = useKeenSlider<HTMLDivElement>({
		breakpoints: {
			'(min-width: 500px)': {
				slides: { perView: 3, spacing: 5 }
			},
			'(max-width: 1000px)': {
				slides: { perView: 4, spacing: 10 }
			}
		},
		slides: { perView: 3 }
	});
	return (
		<div className={scss.lesson}>
			<h1>Материалы</h1>
			<div
				style={{
					background: '#fff',
					borderRadius: '10px',
					width: '100%',
					height: '737px'
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
							<Tabs
								ref={ref}
								className="keen-slider"
								value={value}
								onChange={handleChange}
								aria-label="basic tabs example"
							>
								<Tab
									icon={<IconBrandYoutubeKids stroke={2} />}
									label="Видеоурок"
									id="simple-tab-0"
									className="keen-slider__slide number-slide1"
									// className={scss.tab}
									aria-controls="simple-tabpanel-0"
									onClick={handleOpenVideo}
								/>
								<Tab
									className="keen-slider__slide number-slide1"
									icon={<IconDeviceDesktop stroke={2} />}
									label="Презентация"
									id="simple-tab-1"
									// className={scss.tab}
									aria-controls="simple-tabpanel-1"
								/>
								<Tab
									className="keen-slider__slide number-slide1"
									icon={<IconFile stroke={2} />}
									label="Задание"
									id="simple-tab-2"
									// className={scss.tab}
									aria-controls="simple-tabpanel-2"
								/>
								<Tab
									className="keen-slider__slide number-slide1"
									icon={<IconLink stroke={2} />}
									label="Ссылка"
									// className={scss.tab}
									id="simple-tab-3"
									aria-controls="simple-tabpanel-3"
								/>
								<Tab
									className="keen-slider__slide number-slide1"
									icon={<IconAB2 stroke={2} />}
									label="Тест"
									id="simple-tab-4"
									// className={scss.tab}
									aria-controls="simple-tabpanel-4"
								/>
							</Tabs>
							{pathname ===
								`/instructor/course/${id}/materials/${item}/video` && (
								<>
									<VideoLessonPage />
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
