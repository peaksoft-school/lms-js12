import { Button } from '@mui/material';
import scss from './StudentPresentation.module.scss';
import { useState } from 'react';
import ModalPresentation from '@/src/ui/InstructorModal/ModalPresentation';
import { useGetPresentationForStudentQuery } from '@/src/redux/api/students/presentationStudent';
import { useParams } from 'react-router-dom';

const StudentPresentation = () => {
	const { lessonId } = useParams();
	const test = Number(lessonId);
	const { data } = useGetPresentationForStudentQuery(test);
	const [openPresentation, setOpenPresentation] = useState(false);
	const [presentationModal, setPresentationModal] = useState<null | number>(
		null
	);

	const openPresentationFunc = (id: number) => {
		setPresentationModal(id);
		setOpenPresentation(true);
	};

	const closePresentation = () => {
		setOpenPresentation(false);
	};

	return (
		<div className={scss.presentation}>
			<div className={scss.card}>
				{data?.map((item) => (
					<div key={item.id} className={scss.content}>
						<div className={scss.cards}>
							<div className={scss.img}>
								<iframe
									style={{ height: '200px' }}
									className={scss.iframe}
									src={`https://lms-b12.s3.eu-central-1.amazonaws.com/${item.file}`}
									frameBorder="0"
								></iframe>
								<div className={scss.button_watch}>
									<Button
										sx={{
											borderRadius: '8px',
											textTransform: 'capitalize',
											background: '#0000ff7f',
											'&:hover': {
												background: '#0000ffb2'
											}
										}}
										size="medium"
										variant="contained"
										onClick={() => openPresentationFunc(item.id)}
									>
										Смотреть
									</Button>
								</div>
							</div>
							<div className={scss.title}>
								<div className={scss.text}>
									<h1>{item.title}</h1>
									<p>{item.description}</p>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
			<ModalPresentation
				saveId={presentationModal}
				open={openPresentation}
				handleClose={closePresentation}
			/>
		</div>
	);
};

export default StudentPresentation;
