import { Route, Routes } from 'react-router-dom';
import scss from './LayoutAuth.module.scss';
import RegistrationPage from './registration/Registration';
import LoginPage from './login/Login';
const LayoutAuth = () => {
	return (
		<>
			<div className={scss.Layout}>
				<main>
					<Routes>
						<Route path="/registration" element={<RegistrationPage />} />
						<Route path="/login" element={<LoginPage />} />
					</Routes>
				</main>
			</div>
		</>
	);
};

export default LayoutAuth;
