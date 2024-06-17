import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import scss from './TestModal.module.scss';
import { FormControlLabel, Radio } from '@mui/material';
import { green } from '@mui/material/colors';
import { useGetResultTestOfStudentQuery } from '@/src/redux/api/instructor/resultTest';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 951,
	height: 650,
	backgroundColor: '#ffffff',
	bgColor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '12px'
};
interface modalProps {
	openModal: boolean;
	handleClose: (openModalEdit: boolean) => void;
	saveId: number | boolean;
}
const TestModal: React.FC<modalProps> = ({
	openModal,
	handleClose,
	saveId
}) => {
	const { data } = useGetResultTestOfStudentQuery(saveId);

	return (
		<form onSubmit={close} className={scss.form}>
			<Modal
				open={openModal}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style} className={scss.main_modal}>
					<Typography
						className={scss.text}
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						<div className={scss.comText} onClick={handleClose}>
							Резултаты тестирования Назира Рахматова
						</div>
					</Typography>

					<Box className={scss.input_button_card}>
						<div className={scss.Main_div}>
							<div className={scss.testing_container}>
								{data?.questionResponseList?.map((question) => (
									<div key={question.questionId} className={scss.question}>
										<div className={scss.get_test_testing_second_container}>
											<h4>{question.title}</h4>
										</div>
										{question.optionResponses.map((option) => (
											<div key={option.optionId} className={scss.option}>
												{question.optionResponses.filter((opt) => opt.isTrue)
													.length === 1 ? (
													<>
														<FormControlLabel
															value={option.option}
															control={
																<Radio
																	checked={option.isTrue}
																	className={
																		option.isTrue ? scss.correct_checkbox : ''
																	}
																	sx={{
																		color: green[800],
																		'&.Mui-checked': {
																			color: green[600]
																		}
																	}}
																/>
															}
															label={option.option}
														/>
													</>
												) : (
													<>
														<input
															type="checkbox"
															checked={option.isTrue == true}
															className={scss.correct_checkbox}
														/>
														a<label>{option.option}</label>
													</>
												)}
											</div>
										))}
										<hr className={scss.getTest_hr} />
									</div>
								))}
							</div>
						</div>
					</Box>
				</Box>
			</Modal>
		</form>
	);
};

export default TestModal;
