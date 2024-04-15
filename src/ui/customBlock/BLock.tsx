import scss from './Block.module.scss';

const Block = () => {
	return (
		<div className={scss.BlockContainer}>
			<div className="container">
				<div className={scss.content}>
					<img
						className={scss.BlockImage}
						src="../../assets/svgs/block.svg"
						alt="BlockImage"
					/>

					<h1 className={scss.BlockDostup}>Вам закрыли доступ</h1>
					<p className={scss.BlockZakryliDostup}>
						Вам закрыли доступ к системе,внесите <br />
						<span className={scss.BlockZakryliDostupSpan}>
							оплату для продолжения !
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Block;
