import scss from './NewPassword.module.scss';
import Logo from '@/src/assets/authPhotos/Logo.svg';
import MenLogo from '@/src/assets/authPhotos/XMLID_1207_.svg';
import { IconClosed, IconOpen_Eye } from '@/src/assets/icons';
import ButtonSave from '@/src/ui/CustomButton/ButtonSave';
import { IconButton, InputAdornment, InputLabel } from '@mui/material';
import { FC, useState } from 'react';
import { OutlinedInput } from '@mui/material';
import { Link } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface FormData {
	password: string;
	confirmPassword: string;
}

const NewPassword: FC = () => {
	const {
		handleSubmit,
		reset,
		control,
		formState: { errors }
	} = useForm<FormData>();
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showSecondPassword, setShowSecondPassword] = useState<boolean>(false);

	const onSubmit: SubmitHandler<FormData> = (data) => {
		console.log(data);
		reset();
	};

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
			<div className={scss.content}>
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
						<form
							style={{ maxWidth: '540px', width: '100%' }}
							onSubmit={handleSubmit(onSubmit)}
						>
							<div className={scss.Parent_element_inputs}>
								<div className={scss.Element_inputs_newPassword}>
									<div className={scss.Element_inputs_password}>
										<InputLabel htmlFor="outlined-adornment-password">
											<p>Новый пароль : </p>
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
										{/* //! second input */}
										<InputLabel htmlFor="outlined-adornment-password">
											<p>Подверждение : </p>
										</InputLabel>
										<Controller
											name="confirmPassword"
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
													type={showSecondPassword ? 'text' : 'password'}
													endAdornment={
														<InputAdornment position="end">
															<IconButton
																aria-label="toggle password visibility"
																onClick={handleClickShowSecondPassword}
																onMouseDown={handleMouseDownSecondPassword1}
																edge="end"
															>
																{showSecondPassword ? (
																	<IconOpen_Eye />
																) : (
																	<IconClosed />
																)}
															</IconButton>
														</InputAdornment>
													}
													error={!!errors.confirmPassword}
												/>
											)}
										/>
										{errors.confirmPassword && (
											<span style={{ color: 'red' }}>
												{errors.confirmPassword.message}
											</span>
										)}
									</div>
								</div>
							</div>
							<div className={scss.Link_Element}>
								<Link to="/auth/login">Уже есть аккаунт!</Link>
							</div>
							<div className={scss.Button_Element}>
								<ButtonSave width="100%" onClick={() => {}} disabled={false}>
									Создать
								</ButtonSave>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewPassword;
