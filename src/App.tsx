import { Route, Routes } from 'react-router-dom';
import LayoutAdmin from './pagesAdmin/components/layout/LayoutAdmin';
import LayoutStudents from './pagesStudents/components/layout/LayoutStudents';
import LayoutInstructor from './pagesInstructor/components/layout/LayoutInstructor';
import LayoutAuth from './pagesAuth/components/layout/LayoutAuth';
import { Preloader } from './ui/preloader/Preloader';
import { useEffect, useState } from 'react';
// import SendOneTask from './pagesStudents/components/pages/sendOneTask/SendOneTask';

const App = () => {
	const [isPreLoaded, setPreLoader] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setPreLoader(false);
		}, 1500);
	}, []);
	return (
		<>
			{isPreLoaded ? (
				<>
					<Preloader />
				</>
			) : (
				<>
					<Routes>
						<Route path="/*" element={<LayoutStudents />} />
						<Route path="/admin/*" element={<LayoutAdmin />} />
						<Route path="/instructor/*" element={<LayoutInstructor />} />
						<Route path="/auth/*" element={<LayoutAuth />} />
					</Routes>
					{/* <SendOneTask /> */}
				</>
			)}
		</>
	);
};

export default App;
