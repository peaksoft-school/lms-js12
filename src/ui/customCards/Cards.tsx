import { FC } from 'react';
import scss from './Cards.module.scss';
import Skeleton from '@mui/material/Skeleton';
import { Link, useLocation } from 'react-router-dom';
import { useGetCardQuery } from '@/src/redux/api/lesson';
import { IconDots } from '@tabler/icons-react';

const Cards: FC = () => {
	const { pathname } = useLocation();
	const { data, isLoading } = useGetCardQuery();

	return (
		<div className={scss.Cards}>
			{!isLoading ? (
				<>
					{data?.map((card, index) => {
						const linkTo =
							pathname === '/admin'
								? `/admin/courses/${card?._id}`
								: pathname === '/instructor'
									? `/instructor/courses/${card?._id}`
									: `/courses/${card?._id}`;

						return (
							<Link key={index} to={linkTo}>
								<div className={scss.first_block_container}>
									<div className={scss.img}>
										<img
											className={scss.block_image}
											src={card?.img || 'https://via.placeholder.com/270x147'}
											alt={card?.title || 'Card Title'}
										/>
									</div>
									<div className={scss.zero_block_container}>
										<div className={scss.second_block_container}>
											<p className={scss.block_title}>{card?.title}</p>
											<p className={scss.block_date}>{card?.date}</p>
										</div>
										<div className={scss.text_card}>
											<span className={scss.block_text}>
												{card?.text.length > 60
													? `${card?.text.substring(0, 60)}...`
													: card?.text}
											</span>
										</div>
									</div>
									<div className={scss.block_button_div}>
										<button className={scss.block_button}>
											<IconDots stroke={2} />
										</button>
									</div>
								</div>
							</Link>
						);
					})}
				</>
			) : (
				<div className={scss.skeleton}>
					{[...Array(8)].map((_, index) => (
						<div key={index} className={scss.mini_sceleton}>
							<Skeleton variant="rectangular" width={270} height={171} />
							<Skeleton />
							<Skeleton width="60%" />
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Cards;
