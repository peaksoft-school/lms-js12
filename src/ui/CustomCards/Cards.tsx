import { FC } from 'react';
import scss from './Cards.module.scss';

import { Link } from 'react-router-dom';
import { useGetCardQuery } from '@/src/redux/api/lesson';

const Cards: FC = () => {
	const { data, isLoading } = useGetCardQuery();
	return (
		<div className={scss.Cards}>
			{!isLoading ? (
				<>
					{data!.map((card, index) => (
						<Link key={index} to={`/admin/courses/${card._id}`}>
							<div className={scss.firstBlockContainer}>
								<div>
									<img
										className={scss.BlockImage}
										src={card.img}
										alt={card.title}
									/>
								</div>
								<div className={scss.zeroBlockContainer}>
									<div className={scss.secondBlockContainer}>
										<p className={scss.BlockTitle}>{card.title}</p>
										<p className={scss.BlockDate}>{card.date}</p>
									</div>
									<div className={scss.text_card}>
										<span className={scss.BlockText}>
											{card.text.length > 60
												? `${card.text.substring(0, 60)}...`
												: card.text}
										</span>
									</div>
								</div>
								<div className={scss.BlockButtonDiv}>
									<button className={scss.BlockButton}>
										<img src="src/assets/dots.svg" alt="Dots" />
									</button>
								</div>
							</div>
						</Link>
					))}
				</>
			) : (
				<div className={scss.skeleton}>{/* Skeleton loading UI */}</div>
			)}
		</div>
	);
};

export default Cards;
