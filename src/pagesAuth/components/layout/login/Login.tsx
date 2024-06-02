import React, { FC, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import scss from './Login.module.scss';
import Logo from '@/src/assets/svgs/logo.svg';
import { IconClosed, IconOpen_Eye } from '@/src/assets/icons';
import ButtonSave from '@/src/ui/customButton/ButtonSave';
import { Link } from 'react-router-dom';
import MenLogo from '@/src/assets/svgs/boy-proger.svg';
import {
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput
} from '@mui/material';
import Input from '@/src/ui/customInput/Input';
import { usePostLoginMutation } from '@/src/redux/api/auth'; ///
type FormData = {
	login: string;
	password: string;
	// token: string;
};
const Login: FC = () => {
	const [postLogin] = usePostLoginMutation();
	// const navigate = useNavigate();
	// const handleLogin = async () => {
	//   try {
	//     const loginData = { username: 'example', password: 'password' };
	//     const response = await postLogin(loginData).unwrap();
	//     console.log('Успешный вход', response);
	//   } catch (error) {
	//     console.error('Ошибка входа', error);
	//   }
	// };
	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors }
	} = useForm<FormData>();
	const [showPassword, setShowPassword] = useState(false);
	const onSubmit: SubmitHandler<FormData> = async (data, event) => {
		event?.preventDefault();
		try {
			const response = await postLogin(data);
			if ('data' in response) {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const { token }: any = response.data;
				localStorage.setItem('token', token);
				localStorage.setItem('isAuth', 'true');
			}
			console.log('is working ', response);
			reset();
		} catch (error) {
			console.log('not working', error);
		}
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
											{...register('login')}
											control={control}
											name="login"
											defaultValue=""
											rules={{
												required: 'Логин обязателен для заполнения'
												// pattern: {
												//  value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
												//  message:
												//    'Введите действительный email адрес с доменом @gmail.com'
												// }
											}}
											render={({ field }) => (
												<Input
													size="medium"
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
											{...register('password')}
											control={control}
											defaultValue=""
											name="password"
											rules={{
												required: 'Пароль обязателен для заполнения',
												minLength: {
													value: 5,
													message: 'Пароль должен содержать минимум 5 символов'
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
									<ButtonSave
										type="submit"
										width="214px"
										disabled={false}
										onClick={() => {}}
									>
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
