import { useGetCardQuery } from '@/src/redux/api/lesson';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface LessonType {
	_id: number;
	title: string;
	date: string;
	text: string;
	img: string;
}

const MyCourses = () => {
	const { coursesId } = useParams();
	console.log(coursesId!);

	const { data } = useGetCardQuery(coursesId!);
	const [course, setCourse] = useState<LessonType>();

	useEffect(() => {
		const filterData = data?.find((item) => item._id === +coursesId!);
		setCourse(filterData!);
	}, [data]);

	return (
		<div>
			<h1>{course?.title}</h1>
		</div>
	);
};

export default MyCourses;
