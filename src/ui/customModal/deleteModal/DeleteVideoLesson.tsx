import { FC, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import ButtonDelete from '@/src/ui/customButton/ButtonDelete';
import scss from './DeleteVideoLesson.module.scss';
import { useDeleteVideoLessonMutation } from '@/src/redux/api/instructor/video';

type VideoLessonProps = {
	openModalDelete: boolean;
	handleCloseModal: (openModalVideo: boolean) => void;
	saveIdElement: number | null;
};

const DeleteVideoLesson: FC<VideoLessonProps> = ({
	openModalDelete,
	handleCloseModal,
	saveIdElement
}) => {
	const [deleteVideoLesson] = useDeleteVideoLessonMutation();
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDelete = async () => {
		setIsDeleting(true);
		try {
			await deleteVideoLesson(saveIdElement!);
			handleCloseModal(false);
		} finally {
			setIsDeleting(false);
		}
	};

	console.log(saveIdElement, 'id');

	return (
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
					<h3>Вы уверены, что хотите удалить этого видеоурока?</h3>
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
					onClick={() => handleCloseModal(false)}
					disabled={isDeleting}
					type="submit"
				>
					Отмена
				</ButtonCancel>
				<ButtonDelete
					onClick={handleDelete}
					type="button"
					disabled={isDeleting}
				>
					Удалить
				</ButtonDelete>
			</DialogActions>
		</Dialog>
	);
};

export default DeleteVideoLesson;
