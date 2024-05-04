import { useState, ChangeEvent, FC } from 'react';
import {
	Button,
	Modal,
	Box,
	Typography,
	MenuItem,
	Checkbox,
	ListItemText,
	FormControl,
	InputLabel,
	Select,
	OutlinedInput
} from '@mui/material';

import scss from './Appoint.module.scss';

const style = {
	position: 'absolute',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	top: '50%',
	left: '50%',
	gap: '10px',
	transform: 'translate(-50%, -50%)',
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	borderRadius: '12px'
};

const names = [
	'Оливер Хансен',
	'Ван Хенри',
	'Апрель Такер',
	'Ральф Хаббард',
	'Омар Александер',
	'Карлос Абботт',
	'Мириам Вагнер',
	'Брэдли Уилкерсон',
	'Вирджиния Эндрюс',
	'Келли Снайдер'
];

interface AppointProps {
	open: boolean;
	handleClose: () => void;
}

const AppointTeacher: FC<AppointProps> = ({ open, handleClose }) => {
	const [personName, setPersonName] = useState<string[]>([]);

	const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
		const {
			target: { value }
		} = event;
		setPersonName(
			// При автозаполнении мы получаем строковое значение.
			typeof value === 'string' ? value.split(',') : (value as string[])
		);
	};

	const handleRemove = (index: number) => {
		const newPersonName = [...personName];
		newPersonName.splice(index, 1);
		setPersonName(newPersonName);
	};

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style} className={scss.MainModal}>
					<div>
						<Typography
							className={scss.text}
							id="modal-modal-title"
							variant="h6"
							component="h2"
						>
							<p className={scss.comText}>Назначить учителя/лей</p>
						</Typography>

						<FormControl
							sx={{
								m: 1,
								width: '100%',
								maxWidth: '560px',
								marginLeft: '20px'
							}}
						>
							<InputLabel id="demo-multiple-checkbox-label">
								Назначить учителя
							</InputLabel>
							<Select
								className={scss.select}
								labelId="demo-multiple-checkbox-label"
								id="demo-multiple-checkbox"
								multiple
								value={personName}
								onChange={handleChange}
								input={<OutlinedInput label="Tag" />}
								renderValue={(selected) => (selected as string[]).join(', ')}
							>
								{names.map((name) => (
									<MenuItem key={name} value={name}>
										<Checkbox checked={personName.indexOf(name) > -1} />
										<ListItemText primary={name} />
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<Box mt={2}>
							<div className={scss.teachers}>
								{personName.map((value, index) => (
									<div className={scss.teacher}>
										<h4 className={scss.selected}>{value}</h4>
										<button onClick={() => handleRemove(index)}>X</button>
									</div>
								))}
							</div>
						</Box>
					</div>
					<div className={scss.buttons}>
						<Button variant="outlined" onClick={handleClose}>
							отменить
						</Button>
						<Button variant="contained">сохранить</Button>
					</div>
				</Box>
			</Modal>
		</div>
	);
};

export default AppointTeacher;
