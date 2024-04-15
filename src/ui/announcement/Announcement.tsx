import scss from './Announcement.module.scss';

const Announcement = () => {
	return (
		<div className={scss.Announcement}>
			<div className={scss.announce_content}>
				<div className={scss.top_content}>
					<h1 className={scss.announce_title}>Объявления</h1>
					<div className={scss.add_link}>
						<a className={scss.announce_link} href="#">
							+Добавить объявление
						</a>
					</div>
				</div>
				<div className={scss.center_content}>
					<img
						className={scss.announce_img}
						src="src/assets/announce.svg"
						alt=""
					/>
				</div>
				<div className={scss.bottom_content}>
					<p className={scss.text}>Вы пока не добавили объявления!</p>
					<div className={scss.bottom_item}>
						<a className={scss.bottom_link} href="#">
							+Добавить объявление
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Announcement;
