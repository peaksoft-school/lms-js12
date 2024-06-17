import { FC, ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface ChildrenProps {
	children: ReactNode;
}
const ProtectRoute: FC<ChildrenProps> = ({ children }) => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const ADMIN = localStorage.getItem('isAdmin');
	const INSTRUCTOR = localStorage.getItem('isInstructor');
	const STUDENT = localStorage.getItem('isAuth');

	useEffect(() => {
		if (ADMIN && pathname === '/auth/login') {
			navigate('/admin/analytics');
		} else if (INSTRUCTOR && pathname === '/auth/login') {
			navigate('/instructor/course');
		} else if (STUDENT && pathname === '/auth/login') {
			navigate('/courses');
		} else if (ADMIN && pathname === '/courses') {
			navigate('/admin/analytics');
		} else if (INSTRUCTOR && pathname === '/courses') {
			navigate('/instructor/course');
		} else if (STUDENT && pathname === '/admin/analytics') {
			navigate('/courses');
		} else if (ADMIN && pathname === '/instructor/course') {
			navigate('/admin/analytics');
		}
	});

	return children;
};

export default ProtectRoute;
