import { Route, Routes } from 'react-router-dom';
import scss from './LayoutStudents.module.scss';
import Header from './header/Header';
import HomePage from '../pages/HomePage';

const LayoutStudents = () => {
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

export default LayoutStudents;
