import { FC } from 'react';
import scss from './Cards.module.scss';
import { useGetCardQuery } from '@/src/redux/api/lesson/cards';

const Cards: FC = () => {
	const { data, isLoading } = useGetCardQuery();

	if (isLoading) {
		return <div>...Loading</div>;
	}
	return (
		<div className={scss.Card}>
			{data &&
				data.map((card) => (
					<div key={card.id} className={scss.firstBlockContainer}>
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
				))}
		</div>
	);
};

export default Cards;
