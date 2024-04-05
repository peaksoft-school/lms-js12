import { Route, Routes } from 'react-router-dom';
import scss from './LayoutAuth.module.scss';
import LoginPage from './login/Login';
const LayoutAuth = () => {
	return (
		<>
			<div className={scss.Layout}>
				<main>
					<Routes>
						<Route path="/login" element={<LoginPage />} />
					</Routes>
				</main>
			</div>
		</>
	);
};

export default LayoutAuth;
