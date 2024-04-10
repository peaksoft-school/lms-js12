import { Route, Routes } from 'react-router-dom';
import scss from './LayoutStudents.module.scss';
import Header from '@/src/ui/header/Header';
import NavBar from '@/src/ui/navBar/NavBar';
import HomePage from '../pages/HomePage';
import ModalParol from '@/src/modal/ModalParol';
import ModalAddLesson from '@/src/modal/InstructorModal/ModalAddLesson';
import ModalAddLink from '@/src/modal/InstructorModal/ModalAddLink';
import ModalAddVideoLesson from '@/src/modal/InstructorModal/ModalAddVideoLesson';
import ModalAddPresentation from '@/src/modal/InstructorModal/ModalAddPresentation';
import ModalStudentMessages from '@/src/modal/InstructorModal/ModalStudentMessages';
import ModalGroupSelect from '@/src/modal/InstructorModal/ModalGroupSelect';
import ModalAddTeacher from '@/src/modal/AdminModal/ModalAddTeacher';
import ModalImport from '@/src/modal/AdminModal/ModalImport.1';
// import Input from '@/src/ui/CustomInput/Input';
import ModalAddStudent from '@/src/modal/AdminModal/ModalAddStudent';

const LayoutStudents = () => {
	return (
		<>
			<div className={scss.Layout}>
<<<<<<< HEAD
				<Header />
				<main>
					<Routes>
						<Route path="/" element={<HomePage />} />
					</Routes>
				</main>
				<ModalParol />
				<ModalAddLesson />
				<ModalAddLink />
				<ModalAddVideoLesson />
				<ModalAddPresentation />
				<ModalStudentMessages />
				<ModalGroupSelect />
				<ModalAddTeacher />
				<ModalImport />
				<ModalAddStudent />
=======
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
>>>>>>> e1ce7680b2f76076c1e4f593f811f04e4ea9a0ef
			</div>
		</>
	);
};

export default LayoutStudents;
