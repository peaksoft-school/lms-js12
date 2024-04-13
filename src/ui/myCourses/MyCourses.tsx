import { useGetCardQuery } from '@/src/redux/api/lesson';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface LessonType {
	id: number;
	title: string;
	date: string;
	text: string;
	img: string;
}

const MyCourses = () => {
	const { coursesId } = useParams();
	const { data } = useGetCardQuery(coursesId!);
	const [course, setCourse] = useState<LessonType>()
	
	useEffect(()=> {
		const filtedData = data?.find((item)=> item.id === +coursesId!)
		setCourse(filtedData!)
	},[data])

	return (
		<div>
			<h1>{course?.title}</h1>
		</div>
	);
};

export default MyCourses;
