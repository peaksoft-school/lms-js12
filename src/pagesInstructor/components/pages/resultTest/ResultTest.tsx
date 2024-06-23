import GreenSwitch from './GreenSwitch';
import scss from './ResultTest.module.scss';
import arrow from '@/src/assets/svgs/arrow-right.svg';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import TestModal from '@/src/ui/customModal/testModal/TestModal';
import { useGetResultTestQuery } from '@/src/redux/api/instructor/resultTest';

const ResultTest = () => {
	const { testId } = useParams();
	const test = Number(testId);
	const { data } = useGetResultTestQuery(test);
	const [isTrue, setIsTrue] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [saveId, setSaveId] = useState<number | boolean>(false);
	const handleClose = () => {
		setOpenModal(false);
	};
	const handleOpen = () => {
		setOpenModal(true);
	};

	return (
		<div className={scss.Result_test}>
			<div className={scss.top_container}>
				<div className={scss.result}>
					<p>
						<a className={scss.title_result_1} href="#">
							Мои курсы
						</a>
					</p>
					<img src={arrow} alt="" />
					<p>
						<a className={scss.title_result_2} href="#">
							Название курса
						</a>
					</p>
				</div>
				<div>
					<h2 className={scss.title_result}>Материалы</h2>
				</div>
			</div>
			<div className={!isTrue ? scss.card_container : scss.card_container2}>
				<div className={scss.item_top}>
					<p className={scss.card_link}>0 ответов</p>
				</div>
				<div className={scss.item_bottom}>
					<GreenSwitch isTrue={isTrue} setIsTrue={setIsTrue} />
				</div>
			</div>
			<div className={scss.result_container}>
				<table className={scss.table}>
					<thead>
						<tr>
							<th style={{ textAlign: 'start' }}>№</th>
							<th>Имя Фамилия</th>
							<th>Дата прохождения</th>
							<th>Статус</th>
							<th>Баллы</th>
						</tr>
					</thead>
					<tbody>
						<tr
							className={scss.table_gray}
							onClick={() => {
								handleOpen();
							}}
						>
							{data?.studentTestResponses.map((item, index) => (
								<>
									<td onClick={() => setSaveId(item.resultTestId)}>
										{index + 1}
									</td>
									<button style={{ background: 'none ', border: 'none ' }}>
										<td
											onClick={() => setSaveId(item.resultTestId)}
											onClick={handleOpen}
										>
											{item.fullName}
										</td>
									</button>
									<td onClick={() => setSaveId(item.resultTestId)}>
										{item.resultTestId}
									</td>
									<td onClick={() => setSaveId(item.resultTestId)}>
										{item.isPassed}
									</td>
									<td onClick={() => setSaveId(item.resultTestId)}>
										{item.point}
									</td>
								</>
							))}
						</tr>
					</tbody>
				</table>
			</div>
			<TestModal
				openModal={openModal}
				handleClose={handleClose}
				saveId={saveId}
			/>
		</div>
	);
};

export default ResultTest;
