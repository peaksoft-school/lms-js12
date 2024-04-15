import scss from './HeaderMobile.module.scss';
import { useLocation } from 'react-router-dom';
import { links } from '@/src/utils/routes';
import { useKeenSlider } from 'keen-slider/react';

const HeaderMobile = () => {
	const { pathname } = useLocation();
	const [sliderRef] = useKeenSlider({
		mode: 'free-snap',
		slides: {
			origin: 'center',
			perView: 4,
			spacing: 5
		}
	});
	return (
		<>
			<header className={scss.HeaderMobile}>
				<ul ref={sliderRef} className="keen-slider">
					{pathname.startsWith('/admin') && (
						<>
							{links.admin.map((item, index) => (
								<li className="keen-slider__slide number-slide1" key={index}>
									<a href="#">
										<span className={scss.icon}>{item.icon}</span>
										<span>{item.name}</span>
									</a>
								</li>
							))}
						</>
					)}
					{pathname === '/' && (
						<>
							{links.student.map((item, index) => (
								<li key={index}>
									<a href="#">
										<span className={scss.icon}>{item.icon}</span>
										<span>{item.name}</span>
									</a>
								</li>
							))}
						</>
					)}
					{pathname.startsWith('/instructor') && (
						<>
							{links.instructor.map((item, index) => (
								<li className="keen-slider__slide number-slide1" key={index}>
									<a href="#">
										<span className={scss.icon}>{item.icon}</span>
										<span>{item.name}</span>
									</a>
								</li>
							))}
						</>
					)}
				</ul>
			</header>
		</>
	);
};

export default HeaderMobile;
