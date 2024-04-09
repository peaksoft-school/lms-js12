import { Route, Routes } from 'react-router-dom';
import scss from './LayoutAdmin.module.scss';
import HomePage from '../pages/HomePage';
import Header from '@/src/ui/header/Header';
import NavBar from '@/src/ui/navBar/NavBar';
import { useState } from 'react';

const LayoutAdmin = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
	return (
		<>
			<div className={!isDrawerOpen ? scss.Layout : scss.DrawerOpen}>
				<div className={scss.container}>
					<NavBar toggleDrawer={setIsDrawerOpen} />
					<div className={scss.content}>
						<Header />
						<main>
							<Routes>
								<Route path="/" element={<HomePage />} />
							</Routes>
						</main>
					</div>
				</div>
			</div>
		</>
	);
};

export default LayoutAdmin;
