import scss from './Lessons.module.scss';

import { useNavigate, useParams } from 'react-router-dom';
import { Box, ScrollArea } from '@mantine/core';
import { useGetOneTaskNameQuery } from '@/src/redux/api/students/materials';
import { Tooltip } from '@mui/material';

const Lesson = () => {
	const { coursesId, lessonId } = useParams();
	const lesson = Number(lessonId);
	const { data } = useGetOneTaskNameQuery(lesson);
	const navigate = useNavigate();

	return (
		<div className={scss.list_lessons}>
			<div className={scss.container}>
				<div className={scss.lesson}></div>
				<ScrollArea type="always" scrollbars="xy" offsetScrollbars>
					<Box>
						<div style={{ minHeight: '70vh' }}>
							<div className={scss.card}>
								{data?.taskResponse.map((item) => (
									<div
										className={scss.cards}
										onClick={() => {
											localStorage.setItem('taskName', String(item.title));
											setTimeout(() => {
												navigate(
													`/courses/${coursesId}/materials/${lessonId}/lesson/${item.id}`
												);
											}, 1000);
										}}
										key={item.id}
									>
										<Tooltip title={item.title}>
											<p
												style={{
													width: '100%',
													maxWidth: '150px',
													textOverflow: 'ellipsis',
													overflow: 'hidden'
												}}
											>
												<a href="#" className={scss.link}>
													№ {item.title}
												</a>
											</p>
										</Tooltip>
									</div>
								))}
							</div>
						</div>
					</Box>
				</ScrollArea>
			</div>
		</div>
	);
};

export default Lesson;
