import scss from './DeletePresentation.module.scss';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import ButtonCancel from '../../customButton/ButtonCancel';
import { useDeletePresentationMutation } from '@/src/redux/api/instructor/presentation';
import ButtonDelete from '../../customButton/ButtonDelete';

interface DeleteProps {
	openModalDelete: boolean;
	closeModalDelete: (openModalDelete: boolean) => void;
	saveIdElement: number | null;
}

const DeletePresentation: React.FC<DeleteProps> = ({
	openModalDelete,
	closeModalDelete,
	saveIdElement
}) => {
	const [deletePresentation] = useDeletePresentationMutation();
	const handleDelete = async () => {
		await deletePresentation(saveIdElement!);
		closeModalDelete(false);
	};

	return (
		<div>
			<React.Fragment>
				<div className={scss.Delete}>
					<Dialog
						open={openModalDelete}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
						PaperProps={{
							className: scss.dialogPaper
						}}
					>
						<DialogContent style={{ height: 'auto' }}>
							<DialogContentText id="alert-dialog-description">
								<h3>Вы уверены, что хотите удалить презентацию?</h3>
							</DialogContentText>
						</DialogContent>
						<DialogActions className={scss.Buttons}>
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
								type="button"
								disabled={false}
								onClick={handleDelete}
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

export default DeletePresentation;
