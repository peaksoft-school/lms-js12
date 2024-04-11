import { links } from '@/src/utils/routes';
import scss from './Header.module.scss';
import { FC } from 'react';

import { useLocation } from 'react-router-dom';
import peaksoft from '@/src/assets/png/Header.png';
import peaksoft2 from '@/src/assets/png/pealsoft.jpg';

interface LayoutProps {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
}

const Header: FC<LayoutProps> = ({ isOpen, setIsOpen }) => {
	const { pathname } = useLocation();

	return (
		<header
			className={isOpen ? `${scss.SaidBar} ${scss.active}` : `${scss.SaidBar}`}
		>
			<div className={scss.top}>
				<div className={scss.logo}>
					<i className="bx bxl-codepen"></i>
					<span>CodeCommerse</span>
				</div>
				<button
					onClick={() => {
						localStorage.setItem('isOpenNavBar', String(!isOpen));
						setIsOpen(!isOpen);
					}}
				>
					<i className="bx bx-menu" id="btn"></i>
				</button>
				<ul>
				<div className={scss.peaksoft_img}>
					<img
						className={
							isOpen
								? `${scss.peaksoft1_url} `
								: `${scss.peaksoft1_url} ${scss.active} `
						}
						src={peaksoft}
						alt=""
					/>
					<img
						className={
							!isOpen
								? `${scss.peaksoft2_url} `
								: `${scss.peaksoft2_url} ${scss.active} `
						}
						src={peaksoft2}
						alt=""
					/>
				</div>
					{pathname === '/admin' && (
						<>
							{links.admin.map((item, index) => (
								<li key={index + 1}>
									<a href="#">
										<span className={scss.icon}>{item.icon}</span>
										<span
											className={
												isOpen
													? `${scss.nav_item} ${scss.active}`
													: `${scss.nav_item}`
											}
										>
											{item.name}
										</span>
									</a>
									{!isOpen && <span className={scss.tooltip}>{item.name}</span>}
								</li>
							))}
						</>
					)}

					{pathname === '/' && (
						<>
							{links.student.map((item, index) => (
								<li key={index + 1}>
									<a href="#">
										<span className={scss.icon}>{item.icon}</span>
										<span
											className={
												isOpen
													? `${scss.nav_item} ${scss.active}`
													: `${scss.nav_item}`
											}
										>
											{item.name}
										</span>
									</a>
									{!isOpen && <span className={scss.tooltip}>{item.name}</span>}
								</li>
							))}
						</>
					)}

					{pathname === '/instructor' && (
						<>
							{links.instructor.map((item, index) => (
								<li key={index + 1}>
									<a href="#">
										<span className={scss.icon}>{item.icon}</span>
										<span
											className={
												isOpen
													? `${scss.nav_item} ${scss.active}`
													: `${scss.nav_item}`
											}
										>
											{item.name}
										</span>
									</a>
									{!isOpen && <span className={scss.tooltip}>{item.name}</span>}
								</li>
							))}
						</>
					)}
				</ul>
			</div>
		</header>
	);
};

export default Header;
