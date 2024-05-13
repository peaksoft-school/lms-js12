import scss from './DeleteTeacher.module.scss';
import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import ButtonCancel from '../../customButton/ButtonCancel';
import { useDeleteTaskInstructorMutation } from '@/src/redux/api/instructor/addTask';

interface DeleteProps {
	openModalDelete: boolean;
	closeModalDelete: (openModalDelete: boolean) => void;
	deleteById: number | null;
}

const DeleteTask: React.FC<DeleteProps> = ({
	openModalDelete,
	closeModalDelete,
	deleteById
}) => {
	const [deleteTaskInstructor] = useDeleteTaskInstructorMutation();

	const handleDelete = async () => {
		await deleteTaskInstructor(deleteById!);
		closeModalDelete(false);
	};
  console.log(deleteById);
  

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
								<h3>Вы уверены, что хотите удалить этого студента?</h3>
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

export default DeleteTask;
