import { FC } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import ButtonCancel from '@/src/ui/customButton/ButtonCancel';
import scss from './Styled.module.scss';
import { useIsBlockStudentMutation } from '@/src/redux/api/admin/student';
import { Button } from '@mui/material';

type IsBlockProps = {
	openIsBlock: boolean;
	handleCloseIsBlock: () => void;
	saveIdElement: number | null;
	isBlock?: boolean;
	handleBlockUnblock: () => void;
};

const IsBlock: FC<IsBlockProps> = ({
	openIsBlock,
	handleCloseIsBlock,
	isBlock,
	saveIdElement
}) => {
	const [isBlockStudent] = useIsBlockStudentMutation();

	const updateCompletedFunc = async () => {
		await isBlockStudent(saveIdElement);
		handleCloseIsBlock();
	};

	return (
		<Dialog
			open={openIsBlock}
			onClose={handleCloseIsBlock}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			PaperProps={{
				className: scss.dialog_paper
			}}
		>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					<h3>
						Вы уверены, что хотите{' '}
						{isBlock ? 'Разблокировать' : 'Заблокировать'}?
					</h3>
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
					onClick={handleCloseIsBlock}
					disabled={false}
					type="submit"
				>
					Отмена
				</ButtonCancel>
				<Button
					variant="contained"
					style={{ background: 'red', padding: '10px 24px' }}
					size="small"
					onClick={updateCompletedFunc}
					type="submit"
					disabled={false}
				>
					{isBlock ? 'Разблокировать' : 'Заблокировать'}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default IsBlock;
