import { Button } from '@mui/material';
import scss from './StudentPresentation.module.scss';
import { useState } from 'react';
import { useGetPresentationQuery } from '@/src/redux/api/instructor/presentation';
import ModalPresentation from '@/src/ui/InstructorModal/ModalPresentation';

const StudentPresentation = () => {
	const { data } = useGetPresentationQuery();
	const [openPresentation, setOpenPresentation] = useState(false);

	const openPresentationFunc = () => {
		setOpenPresentation(true);
	};
	const closePresentation = () => {
		setOpenPresentation(false);
	};

	return (
		<div className={scss.presentation}>
			<div className={scss.card}>
				{data?.map((item) => {
					return (
						<div key={item._id} className={scss.content}>
							<div className={scss.cards}>
								<div className={scss.img}>
									<img
										src="https://pptmon.com/wp-content/uploads/2022/03/Simple-Geometric-Pattern-Free-Google-Slides-Theme-and-PowerPoint-Template.png"
										alt=""
									/>
									<div
										onClick={openPresentationFunc}
										className={scss.button_watch}
									>
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
											onClick={openPresentationFunc}
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
					);
				})}
			</div>
			<ModalPresentation
				open={openPresentation}
				handleClose={closePresentation}
			/>
		</div>
	);
};

export default StudentPresentation;
