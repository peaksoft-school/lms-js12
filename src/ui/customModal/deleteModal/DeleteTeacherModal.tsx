import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import ButtonCancel from '../../customButton/ButtonCancel';
import { useDeleteTeacherMutation } from '@/src/redux/api/teacher';

interface DeleteProps {
	openModalDelete: boolean;
	closeModalDelete: (openModalDelete: boolean) => void;
	deleteById: number | null;
}

const DeleteTeacherModal: React.FC<DeleteProps> = ({
	openModalDelete,
	closeModalDelete,
	deleteById
}) => {
	const [deleteTeacher] = useDeleteTeacherMutation();

	const handleDelete = async () => {
		await deleteTeacher(deleteById!);
		closeModalDelete(false);
	};

	return (
		<div>
			<React.Fragment>
				<Dialog
					open={openModalDelete}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							<p style={{ padding: '18px 63px' }}>
								Вы уверены, что хотите удалить ... ?
							</p>
						</DialogContentText>
					</DialogContent>
					<DialogActions
						style={{
							display: 'flex',
							gap: '30px',
							alignItems: 'center',
							justifyContent: 'center'
						}}
					>
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
							Да
						</Button>
					</DialogActions>
				</Dialog>
			</React.Fragment>
		</div>
	);
};

export default DeleteTeacherModal;
