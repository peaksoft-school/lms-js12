import { useGetStudentTableQuery } from '@/src/redux/api/admin/student';
import scss from './NotSubmitted.module.scss';
const NotSubmitted = () => {
	const { data } = useGetStudentTableQuery();
	return (
		<div className={scss.main_part}>
			<div className={scss.not_submited}>
				{data?.map((item) => (
					<div className={scss.card_container}>
						<p className={scss.card_link}>
							{item.firstName}
							{item.lastName}
						</p>
						<div
							onClick={() => {
								localStorage.setItem('task', String(item._id));
							}}
							className={scss.button}
						></div>
					</div>
				))}
			</div>
		</div>
	);
};

export default NotSubmitted;
