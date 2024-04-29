import React, { useState } from 'react';
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
import {
	DragDropContext,
	Droppable,
	Draggable,
	DroppableProvided,
	DraggableProvided,
	DraggableStateSnapshot,
	DropResult
} from 'react-beautiful-dnd';
import scss from './Appoint.module.scss';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
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

const AppointTeacher = () => {
	const [open, setOpen] = useState(false);
	const [personName, setPersonName] = useState<string[]>([]);

	const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		const {
			target: { value }
		} = event;
		setPersonName(
			// При автозаполнении мы получаем строковое значение.
			typeof value === 'string' ? value.split(',') : (value as string[])
		);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleDragEnd = (result: DropResult) => {
		if (!result.destination) return; // Перетащили за пределы списка
		const items = Array.from(personName);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);
		setPersonName(items);
	};

	const handleRemove = (index: number) => {
		const newPersonName = [...personName];
		newPersonName.splice(index, 1);
		setPersonName(newPersonName);
	};

	return (
		<div>
			<Button onClick={handleOpen}>Назначить учителя/лей</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style} className={scss.MainModal}>
					<Typography
						className={scss.text}
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						<p className={scss.comText}>Назначить учителя/лей</p>
					</Typography>
					<div className={scss.select_div1}>
						<FormControl sx={{ m: 1, width: '100%', maxWidth: '590px' }}>
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
					</div>
					<Box mt={2}>
						<DragDropContext onDragEnd={handleDragEnd}>
							<Droppable droppableId="uniqueId">
								{(provided: DroppableProvided) => (
									<div
										ref={provided.innerRef}
										{...provided.droppableProps}
										style={{
											display: 'flex',
											flexWrap: 'wrap',
											gap: '10px',
											justifyContent: 'start',
											paddingRight: '20px',
											width: '100%',
											paddingBottom: '10px'
										}}
									>
										{personName.map((value, index) => (
											<Draggable key={value} draggableId={index} index={index}>
												{(
													provided: DraggableProvided,
													snapshot: DraggableStateSnapshot
												) => (
													<div
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
														className={scss.select_div}
														style={{
															...provided.draggableProps.style,
															display: 'flex',
															boxShadow: snapshot.isDragging
																? '0 0 20px rgba(0,0,0,0.2)'
																: 'none'
														}}
													>
														<h4 className={scss.selected}>{value}</h4>
														<button onClick={() => handleRemove(index)}>
															X
														</button>
													</div>
												)}
											</Draggable>
										))}
										{provided.placeholder}
										<div className={scss.buttons}>
											<Button variant="outlined">отменить</Button>
											<Button variant="contained">сохранить</Button>
										</div>
									</div>
								)}
							</Droppable>
						</DragDropContext>
					</Box>
				</Box>
			</Modal>
		</div>
	);
};

export default AppointTeacher;
