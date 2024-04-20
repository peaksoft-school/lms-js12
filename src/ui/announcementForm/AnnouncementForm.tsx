import React, { useState } from 'react';
import scss from './AnnouncementForm.module.scss';

interface Announcement {
	id: number;
	announcement: string;
	isOpen: string;
}

const AnnouncementForm: React.FC = () => {
	const [announcement, setAnnouncement] = useState<string>('');
	const [isOpen, setIsOpen] = useState<string>('');
	const [addAnnouncement, setAddAnnouncement] = useState<Announcement[]>([]);
	const [statusCancel, setStatusCancel] = useState<boolean>(false);

	const handleAddAnnoucement = () => {
		const newAnnouncement: Announcement = {
			id: Math.random(),
			announcement: announcement,
			isOpen: isOpen
		};
		setAddAnnouncement([...addAnnouncement, newAnnouncement]);
	};

	const handleCancel = () => {
		setStatusCancel(!statusCancel);
	};

	const selectData = [
		{ name: 'Группы' },
		{ name: 'JS-10' },
		{ name: 'JS-11' },
		{ name: 'JS-12' },
		{ name: 'JS-13' }
	];

	return (
		<div className={scss.AnnouncementForm}>
			<div className={scss.container}>
				<h1 className={scss.title}>Добавить объявление</h1>
				<div className={scss.announce_form}>
					<input
						className={scss.input}
						type="text"
						placeholder="Введите текст объявления"
						value={announcement}
						onChange={(el) => {
							setAnnouncement(el.target.value);
						}}
					/>
					<select
						className={scss.input}
						value={isOpen}
						onChange={(event) => {
							setIsOpen(event.target.value);
						}}
					>
						{selectData.map((el, index) => (
							<option key={index}>{el.name}</option>
						))}
					</select>

					<div className={scss.btn_announce}>
						<button className={scss.btn_link} onClick={handleCancel}>
							Отменить
						</button>
						<button className={scss.btn_link} onClick={handleAddAnnoucement}>
							Добавить
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AnnouncementForm;
