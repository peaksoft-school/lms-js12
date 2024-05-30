import { FC } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useDeleteStudentTableMutation } from '@/src/redux/api/admin/student';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import ButtonDelete from '@/src/ui/customButton/ButtonDelete';
import scss from './DeleteStudentModal.module.scss';

type StudentModalProps = {
	open: boolean;
	handleCloseModal: () => void;
	saveIdElement: number | null;
};

const DeleteStudentModal: FC<StudentModalProps> = ({
	open,
	handleCloseModal,
	saveIdElement
}) => {
	const [deleteStudentTable] = useDeleteStudentTableMutation();

	const handleDelete = async () => {
		await deleteStudentTable(saveIdElement);
		handleCloseModal();
	};

	return (
		<Dialog
			open={open}
			onClose={handleCloseModal}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			PaperProps={{
				className: scss.dialog_paper
			}}
		>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					<p
						style={{ fontSize: '21px', fontWeight: '600', fontFamily: 'Inter' }}
					>
						Вы уверены, что хотите удалить этого студента?
					</p>
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
					width="117px"
					onClick={handleCloseModal}
					disabled={false}
					type="submit"
				>
					Отмена
				</ButtonCancel>
				<ButtonDelete onClick={handleDelete} type="submit" disabled={false}>
					Удалить
				</ButtonDelete>
			</DialogActions>
		</Dialog>
	);
};

export default DeleteStudentModal;
