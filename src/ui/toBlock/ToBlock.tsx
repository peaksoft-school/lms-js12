import { FC } from 'react';
import { Menu, MenuItem } from '@mui/material';
import editPhoto from '@/src/assets/svgs/edit.svg';
import deletePhoto from '@/src/assets/svgs/delete-red.svg';
import LockOpenStudent from '@/src/assets/svgs/lock-open.svg';
import LockBlockStudent from '@/src/assets/svgs/lock.svg';
import ModalEditStudent from '../customModal/ModalEditStudent';
import DeleteStudentModal from '@/src/ui/customModal/deleteModal/DeleteStudentModal';

interface MenuItem {
	_id: number;
	isCompleted: boolean;
}

interface MenuProps {
	anchorEl: null | HTMLElement;
	open: boolean;
	onClose: () => void;
	setOpenEditModal: (value: boolean) => void;
	setOpenDeleteModal: (value: boolean) => void;
	updateCompletedFunc: () => void;

	item: MenuItem[] | undefined;
	openEditModal: boolean;
	handleCloseEditModal: () => void;
	saveIdElement: number | null;
	openDeleteModal: boolean;
}

const StudentMenu: FC<MenuProps> = ({
	anchorEl,
	open,
	onClose,
	setOpenEditModal,
	setOpenDeleteModal,
	updateCompletedFunc,
	item,
	openEditModal,
	handleCloseEditModal,
	saveIdElement,
	openDeleteModal
}) => {
	const data = item?.find((el: { _id: number }) => el._id === saveIdElement);

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
					style={{ display: 'flex', gap: '10px' }}
					onClick={() => {
						setOpenEditModal(true);
						onClose();
					}}
				>
					<img src={editPhoto} alt="#" />
					Редактировать
				</MenuItem>
				<MenuItem
					style={{ display: 'flex', gap: '10px' }}
					onClick={() => {
						setOpenDeleteModal(true);
						onClose();
					}}
				>
					<img src={deletePhoto} alt="#" />
					Удалить
				</MenuItem>
				<MenuItem
					style={{ display: 'flex', gap: '10px' }}
					onClick={() => {
						updateCompletedFunc();
						onClose();
					}}
				>
					{data?.isCompleted === true ? (
						<>
							<img src={LockOpenStudent} alt="#" /> Заблокировать
						</>
					) : (
						<>
							<img src={LockBlockStudent} alt="#" />
							Разблокировать
						</>
					)}
				</MenuItem>
			</Menu>
			<ModalEditStudent
				open={openEditModal}
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
