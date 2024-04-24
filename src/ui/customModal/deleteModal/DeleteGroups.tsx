import scss from './DeleteGroupsModal.module.scss';
import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import ButtonCancel from '../../customButton/ButtonCancel';
import { useDeleteGroupMutation } from '@/src/redux/api/admin/groups';

interface DeleteProps {
	openModalDelete: boolean;
	closeModalDelete: (openModalDelete: boolean) => void;
	deleteById: number | null;
}
const DeleteGroupModal: React.FC<DeleteProps> = ({
	openModalDelete,
	closeModalDelete,
	deleteById
}) => {
	const [deleteGroup] = useDeleteGroupMutation();
	const handleDelete = async () => {
		await deleteGroup(deleteById!);
		closeModalDelete(false);
	};

	return (
		<div>
			<React.Fragment>
				<div>
					<Dialog
						open={openModalDelete}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
						PaperProps={{
							className: scss.dialog_paper
						}}
					>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">
								<p style={{ padding: '18px 63px' }}>
									Вы уверены, что хотите удалить этого учителя?
								</p>
							</DialogContentText>
						</DialogContent>
						<DialogActions className={scss.buttons}>
							<ButtonCancel
								width="103px"
								type="button"
								disabled={false}
								onClick={() => {
									closeModalDelete(false);
								}}
							>
								отмена
							</ButtonCancel>
							<Button
								onClick={handleDelete}
								autoFocus
								style={{
									backgroundColor: '#F70D1A',
									color: '#fff',
									width: '108px',
									height: '40px'
								}}
							>
								Удалить
							</Button>
						</DialogActions>
					</Dialog>
				</div>
			</React.Fragment>
		</div>
	);
};
export default DeleteGroupModal;
