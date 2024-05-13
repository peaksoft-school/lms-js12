import scss from './DeleteTeacher.module.scss';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import ButtonCancel from '../../customButton/ButtonCancel';
import { useDeleteTeacherMutation } from '@/src/redux/api/admin/teacher';
import ButtonDelete from '../../customButton/ButtonDelete';

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
								<h3>Вы уверены, что хотите удалить этого учителя?</h3>
							</DialogContentText>
						</DialogContent>
						<DialogActions
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'flex-end',
								alignItems: 'center',
								paddingBottom: '10px',
								paddingTop: '13px',
								gap: '10px'
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
							<ButtonDelete
								onClick={handleDelete}
								type="submit"
								disabled={false}
							>
								Удалить
							</ButtonDelete>
						</DialogActions>
					</Dialog>
				</div>
			</React.Fragment>
		</div>
	);
};

export default DeleteTeacherModal;
