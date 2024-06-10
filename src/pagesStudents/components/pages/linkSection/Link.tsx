import { useParams } from 'react-router-dom';
import scss from './Link.module.scss';
import { useGetLinkStudentsQuery } from '@/src/redux/api/students/materials';

const Link = () => {
	const { lessonId } = useParams();
	const lesson = Number(lessonId);
	const { data, isLoading } = useGetLinkStudentsQuery(lesson);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className={scss.card}>
			{data?.linkResponses.map((link) => (
				<div className={scss.cards}>
					<div className={scss.title}>
						<div className={scss.text}>
							<a href={link.url} target="_blank" rel="noopener noreferrer">
								{link.title}
							</a>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Link;
