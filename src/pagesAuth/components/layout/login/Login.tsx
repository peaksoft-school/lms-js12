import React, { useState } from 'react';
import scss from './Login.module.scss';
import Logo from '@/src/assets/authPhotos/Logo.svg';
import MenLogo from '@/src/assets/authPhotos/XMLID_1207_.svg';
import {
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput
} from '@mui/material';
import { IconClosed, IconOpen_Eye } from '@/src/assets/icons';
import ButtonSave from '@/src/ui/CustomButton/ButtonSave';
import Input from '@/src/ui/CustomInput/Input';
import { Link } from 'react-router-dom';

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [inputValue, setInputValue] = useState('');

	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => event.preventDefault();

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	return (
		<>
			<div className={scss.Login}>
				<div className={scss.LoginLogoBlue}>
					<div className={scss.Logos}>
						<img src={Logo} alt="#" />
						<img src={MenLogo} alt="#" />
					</div>
				</div>

				{/* //! White */}
				<div className={scss.LoginElementsWhite}>
					<div className={scss.LoginWhiteElements}>
						<h1 className={scss.WelcomeMedia}>Добро пожаловать:</h1>
						<h1 className={scss.PeakSoftMedia}>
							в <span className={scss.title_red}>PEAKSOFT LMS</span>!
						</h1>
						<div className={scss.Parent_element_inputs}>
							<div className={scss.Element_inputs_login}>
								<p>Логин :</p>
								<div className={scss.InputMedia}>
									<Input
										width="100%"
										placeholder="Введите логин"
										value={inputValue}
										type="text"
										onChange={handleInputChange}
									/>
								</div>
							</div>
							<div className={scss.Element_inputs_password}>
								<InputLabel htmlFor="outlined-adornment-password">
									<p>Пароль : </p>
								</InputLabel>
								<OutlinedInput
									className={scss.OutlinedInputEyes}
									placeholder="Введите пароль"
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
							</div>
						</div>
						<div className={scss.Link_Element}>
							<Link to="/auth/newPassword">Забыли пароль?</Link>
						</div>
						<div className={scss.Button_Element}>
							<ButtonSave onClick={() => {}} disabled={false}>
								Войти
							</ButtonSave>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
