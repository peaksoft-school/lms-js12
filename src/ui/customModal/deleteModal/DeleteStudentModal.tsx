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
		<>
			<Dialog
				open={open}
				onClose={handleCloseModal}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				PaperProps={{
					className: scss.dialogPaper
				}}
			>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						<h3>Вы уверены, что хотите удалить этого студента?</h3>
					</DialogContentText>
				</DialogContent>
				<DialogActions className={scss.Buttons}>
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
		</>
	);
};

export default DeleteStudentModal;
