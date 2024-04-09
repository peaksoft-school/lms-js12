import React, { FC, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
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

type FormData = {
	login: string;
	password: string;
};

const Login: FC = () => {
	const {
		handleSubmit,
		reset,
		control,
		formState: { errors }
	} = useForm<FormData>();
	const [showPassword, setShowPassword] = useState(false);

	const onSubmit: SubmitHandler<FormData> = (data) => {
		console.log(data);
		reset();
	};

	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => event.preventDefault();

	return (
		<>
			<div className={scss.Login}>
				<div className={scss.content}>
					<div className={scss.LoginLogoBlue}>
						<div className={scss.Logos}>
							<img src={Logo} alt="#" />
							<img src={MenLogo} alt="#" />
						</div>
					</div>

					<div className={scss.LoginElementsWhite}>
						<div className={scss.LoginWhiteElements}>
							<h1 className={scss.WelcomeMedia}>Добро пожаловать:</h1>
							<h1 className={scss.PeakSoftMedia}>
								в <span className={scss.title_red}>PEAKSOFT LMS</span>!
							</h1>
							<form
								style={{ maxWidth: '540px', width: '100%' }}
								onSubmit={handleSubmit(onSubmit)}
							>
								<div className={scss.Parent_element_inputs}>
									<div className={scss.Element_inputs_login}>
										<p>Логин :</p>
										<Controller
											name="login"
											control={control}
											defaultValue=""
											rules={{
												required: 'Логин обязателен для заполнения',
												pattern: {
													value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
													message:
														'Введите действительный email адрес с доменом @gmail.com'
												}
											}}
											render={({ field }) => (
												<Input
													width="100%"
													{...field}
													placeholder="Введите логин"
													type="text"
													error={!!errors.login}
												/>
											)}
										/>
										{errors.login && (
											<span style={{ color: 'red' }}>
												{errors.login.message}
											</span>
										)}
									</div>
									<div className={scss.Element_inputs_password}>
										<InputLabel htmlFor="outlined-adornment-password">
											<p>Пароль : </p>
										</InputLabel>
										<Controller
											name="password"
											control={control}
											defaultValue=""
											rules={{
												required: 'Пароль обязателен для заполнения',
												minLength: {
													value: 8,
													message: 'Пароль должен содержать минимум 8 символов'
												}
											}}
											render={({ field }) => (
												<OutlinedInput
													className={scss.OutlinedInputEyes}
													{...field}
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
																{showPassword ? (
																	<IconOpen_Eye />
																) : (
																	<IconClosed />
																)}
															</IconButton>
														</InputAdornment>
													}
													error={!!errors.password}
												/>
											)}
										/>
										{errors.password && (
											<span style={{ color: 'red' }}>
												{errors.password.message}
											</span>
										)}
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
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
