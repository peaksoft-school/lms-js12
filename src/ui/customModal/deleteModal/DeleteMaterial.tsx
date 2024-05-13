import { FC } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import ButtonDelete from '@/src/ui/customButton/ButtonDelete';
import scss from './DeleteMaterial.module.scss';
import { useDeleteMaterialMutation } from '@/src/redux/api/instructor/materials';

type MaterialProps = {
	open: boolean;
	handleCloseModal: () => void;
	deleteById: number | null;
};

const DeleteMaterial: FC<MaterialProps> = ({
	open,
	handleCloseModal,
	deleteById
}) => {
	const [deleteMaterial] = useDeleteMaterialMutation();

	const handleDelete = async () => {
		await deleteMaterial(deleteById);
		handleCloseModal();
	};

	return (
		<div>
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
						<h3>Вы уверены, что хотите удалить урок?</h3>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<ButtonCancel
						width="103px"
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
		</div>
	);
};

export default DeleteMaterial;
