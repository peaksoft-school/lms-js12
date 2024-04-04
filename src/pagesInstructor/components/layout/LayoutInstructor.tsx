import { Route, Routes } from 'react-router-dom';
import Header from './header/Header';
import scss from './LayoutInstructor.module.scss';
import HomePage from '../pages/HomePage';
const LayoutInstructor = () => {
	return (
		<>
			<div className={scss.Layout}>
				<Header />
				<main>
					<Routes>
						<Route path="/" element={<HomePage />} />
					</Routes>
				</main>
			</div>
		</>
	);
};

export default LayoutInstructor;
