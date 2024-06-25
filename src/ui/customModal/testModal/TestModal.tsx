import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import scss from './TestModal.module.scss';
import { FormControlLabel, Radio } from '@mui/material';
import { blue, green, red, white } from '@mui/material/colors';
import { useGetResultTestOfStudentQuery } from '@/src/redux/api/instructor/resultTest';
import Checkbox from '@mui/material/Checkbox';

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
	console.log(saveId);

	const { data } = useGetResultTestOfStudentQuery(saveId);

	return (
		<form onSubmit={close} className={scss.form}>
			<Modal
				open={openModal}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				onClose={handleClose}
			>
				<Box sx={style} className={scss.main_modal}>
					<Typography
						className={scss.text}
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						<div className={scss.comText}>
							Резултаты тестирования Назира Рахматова
						</div>
					</Typography>

					<Box className={scss.input_button_card}>
						<div className={scss.Main_div}>
							<div className={scss.testing_container}>
								{data?.answerQuestionResponses.map((question) => (
									<div key={question.questionId} className={scss.question}>
										<div className={scss.get_test_testing_second_container}>
											<h4>{question.questionTitle}</h4>
										</div>
										{question.answerOptionResponses.map((option) => (
											<div key={option.optionId} className={scss.option}>
												{question.answerOptionResponses.filter(
													(opt) => opt.true
												).length == 1 ? (
													<>
														<FormControlLabel
															value={option.option}
															control={
																<Radio
																	checked={
																		option.true || option.yourChoice !== 3
																	}
																	className={
																		option.true ? scss.correct_checkbox : ''
																	}
																	style={{
																		color:
																			option.yourChoice === 1 &&
																			option.true === true
																				? blue[500]
																				: option.yourChoice === 3 &&
																					  option.true === true
																					? green[500]
																					: option.yourChoice === 2 &&
																						  !option.true
																						? red[500]
																						: ''
																	}}
																/>
															}
															label={option.option}
														/>
													</>
												) : (
													<div className={scss.div_checkbox}>
														<Checkbox
															checked={option.true || option.yourChoice !== 3}
															className={
																option.true ? scss.correct_checkbox : ''
															}
															style={{
																color:
																	option.yourChoice === 1 &&
																	option.true === true
																		? blue[500]
																		: option.yourChoice === 3 &&
																			  option.true === true
																			? green[500]
																			: option.yourChoice === 2 && !option.true
																				? red[500]
																				: ''
															}}
														/>
														a<label>{option.option}</label>
													</div>
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
