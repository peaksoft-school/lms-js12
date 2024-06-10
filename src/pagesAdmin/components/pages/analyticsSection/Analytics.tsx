import { useEffect, useState } from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import scss from './Analytics.module.scss';
// import { useGetAnalyticsQuery } from '@/src/redux/api/analytics';
// import { Preloader } from '@/src/utils/routes/preloader/Preloader';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

interface ChartData {
	labels: string[];
	datasets: {
		label: string;
		data: number[];
		backgroundColor: string[];
		borderColor: string;
		borderWidth: number;
	}[];
}

export const UserData = [
	{
		id: 1,
		year: 2018,
		groups: 488,
		students: 1055,
		instructors: 103,
		courses: 30,
		graduated: 500
	},
	{
		id: 2,
		year: 2019,
		groups: 388,
		students: 955,
		instructors: 120,
		courses: 90,
		graduated: 400
	},
	{
		id: 3,
		year: 2020,
		groups: 288,
		students: 855,
		instructors: 50,
		courses: 40,
		graduated: 300
	},
	{
		id: 4,
		year: 2021,
		groups: 188,
		students: 755,
		instructors: 30,
		courses: 60,
		graduated: 200
	},
	{
		id: 5,
		year: 2022,
		groups: 488,
		students: 655,
		instructors: 10,
		courses: 20,
		graduated: 100
	}
];

function Analytics() {
	const [chartData, setChartData] = useState<ChartData>({
		labels: [],
		datasets: [
			{
				label: 'Users Gained',
				data: [],
				backgroundColor: [
					'rgba(75,192,192,1)',
					'#ecf0f1',
					'#50AF95',
					'#f3ba2f',
					'#2a71d0'
				],
				borderColor: 'black',
				borderWidth: 2
			}
		]
	});

	// const { data, isLoading } = useGetAnalyticsQuery();

	useEffect(() => {
		if (UserData && UserData.length) {
			const labels = UserData.map((item) => item.year.toString());
			const userStudents = UserData.map((item) => item.students);
			const userGraduated = UserData.map((item) => item.graduated);
			const userGroup = UserData.map((item) => item.groups);
			const userCourse = UserData.map((item) => item.courses);
			const userInstructors = UserData.map((item) => item.instructors);

			setChartData({
				labels: labels,
				datasets: [
					{
						label: 'Groups',
						data: userGroup,
						backgroundColor: [
							'#2a71d0',
							'#ecf0f1',
							'#50AF95',
							'#f3ba2f',
							'#2a71d0'
						],
						borderColor: 'black',
						borderWidth: 2
					},
					{
						label: 'Course',
						data: userCourse,
						backgroundColor: [
							'#2a71d0',
							'#ecf0f1',
							'#50AF95',
							'#f3ba2f',
							'#2a71d0'
						],
						borderColor: 'black',
						borderWidth: 2
					},
					{
						label: 'Instructor',
						data: userInstructors,
						backgroundColor: [
							'#2a71d0',
							'#ecf0f1',
							'#50AF95',
							'#f3ba2f',
							'#2a71d0'
						],
						borderColor: 'black',
						borderWidth: 2
					},
					{
						label: ' Students',
						data: userStudents,
						backgroundColor: [
							'#2a71d0',
							'#ecf0f1',
							'#50AF95',
							'#f3ba2f',
							'#2a71d0'
						],
						borderColor: 'black',
						borderWidth: 2
					},
					{
						label: 'Graduated',
						data: userGraduated,
						backgroundColor: [
							'rgba(255,99,132,1)',
							'#ecf0f1',
							'#50AF95',
							'#f3ba2f',
							'#2a71d0'
						],
						borderColor: 'black',
						borderWidth: 2
					}
				]
			});
		}
	}, [UserData]);

	// if (isLoading)
	// 	return (
	// 		<div>
	// 			<Preloader />
	// 		</div>
	// 	);

	return (
		<div className={scss.chart}>
			{chartData && chartData.datasets.length > 0 && (
				<Bar
					options={{
						responsive: true,
						plugins: {
							legend: {
								position: 'top'
							},
							title: {
								display: true,
								text: 'User Statistics'
							}
						}
					}}
					data={chartData}
				/>
			)}
		</div>
	);
}

export default Analytics;
