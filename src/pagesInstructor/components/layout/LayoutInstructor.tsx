import { Route, Routes } from 'react-router-dom';
import scss from './LayoutInstructor.module.scss';
import Header from '@/src/ui/header/Header';
// import NavBar from '@/src/ui/navBar/NavBar';
import HomePage from '../pages/HomePage';
import { useEffect, useState } from 'react';
import HeaderMobail from '@/src/ui/headerMobail/HeaderMobail';
const LayoutInstructor = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(true);
	useEffect(() => {
		const changeIsMobile = () => {
			if (window.innerWidth < 1000) {
				setIsMobile(true);
			} else {
				setIsMobile(false);
			}
		};

		changeIsMobile();
		window.addEventListener('resize', changeIsMobile);

		return () => {
			window.removeEventListener('resize', changeIsMobile);
		};
	}, []);
	useEffect(() => {
		if (localStorage.getItem('isOpenNavBar') === 'false') {
			setIsOpen(false);
		} else {
			setIsOpen(true);
		}
	}, []);

	return (
		<>
			<div className={scss.Layout}>
				{!isMobile && (
					<>
						<Header isOpen={isOpen} setIsOpen={setIsOpen} />
					</>
				)}
				<main>
					<Routes>
						<Route path="/" element={<HomePage />} />
					</Routes>
				</main>
				{isMobile && <HeaderMobail />}
			</div>
		</>
	);
};

export default LayoutInstructor;
