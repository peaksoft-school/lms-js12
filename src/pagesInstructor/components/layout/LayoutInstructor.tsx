import { Route, Routes } from 'react-router-dom';
import scss from './LayoutInstructor.module.scss';
import HomePage from '../pages/HomePage';
import Header from '@/src/ui/header/Header';
import NavBar from '@/src/ui/navBar/NavBar';
const LayoutInstructor = () => {
	return (
		<>
			<div className={scss.Layout}>
				<div className={scss.container}>
					<NavBar />
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

export default LayoutInstructor;
