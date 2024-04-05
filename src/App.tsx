import { Route, Routes } from 'react-router-dom';
import LayoutAdmin from './pagesAdmin/components/layout/LayoutAdmin';
import LayoutStudents from './pagesStudents/components/layout/LayoutStudents';
import LayoutInstructor from './pagesInstructor/components/layout/LayoutInstructor';
import LayoutAuth from './pagesAuth/components/layout/LayoutAuth';

function App() {
	return (
		<>
			<Routes>
				<Route path="/*" element={<LayoutStudents />} />
				<Route path="/admin/*" element={<LayoutAdmin />} />
				<Route path="/instructor/*" element={<LayoutInstructor />} />
				<Route path="/auth/*" element={<LayoutAuth />} />
			</Routes>
		</>
	);
}

export default App;
