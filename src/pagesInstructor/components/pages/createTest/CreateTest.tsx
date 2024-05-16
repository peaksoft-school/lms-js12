import { Button } from '@mui/material';
import { IconPlus } from '@tabler/icons-react';
import scss from './CreateTest.module.scss';
import { useNavigate } from 'react-router-dom';
const CreateTest = () => {
	const navigate = useNavigate();
	const id = localStorage.getItem('id');
	const lessonId = localStorage.getItem('lessonId');
	const OpenCreateTest = () => {
		navigate(`/instructor/course/${id}/materials/${lessonId}/createTest`);
	};

	return (
		<div>
			<div className={scss.button_title_elements}>
				<Button
					size="large"
					className={scss.button}
					onClick={OpenCreateTest}
					variant="contained"
				>
					<div className={scss.icon}>
						<IconPlus stroke={2} />
					</div>
					<span>Создать тест</span>
				</Button>
			</div>
		</div>
	);
};

export default CreateTest;
