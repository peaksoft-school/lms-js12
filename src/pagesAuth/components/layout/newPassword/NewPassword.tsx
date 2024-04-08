import scss from './NewPassword.module.scss';
import Logo from '@/src/assets/authPhotos/Logo.svg';
import MenLogo from '@/src/assets/authPhotos/XMLID_1207_.svg';
import { IconClosed, IconOpen_Eye } from '@/src/assets/icons';
import ButtonSave from '@/src/ui/CustomButton/ButtonSave';
import { IconButton, InputAdornment, InputLabel } from '@mui/material';
import { useState } from 'react';
import { OutlinedInput } from '@mui/material';
import { Link } from 'react-router-dom';

const NewPassword = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showSecondPassword, setShowSecondPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => event.preventDefault();

	// ! second input
	const handleClickShowSecondPassword = () =>
		setShowSecondPassword((show) => !show);
	const handleMouseDownSecondPassword1 = (
		event: React.MouseEvent<HTMLButtonElement>
	) => event.preventDefault();

	return (
		<div className={scss.NewPassword}>
			<div className={scss.LoginLogoBlue}>
				<div className={scss.Logos}>
					<img src={Logo} alt="#" />
					<img src={MenLogo} alt="#" />
				</div>
			</div>

			{/* //! White */}
			<div className={scss.LoginElementsWhite}>
				<div className={scss.LoginWhiteElements}>
					<h1 className={scss.CreatePassword}>Создать пароль</h1>
					<div className={scss.Parent_element_inputs}>
						<div className={scss.Element_inputs_newPassword}>
							<div className={scss.Element_inputs_password}>
								<InputLabel htmlFor="outlined-adornment-password">
									<p>Новый пароль : </p>
								</InputLabel>
								<OutlinedInput
									className={scss.OutlinedInputEyes}
									placeholder="Введите новый пароль"
									id="outlined-adornment-password"
									type={showPassword ? 'text' : 'password'}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
												edge="end"
											>
												{showPassword ? <IconOpen_Eye /> : <IconClosed />}
											</IconButton>
										</InputAdornment>
									}
								/>
								{/* //! second input */}
								<InputLabel htmlFor="outlined-adornment-password">
									<p>Подверждение : </p>
								</InputLabel>
								<OutlinedInput
									className={scss.OutlinedInputEyes}
									placeholder="Подвердите пароль"
									id="outlined-adornment-password"
									type={showSecondPassword ? 'text' : 'password'}
									endAdornment={
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowSecondPassword}
												onMouseDown={handleMouseDownSecondPassword1}
												edge="end"
											>
												{showSecondPassword ? <IconOpen_Eye /> : <IconClosed />}
											</IconButton>
										</InputAdornment>
									}
								/>
							</div>
						</div>
					</div>
					<div className={scss.Link_Element}>
						<Link to="/auth/login">Уже есть аккаунт!</Link>
					</div>
					<div className={scss.Button_Element}>
						<ButtonSave onClick={() => {}} disabled={false}>
							Создать
						</ButtonSave>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewPassword;
