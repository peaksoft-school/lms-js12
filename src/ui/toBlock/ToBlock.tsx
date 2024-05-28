import { FC, useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import editPhoto from '@/src/assets/svgs/edit.svg';
import deletePhoto from '@/src/assets/svgs/delete-red.svg';
import LockOpenStudent from '@/src/assets/svgs/lock-open.svg';
import LockBlockStudent from '@/src/assets/svgs/lock.svg';
import DeleteStudentModal from '@/src/ui/customModal/deleteModal/DeleteStudentModal';
import ModalEditStudent from '../customModal/ModalEditStudent';

interface StudentMenuItem {
	id: number;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	email: string;
	groupName: string[];
	studyFormat: string[];
	isBlock: boolean;
}

interface MenuProps {
	anchorEl: null | HTMLElement;
	open: boolean;
	onClose: () => void;
	setOpenEditModal: (value: boolean) => void;
	setOpenDeleteModal: (value: boolean) => void;
	updateCompletedFunc: () => void;
	item: StudentMenuItem[] | undefined;
	saveIdElement: number | null;
	openDeleteModal: boolean;
}

const StudentMenu: FC<MenuProps> = ({
	anchorEl,
	open,
	onClose,
	setOpenDeleteModal,
	updateCompletedFunc,
	item,
	saveIdElement,
	openDeleteModal
}) => {
	const data = item?.find((el) => el.id === saveIdElement);

	const [openEditModalState, setOpenEditModalState] = useState(false);
	const handleCloseEditModal = () => {
		setOpenEditModalState(false);
	};
	const handleOpenEditModal = () => {
		setOpenEditModalState(true);
	};

	return (
		<div>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={onClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button'
				}}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right'
				}}
				PaperProps={{
					style: { boxShadow: 'none', border: '1px solid gray' }
				}}
			>
				<MenuItem
					key="edit"
					style={{ display: 'flex', gap: '10px' }}
					onClick={() => {
						handleOpenEditModal();
						onClose();
					}}
				>
					<img src={editPhoto} alt="Edit" />
					Редактировать
				</MenuItem>
				<MenuItem
					key="delete"
					style={{ display: 'flex', gap: '10px' }}
					onClick={() => {
						setOpenDeleteModal(true);
						onClose();
					}}
				>
					<img src={deletePhoto} alt="Delete" />
					Удалить
				</MenuItem>
				<MenuItem
					key="block-unblock"
					style={{ display: 'flex', gap: '10px' }}
					onClick={() => {
						updateCompletedFunc();
						onClose();
					}}
				>
					{data?.isBlock ? (
						<>
							<img src={LockOpenStudent} alt="Unlock" /> Разблокировать
						</>
					) : (
						<>
							<img src={LockBlockStudent} alt="Lock" /> Заблокировать
						</>
					)}
				</MenuItem>
			</Menu>
			<ModalEditStudent
				open={openEditModalState}
				handleClose={handleCloseEditModal}
				saveIdElement={saveIdElement}
			/>
			<DeleteStudentModal
				open={openDeleteModal}
				handleCloseModal={() => setOpenDeleteModal(false)}
				saveIdElement={saveIdElement}
			/>
		</div>
	);
};

export default StudentMenu;
