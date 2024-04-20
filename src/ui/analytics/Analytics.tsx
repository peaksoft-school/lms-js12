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
import { useGetAnalyticsQuery } from '../../redux/api/analytics';

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

	const { data, error, isLoading } = useGetAnalyticsQuery();

	useEffect(() => {
		if (data && data.length) {
			const labels = data.map((item) => item.year.toString());
			const userGains = data.map((item) => item.userGain);
			const userLosts = data.map((item) => item.userLost);

			setChartData({
				labels: labels,
				datasets: [
					{
						label: 'Users Gained',
						data: userGains,
						backgroundColor: [
							'rgba(75,192,192,1)',
							'#ecf0f1',
							'#50AF95',
							'#f3ba2f',
							'#2a71d0'
						],
						borderColor: 'black',
						borderWidth: 2
					},
					{
						label: 'Users Lost',
						data: userLosts,
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
	}, [data]);

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error loading the data!</p>;

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
