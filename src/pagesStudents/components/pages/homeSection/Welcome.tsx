import Cards from '@/src/ui/CustomCards/Cards';
import scss from './Welcome.module.scss';
const Welcome = () => {
	return (
		<section className={scss.Welcome}>
			<div className="container">
				<div className={scss.content}>
					<Cards />
				</div>
			</div>
		</section>
	);
};

export default Welcome;
